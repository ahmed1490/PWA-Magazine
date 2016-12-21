// @flow weak

import React, {Component} from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import ArticleList from './ArticleList';

import './tabStyles.css'

const styles = {
    iconStyle: {backgroundColor:'#333'},
    tabItemContainerStyle: {backgroundColor:'#333', color:'#fff'},
    tabStyle: {backgroundColor:'#333'},
    inkBarStyle: {backgroundColor: "#fff"},
    slide: { padding: 15, minHeight: 100, color: '#fff' },
    slide1: { padding: 0  },
    slide2: { backgroundColor: '#B3DC4A' },
    slide3: { backgroundColor: '#6AC0FF' },
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
                    <Tabs style={styles.tabItemContainerStyle} value={index} inkBarStyle={styles.inkBarStyle}>
                        <Tab label="News" style={styles.tabStyle} value={0} onClick={this.handleChangeTabs.bind(null, 0)}/>
                        <Tab label="Read" style={styles.tabStyle} value={1} onClick={this.handleChangeTabs.bind(null, 1)}/>
                        <Tab label="Inspiration" style={styles.tabStyle} value={2} onClick={this.handleChangeTabs.bind(null, 2)}/>
                    </Tabs>
                    <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>
                            <ArticleList />
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            Read Articles
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide3)}>
                            Get Inspired
                        </div>
                    </SwipeableViews>
                </div>
            </MuiThemeProvider>
        );
    }

}

export default DemoTabs;