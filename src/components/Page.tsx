import * as React from 'react';
import { Route } from 'react-router-dom';
import * as Pages from './pages';

import './Page.scss';

export default class Page extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="page">
          <Route path="/Intro" component={Pages.Intro}></Route>
          <Route path="/Ch1" component={Pages.Ch1}></Route>
          <Route path="/Ch2" component={Pages.Ch2}></Route>
          <Route path="/Ch3" component={Pages.Ch3}></Route>
        </div>
      </div>
    );
  }
}