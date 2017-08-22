import * as React from 'react';

import Menu from './components/Menu';
import Page from './components/Page';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <Page />
      </div>
    );
  }
}