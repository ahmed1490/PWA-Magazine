import React, {Component} from 'react';
import CONSTANTS from '../utils/constants'
import './article.css';

class Article extends Component {
    render() {
        const article = this.props.item;
        const imageLink = `/getImage?imageLink=${encodeURIComponent(article.imageLink)}`;
        // console.log('article component', article, article);
        return (
            <div className={'article_view'} style={{}}>
                <div className={'article_hero'} style={{backgroundImage: `url(${imageLink})`}}>
                    <div className={'article_title'}>
                        {article.heading}
                    </div>
                </div>
                <div className="image_sub">
                    <div className="image_sub_content">{article.imageCopyright}</div>
                    <div className="image_sub_content">{article.date}</div>
                </div>
                <div className={'article_excerpt'}>
                    {article.text && article.text.map((text, textIndex) => {
                        return <div key={textIndex} className="article_excerpt_text">{text}</div>;
                    })}
                </div>
            </div>
        );
    }
}

export default Article;
