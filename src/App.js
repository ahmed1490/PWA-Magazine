import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './App.css';
import ArticleList from './containers/ArticleList';

class App extends Component {
    render() {
        console.log(location.hash)
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Zalando Fashion</h2>
                </div>
                <div>
                    {/*<ArticleList />*/}
                    <ReactCSSTransitionGroup
                        component="section"
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {React.cloneElement(this.props.children, {
                            key: location.hash
                        })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export default App;
