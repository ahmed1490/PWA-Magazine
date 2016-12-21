// @flow weak

import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import Pagination from '../components/SliderPagination/Pagination';
import Article from './Article'
import ArticleRetriever from '../utils/articleRetriever';

const divStyle = {
    width: '100%', height: '100%', position: 'absolute', top: 0, background: '#fff'
};

const styles = {
    slide: {
        padding: 0,
        minHeight: 100
    }
};

class ArticleSlider extends Component {
    state = {
        index: 0,
        articles: [],
        routerIndex: Number(this.props.router.params.articleId || 0)
    };


    componentWillMount() {
        ArticleRetriever.getArticleLinks().then((articlePages) => {
            this.setState({
                articles: articlePages
            });
            ArticleRetriever.getPagesFromIndex(0).then((updatedArticlePages) => {
                this.setState({
                    articles: updatedArticlePages
                })
            })
        });
    }

    handleChangeIndex = (index) => {
        this.props.router.push(`/articles/${index}`);
    };

    render() {

        let routerIndex = Number(this.props.router.params.articleId || 0);
        let startIndex = 0//(routerIndex - 2) > 0 ? (routerIndex - 2) : 0;
        let endIndex = 10//(routerIndex + 2) < this.state.articles.length ? (routerIndex + 3) : this.state.articles.length;
        let renderedArticlesMarkup = this.state.articles.slice(startIndex, endIndex).map((article, articleIndex) =>
            <div key={articleIndex} style={styles.slide}>
                {<Article item={article}/>}
            </div>
        );

        return (
            <div style={divStyle}>

                {renderedArticlesMarkup.length && <SwipeableViews index={routerIndex} onChangeIndex={this.handleChangeIndex}>
                    {renderedArticlesMarkup}
                </SwipeableViews>}

                <Pagination
                    dots={10}
                    index={routerIndex % 10}
                    onChangeIndex={this.handleChangeIndex}
                />

            </div>
        );
    }
}

export default ArticleSlider;
