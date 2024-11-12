import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Column.css';
import Icon from './Icon';
import Card from './Card';

const Column = ({ group, tickets, getUserName, getUserAvailability, updateTicket, groupBy, users }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData('text/plain');
    if (ticketId) {
      const updates = getTicketUpdates();
      updateTicket(ticketId, updates);
    }
    setIsDragOver(false);
  };

  const getTicketUpdates = () => {
    switch (groupBy) {
      case 'status':
        return { status: group };
      case 'priority':
        return { priority: getPriorityNumber(group) };
      case 'user':
        const user = users.find((u) => u.name === group);
        return user ? { userId: user.id } : {};
      default:
        return {};
    }
  };

  const getGroupIcon = () => {
    if (groupBy === 'status') return getStatusIcon(group);
    if (groupBy === 'priority') return getPriorityIcon(group);
    return groupBy === 'user' ? 'user' : 'display';
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      backlog: 'backlog',
      todo: 'todo',
      'in progress': 'in-progress',
      done: 'done',
      cancelled: 'cancelled',
    };
    return statusIcons[status.toLowerCase()] || 'display';
  };

  const getPriorityIcon = (priorityLabel) => {
    const priorityIcons = {
      Urgent: 'svg-urgent-priority-color',
      High: 'img-high-priority',
      Medium: 'img-medium-priority',
      Low: 'img-low-priority',
      'No priority': 'no-priority',
    };
    return priorityIcons[priorityLabel] || 'display';
  };

  const getPriorityNumber = (priorityLabel) => {
    const priorityLevels = {
      Urgent: 4,
      High: 3,
      Medium: 2,
      Low: 1,
      'No priority': 0,
    };
    return priorityLevels[priorityLabel] || 0;
  };

  return (
    <div
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <Icon name={getGroupIcon()} size={24} className="group-icon" aria-label={`${group} group`} />
        <h2>{group}</h2>
      </div>

      <div className="column-content">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userName={getUserName(ticket.userId)}
            isAvailable={getUserAvailability(ticket.userId)}
            searchQuery={''}
          />
        ))}
      </div>
    </div>
  );
};

Column.propTypes = {
  group: PropTypes.string.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserName: PropTypes.func.isRequired,
  getUserAvailability: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  groupBy: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Column;
