import * as React from 'react';
import { Route } from 'react-router-dom';

import './Page.scss';

import Intro from './Intro';

export default class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <Route path="/" component={Intro}></Route>
      </div>
    );
  }
}