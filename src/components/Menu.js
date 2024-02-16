// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ label, to, icon }) => (
  <Link to={to} className="menu-item">
    {icon && <span className="menu-icon">{icon}</span>}
    {label}
  </Link>
);

const Menu = ({ items }) => (
  <div className="sidebar">
    {items.map((item) => (
      <MenuItem
        key={item.key}
        label={item.label}
        to={item.key}
        icon={item.icon}
      />
    ))}
  </div>
);

export default Menu;
