import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import Article from './containers/Article';
import ArticleList from './containers/ArticleList';

let RouterNav = <Router history={hashHistory}>
    <Router path="/" component={App}>
        <IndexRoute component={ArticleList}/>
        <Router path="/articles/:articleId" component={Article}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);
