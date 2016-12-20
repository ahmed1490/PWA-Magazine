import React, {Component} from 'react';
import './article.css';

class Article extends Component {
    render() {
        const article = this.props.item;
        return (
            <div className={'article_view'} style={{}}>
                <div className={'article_hero'} style={{backgroundImage: `url(${article.imageUrl})`}}>
                    <div className={'article_title'}>
                        {article.title}
                    </div>
                </div>
                <div className={'article_excerpt'}>
                    {article.excerpt}
                    <br/><br/>
                    {article.excerpt}
                    <br /><br/>
                    {article.excerpt}
                </div>
            </div>
        );
    }
}

export default Article;
