import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
    }

    postClickedHandler = (id) => {
        this.props.history.push({pathname: `/${id}`})
    }

    componentDidMount() {
        console.log(this.props);
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
        let posts = this.state.posts.map(post => <Post key={post.id} clicked={() => this.postClickedHandler(post.id)} title={post.title} author={post.author}/>)
        if (this.state.error) {
            posts = <p>Something Went Wrong!</p>
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/:id" component={FullPost} />
            </div>
        )
    }
}

export default Posts;