import React, {Component} from 'react';
import Timeline from "../components/Timeline";
import {withRouter} from 'react-router';

class ArticleList extends Component {

    constructor(props){
        super(props);
        this.openArticle = this.openArticle.bind(this);
    }

    openArticle(pageIndex){
        this.props.router.push(`/articles/${pageIndex}`);
    }

    render(){
        return <Timeline openArticle={this.openArticle}/>
    }

}

export default withRouter(ArticleList);