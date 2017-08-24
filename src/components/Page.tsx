import * as React from 'react';
import { Route } from 'react-router-dom';

import './Page.scss';

import Intro from './Intro';
import Ch1 from './Ch1';

export default class Page extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="page">
          <Route path="/Intro" component={Intro}></Route>
          <Route path="/Ch1" component={Ch1}></Route>
        </div>
      </div>
    );
  }
}