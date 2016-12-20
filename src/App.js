import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './App.css';
import ArticleList from './containers/ArticleList';
import Scraper from './utils/scraper.js';

class App extends Component {

    state = {
        newsArticleLinks: []
    };

    render() {
        //<div className="App-header"><h2>Zalando Fashion</h2></div>
        console.log(this.props.newsArticleLinks);
        return (
            <div className="App">

                <div id="contentContainer">
                    <ArticleList />
                    <ReactCSSTransitionGroup
                        component="section"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {React.cloneElement(this.props.children || <div />, {
                            key: location.hash
                        })}
                    </ReactCSSTransitionGroup>
                </div>

            </div>
        );
    }
}

export default App;
