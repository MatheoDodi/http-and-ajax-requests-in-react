import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
state = {
    posts: [],
    selectedPostId : null,
    error : false
}
    
    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Matthew'
                    }
                })
                this.setState({posts: updatedPosts});
            })
            .catch(() => {
                    this.setState( {error: true} )
                }
            );
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId : id});
    }

    render () {
        let posts = this.state.posts.map(post => <Post clicked={() => this.postClickedHandler(post.id)} key={post.id} title={post.title} author={post.author}/>)
        if (this.state.error) {
            posts = <p>Something Went Wrong!</p>
        }


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;