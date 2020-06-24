import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]); // Using the state hooks to store the data
  const [searchedPost, setSearchedPost] = useState([]);

  var param = '';

  function handleSearch(e) {
    const { value } = e.target;
    console.log(value);
    param = value;
  }

  function search(e) {
    e.preventDefault();
    axios
      .get(`http://jsonplaceholder.typicode.com/posts?id=${param}`)
      .then((res) => {
        console.log(res);
        setSearchedPost(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetching the posts from API
  function fetchPosts() {
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Calling the API when the page is loaded initially using the useEffect Hook
  useEffect(() => {
    fetchPosts();
  }, []);

  var firstBatch = posts.filter((item, index) => index < 10);
  var lastBatch = posts.slice(Math.max(posts.length - 10, 1));
  console.log('first 10 elements-->', firstBatch);
  console.log('Last 10 elements-->', lastBatch);
  function displayList(prop) {
    return prop.map((x) => (
      <li key={x.id} id={x.id} title={x.title}>
        {x.body}
      </li>
    ));
  }
  return (
    <div className="text-left p-3 w-75 mx-auto">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">
            <strong>Welcome, Please Login/Signup</strong>
          </h1>
        </div>
      </div>
      <div className="text-center m-5">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={search}
          >
            Search
          </button>
        </form>
      </div>
      <ul style={{ display: searchedPost.length > 0 ? 'block' : 'none' }}>
        <strong>
          <u>
            <em>Post ID {searchedPost.map((x) => x.id)}</em>
          </u>
        </strong>
        {searchedPost.length > 0 ? displayList(searchedPost) : null}
      </ul>
      <hr />
      <ul>
        <strong>
          <u>
            <em>First</em> 10 elements in the array
          </u>
        </strong>
        {displayList(firstBatch)}
      </ul>
      <hr />
      <ul>
        <strong>
          <u>
            <em>Last</em> 10 elements in the array
          </u>
        </strong>
        {displayList(lastBatch)}
      </ul>
    </div>
  );
}