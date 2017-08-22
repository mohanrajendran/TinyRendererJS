import * as React from 'react';
import { Route } from 'react-router-dom';

import './Page.scss';

import Ch1 from './Ch1/Ch1';

export default class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <Route path="/" component={Ch1}></Route>
      </div>
    );
  }
}