import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import UserIcon from './UserIcon';

const Card = ({ ticket, userName, isAvailable, searchQuery }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ticket.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getHighlightedText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
    );
  };

  const getStatusClass = (status) => 
    `status-dot status-${status.toLowerCase().replace(' ', '-')}`;

  return (
    <div
      className={`card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <header className="card-header">
        <div className="task-id">{getHighlightedText(ticket.id)}</div>
        <UserIcon userName={userName} isAvailable={isAvailable} />
      </header>

      <section className="card-body">
        <div className="status-indicator">
          <span 
            className={getStatusClass(ticket.status)} 
            aria-label={`Status: ${ticket.status}`}
          ></span>
        </div>
        <div className="task-title">{getHighlightedText(ticket.title)}</div>
      </section>
        <div className="task-tag">{getHighlightedText(ticket.tag)}</div>

      {ticket.label && (
        <footer className="card-footer">
          <div className="task-label">{getHighlightedText(ticket.label)}</div>
        </footer>
      )}
    </div>
  );
};

Card.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    tag: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
  }).isRequired,
  userName: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Card;
