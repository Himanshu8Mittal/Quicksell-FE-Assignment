import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const Header = ({
  groupBy,
  setGroupBy,
  orderBy,
  setOrderBy,
  groupOptions,
  orderOptions,
  searchQuery,
  setSearchQuery,
}) => (
  <header className="header">
    <div className="header-left">
      <DisplayControls
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        groupOptions={groupOptions}
        orderOptions={orderOptions}
      />
    </div>
  </header>
);

const DisplayControls = ({ groupBy, setGroupBy, orderBy, setOrderBy, groupOptions, orderOptions }) => (
  <div className="display-controls">
    <Dropdown
      label="Group By:"
      id="groupBy"
      value={groupBy}
      onChange={setGroupBy}
      options={groupOptions}
    />
    <Dropdown
      label="Order By:"
      id="orderBy"
      value={orderBy}
      onChange={setOrderBy}
      options={orderOptions}
    />
  </div>
);

const Dropdown = ({ label, id, value, onChange, options }) => (
  <div className="dropdown">
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="search-container">
    <label htmlFor="search">Search:</label>
    <input
      type="text"
      id="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by title or tag"
    />
  </div>
);

Header.propTypes = {
  groupBy: PropTypes.string.isRequired,
  setGroupBy: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  groupOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  orderOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

DisplayControls.propTypes = {
  groupBy: PropTypes.string.isRequired,
  setGroupBy: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  groupOptions: PropTypes.array.isRequired,
  orderOptions: PropTypes.array.isRequired,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Header;
