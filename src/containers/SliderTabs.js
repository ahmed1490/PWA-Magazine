// @flow weak

import React, { Component } from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';

import ArticleList from './ArticleList';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    padding: 0
    // backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#ff6e40',
  },
  slide3: {
    backgroundColor: '#ff6e40',
  },
};

class DemoTabs extends Component {
  state = {
    index: 0,
  };

  handleChangeTabs = (value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {
      index,
    } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Tabs value={index} style={{backgroundColor: '#ff6e40'}}>
            <Tab label="News" value={0} onClick={this.handleChangeTabs.bind(null, 0)} />
            <Tab label="Stories" value={1} onClick={this.handleChangeTabs.bind(null, 1)} />
            <Tab label="Inspiration" value={2} onClick={this.handleChangeTabs.bind(null, 2)} />
          </Tabs>
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              <ArticleList />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              Coming Sooon
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              This is coming soon too!
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DemoTabs;