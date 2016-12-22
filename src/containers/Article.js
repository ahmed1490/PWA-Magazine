import React, {Component} from 'react';
import CONSTANTS from '../utils/constants'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import ShareIcon from 'material-ui/svg-icons/action/open-in-new';
// import FlatButton from 'material-ui/FlatButton';
// <MuiThemeProvider muiTheme={getMuiTheme()}>
//     <ShareIcon color='#878787' className="share_icon" />
// </MuiThemeProvider>

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
                    <span className="image_sub_content">{article.imageCopyright}</span>
                    <span className="image_sub_content">{article.date}</span>
    
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
