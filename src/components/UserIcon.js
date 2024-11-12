import React from 'react';
import PropTypes from 'prop-types';
import '../styles/UserIcon.css';

/**
 * Utility function to extract initials from a user's name.
 * @param {string} name - Full name of the user.
 * @returns {string} Initials derived from the first and last words of the name.
 */
const extractInitials = (name) => {
  const words = name.trim().split(' ').filter(Boolean);
  if (words.length === 0) return '';
  return words.length === 1
    ? words[0][0].toUpperCase()
    : (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

/**
 * Renders a user icon with initials and availability status.
 *
 * @param {Object} props
 * @param {string} props.userName - Full name of the user.
 * @param {boolean} props.isAvailable - Availability status of the user.
 */
const UserIcon = ({ userName, isAvailable }) => {
  const initials = extractInitials(userName);
  const availabilityClass = isAvailable ? 'available' : 'busy';

  return (
    <div
      className={`user-icon ${availabilityClass}`}
      aria-label={`User: ${userName}, Status: ${isAvailable ? 'Available' : 'Busy'}`}
    >
      {initials}
    </div>
  );
};

UserIcon.propTypes = {
  userName: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
};

export default UserIcon;
