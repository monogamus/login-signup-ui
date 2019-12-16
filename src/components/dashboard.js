import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

function Dashboard() {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [post, setPost] = useState({
        title: '',
        content: ''
    });
    const [file, setFile] = useState(null)
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/users-posts`)
        .then(result => {
          console.log(result);
          setPosts(result.data);
        })
        .catch(error => setError(error.message));
    }, []);
  
    const handleSubmit = event => {
        event.preventDefault();
        const decoded = jwt.decode(localStorage.getItem("token"));
        const fd = new FormData()
        fd.append("imagePost", file)
        fd.append("title", post.title)
        fd.append("content", post.content)
        fd.append("userId", decoded.user.id)
        axios
            .post(`${process.env.REACT_APP_BACKEND_URI}/users-posts`, fd)
            .then(result => {
                console.log(result);
            })
        .catch(error => setError(error.message));
    };

    const handleChange = event => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        });
    };
    
    const handleFile = event => {
        setFile(event.target.files[0]);
    };

    return (
      <div>
          {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={post.title}
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={post.content}
          ></textarea>
          <input type="file" onChange={handleFile}/>
          <button>Add new post</button>
        </form>
        <div id="post">{/*Our Post*/}</div>
      </div>
    );
}

export default Dashboard;
