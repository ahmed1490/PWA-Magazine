import React, {Component} from 'react';
import './article_view.css';

const abc=     {
        title: '10 Unbelievable Secrets That Will Make Your Airline Pilot Nervous',
        excerpt: 'With these words the Witch fell down in a brown, melted, shapeless mass and began to spread over the clean boards of the kitchen floor.  Seeing that she had really melted away to nothing, Dorothy drew another bucket of water and threw it over the mess.  She then swept it all out the door.  After picking out the silver shoe, which was all that was left of the old woman, she cleaned and dried it with a cloth, and put it on her foot again.  Then, being at last free to do as she chose, she ran out to the courtyard to tell the Lion that the Wicked Witch of the West had come to an end, and that they were no longer prisoners in a strange land.',
        imageUrl: 'https://placekitten.com/360/420'
    };

const divStyle = {
    width:'100%',height:'100%',position:'absolute',top:0,background:'#fff'}

class Article extends Component {
    render() {
    	const article = abc;
        return (
            <div style={divStyle}>
            	<img src={article.imageUrl} />
            	<div className={'article_title'}>
                	One fabulous article that we are going to see here
                </div>
                <div className={'article_excerpt'}>
                	{article.excerpt}
                </div>
            </div>
        );
    }
}

export default Article;
