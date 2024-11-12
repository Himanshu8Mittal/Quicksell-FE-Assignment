// export default Icon;
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Icon.css';

// Static imports for all icons
import threeDotMenuIcon from '../icons/three-dot-menu.svg';
import addIcon from '../icons/add.svg';
import backlogIcon from '../icons/backlog.svg';
import cancelledIcon from '../icons/Cancelled.svg';
import displayIcon from '../icons/Display.svg';
import doneIcon from '../icons/Done.svg';
import downIcon from '../icons/down.svg';
import highPriorityIcon from '../icons/img-high-priority.svg';
import lowPriorityIcon from '../icons/img-low-priority.svg';
import mediumPriorityIcon from '../icons/img-medium-priority.svg';
import inProgressIcon from '../icons/in-progress.svg';
import noPriorityIcon from '../icons/No-priority.svg';
import urgentPriorityColorIcon from '../icons/svg-urgent-priority-color.svg';
import urgentPriorityGreyIcon from '../icons/svg-urgent-priority-grey.svg';
import todoIcon from '../icons/To-do.svg';

const ICONS = {
  'three-dot-menu': threeDotMenuIcon,
  add: addIcon,
  backlog: backlogIcon,
  cancelled: cancelledIcon,
  display: displayIcon,
  done: doneIcon,
  down: downIcon,
  'img-high-priority': highPriorityIcon,
  'img-low-priority': lowPriorityIcon,
  'img-medium-priority': mediumPriorityIcon,
  'in-progress': inProgressIcon,
  'no-priority': noPriorityIcon,
  'svg-urgent-priority-color': urgentPriorityColorIcon,
  'svg-urgent-priority-grey': urgentPriorityGreyIcon,
  todo: todoIcon,
};

const Icon = ({ name, size = 24, color = 'currentColor', className = '', ...props }) => {
  const iconSrc = ICONS[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" does not exist.`);
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={`icon ${className}`}
      style={{ color }}
      {...props}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
