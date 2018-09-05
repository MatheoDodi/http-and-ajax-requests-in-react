import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId : id});
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
            .catch(error => {
                    console.log(error);
                }
            );
    }

    render() {
        let posts = this.state.posts.map(post => <Post clicked={() => this.postClickedHandler(post.id)} key={post.id} title={post.title} author={post.author}/>)
        if (this.state.error) {
            posts = <p>Something Went Wrong!</p>
        }

        return (
            <section className="Posts">
                    {posts}
            </section>
        )
    }
}

export default Posts;