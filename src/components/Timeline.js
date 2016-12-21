import React, {Component} from 'react';
const ReactCanvas = require('react-canvas');
const Page = require('./Page');
import ArticleRetriever from "../utils/articleRetriever";

let Surface = ReactCanvas.Surface;
let ListView = ReactCanvas.ListView;

export default class Timeline extends Component{

    state = {
        articles: []
    };

    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.getNumberOfPages = this.getNumberOfPages.bind(this);
        this.getPageHeight = this.getPageHeight.bind(this);
        this.openArticle = this.openArticle.bind(this);
    }

    openArticle(pageIndex){
        this.props.openArticle(pageIndex);
    }

    componentDidMount() {
        ArticleRetriever.getArticleLinks().then((articleData)=> {
            this.setState({
                articles: articleData
            });
        });
    }


    render() {
        let size = this.getSize();
        let surfaceMarkup = this.state.articles.length ?
            <Surface top={0} left={0} width={size.width} height={size.height}>
                <ListView
                    style={this.getListViewStyle()}
                    snapping={true}
                    scrollingDeceleration={0.92}
                    scrollingPenetrationAcceleration={0.13}
                    numberOfItemsGetter={this.getNumberOfPages}
                    itemHeightGetter={this.getPageHeight}
                    itemGetter={this.renderPage} />
            </Surface> : <Surface top={0} left={0} width={size.width} height={size.height} />;
        return ( surfaceMarkup );
    }

    renderPage(pageIndex, scrollTop) {
        let articles = this.state.articles;
        let size = this.getSize();
        let article = articles[pageIndex % articles.length] || {};
        let pageScrollTop = pageIndex * this.getPageHeight() - scrollTop;
        return (
            <Page
                openArticle={this.props.openArticle}
                width={size.width}
                height={size.height}
                article={article}
                pageIndex={pageIndex}
                scrollTop={pageScrollTop} />
        );
    }

    getSize() {
        return document.getElementById('root').getBoundingClientRect();
    }

    getListViewStyle() {
        let size = this.getSize();
        return {
            top: 0,
            left: 0,
            width: size.width,
            height: size.height
        };
    }

    getNumberOfPages() {
        return 1000;
    }

    getPageHeight() {
        return this.getSize().height;
    }

}
