import * as React from 'react';
import { Link } from 'react-router-dom';

import './Menu.scss';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <Link to="/Intro">Intro</Link>
        <Link to="/Ch1">Line Drawing</Link>
        <Link to="/Ch2">Triangle Drawing</Link>
        <Link to="/Ch3">Z-buffer</Link>
      </div>
    );
  }
}