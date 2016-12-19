import React, {Component} from 'react';

const divStyle = {
    width:'100%',height:'100%',position:'absolute',top:0,background:'#fff'}

class Article extends Component {
    render() {
        return (
            <div className="majorMan" style={divStyle}>
                One fabulous article that we are going to see here
            </div>
        );
    }
}

export default Article;
