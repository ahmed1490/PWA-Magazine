// @flow weak

import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';
import Pagination from '../components/SliderPagination/Pagination';
import Article from './Article'
import ArticleRetriever from '../utils/articleRetriever';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./articleSlider.css";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HomeIcon from 'material-ui/svg-icons/action/home';

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

    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    componentWillMount() {
        ArticleRetriever.getArticleLinks().then((articlePages) => {
            this.setState({
                articles: articlePages
            });
            ArticleRetriever.getPagesFromIndex(0).then((updatedArticlePages) => {
                console.info('updatedArticlePages', updatedArticlePages);
                this.setState({
                    articles: updatedArticlePages
                })
            })
            .catch((err) => console.error('promise all failed for getPages', err))
        });
    }

    goHome(){
        this.props.router.push(`/`);
    }

    componentDidMount(){
        let app = this;
        /*window.onpopstate = function(event){
            event.preventDefault();
            app.goHome()
        };*/
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

                <div >
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <div className="home-icon-container">
                            <HomeIcon color='#319FD6' backgroundColor="#fff" onClick={this.goHome}/>
                        </div>
                    </MuiThemeProvider>

                    <Pagination
                        dots={10}
                        index={routerIndex % 10}
                        onChangeIndex={this.handleChangeIndex}
                    />
                </div>

            </div>
        );
    }
}

export default ArticleSlider;
