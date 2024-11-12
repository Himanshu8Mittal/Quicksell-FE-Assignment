// src/components/Board.js

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import '../styles/Board.css';
import useLocalStorage from '../hooks/useLocalStorage';

// Define helper functions at the top
const getPriorityLabel = (priority) => {
  const labels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  return labels[priority] || 'No priority';
};

const getPriorityValue = (priority) => {
  const values = { Urgent: 4, High: 3, Medium: 2, Low: 1, 'No priority': 0 };
  return values[priority] || 0;
};

const Board = ({ groupBy, orderBy, searchQuery }) => {
  const [cachedData, setCachedData] = useLocalStorage('kanbanData', { tickets: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedData.tickets.length && cachedData.users.length) {
        setLoading(false);
      } else {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          if (!response.ok) throw new Error('Network response was not ok');
          
          const apiData = await response.json();
          setCachedData(apiData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [cachedData, setCachedData]);

  const getUserById = useCallback(
    (userId) => cachedData.users.find((user) => user.id === userId) || { name: 'Unknown', available: false },
    [cachedData.users]
  );

  const filterTickets = useCallback(
    (tickets) => {
      if (!searchQuery.trim()) return tickets;
      const query = searchQuery.toLowerCase();
      return tickets.filter(({ title, tag }) =>
        title.toLowerCase().includes(query) || tag.some((t) => t.toLowerCase().includes(query))
      );
    },
    [searchQuery]
  );

  const groupTickets = useMemo(() => {
    const grouped = {};
    filterTickets(cachedData.tickets).forEach((ticket) => {
      const groupKey = groupBy === 'status' ? ticket.status 
                      : groupBy === 'priority' ? getPriorityLabel(ticket.priority) 
                      : groupBy === 'user' ? getUserById(ticket.userId).name 
                      : ticket.status;

      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(ticket);
    });
    return grouped;
  }, [cachedData.tickets, groupBy, filterTickets, getUserById]);

  const sortTickets = useCallback(
    (tickets) => {
      const sortedTickets = [...tickets];
      const sortMap = {
        'priority-asc': (a, b) => a.priority - b.priority,
        'priority-desc': (a, b) => b.priority - a.priority,
        'title-asc': (a, b) => a.title.localeCompare(b.title),
        'title-desc': (a, b) => b.title.localeCompare(a.title),
      };
      sortedTickets.sort(sortMap[orderBy] || (() => 0));
      return sortedTickets;
    },
    [orderBy]
  );

  const sortedGroupedTickets = useMemo(() => {
    const sorted = {};
    Object.keys(groupTickets).forEach((group) => {
      sorted[group] = sortTickets(groupTickets[group]);
    });
    return sorted;
  }, [groupTickets, sortTickets]);

  const groupOrder = useMemo(() => {
    const orderByPriority = (a, b) => getPriorityValue(b) - getPriorityValue(a);
    const sortedKeys = Object.keys(sortedGroupedTickets);

    if (groupBy === 'status') return ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
    if (groupBy === 'priority') return sortedKeys.sort(orderByPriority);
    if (groupBy === 'user') return sortedKeys.sort((a, b) => a.localeCompare(b));
    return sortedKeys;
  }, [groupBy, sortedGroupedTickets]);

  const updateTicket = useCallback(
    (ticketId, updates) => {
      const updatedTickets = cachedData.tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      );
      setCachedData({ ...cachedData, tickets: updatedTickets });
    },
    [cachedData, setCachedData]
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error fetching data. Please try again later.</div>;

  return (
    <div className="board">
      {groupOrder.map((group) => (
        <Column
          key={group}
          group={group}
          tickets={sortedGroupedTickets[group] || []}
          getUserName={(userId) => getUserById(userId).name}
          getUserAvailability={(userId) => getUserById(userId).available}
          updateTicket={updateTicket}
          groupBy={groupBy}
          users={cachedData.users}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  groupBy: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Board;
