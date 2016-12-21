import React, {Component} from 'react';
import './App.css';

class App extends Component {

    render() {
        //<div className="App-header"><h2>Zalando Fashion</h2></div>
        return (
            <div className="App">
                <div id="contentContainer">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
