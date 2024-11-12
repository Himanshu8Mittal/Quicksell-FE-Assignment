// src/App.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import './styles/App.css';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  // Custom hooks for persistent state in local storage
  const [groupBy, setGroupBy] = useLocalStorage('groupBy', 'status');
  const [orderBy, setOrderBy] = useLocalStorage('orderBy', 'priority-asc');
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  
  // Debounce search query to reduce excessive re-renders
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const debounceTimeout = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Memoize options to avoid re-creating on each render
  const groupOptions = useMemo(() => [
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'user', label: 'User' },
  ], []);

  const orderOptions = useMemo(() => [
    { value: 'priority-asc', label: 'Priority (Low to High)' },
    { value: 'priority-desc', label: 'Priority (High to Low)' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
  ], []);

  // Handlers for updating state, memoized to avoid unnecessary re-renders
  const handleGroupChange = useCallback((newGroup) => setGroupBy(newGroup), [setGroupBy]);
  const handleOrderChange = useCallback((newOrder) => setOrderBy(newOrder), [setOrderBy]);
  const handleSearchChange = useCallback((query) => setSearchQuery(query), [setSearchQuery]);

  return (
    <div className="App">
      <Header
        groupBy={groupBy}
        setGroupBy={handleGroupChange}
        orderBy={orderBy}
        setOrderBy={handleOrderChange}
        groupOptions={groupOptions}
        orderOptions={orderOptions}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
      />
      <Board
        groupBy={groupBy}
        orderBy={orderBy}
        searchQuery={debouncedSearch}
      />
    </div>
  );
};

export default App;
