import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useIsMounted from '../useIsMounted';
import "../styles.css"

var param;

export default function Home(props) {
  let homeProps = props.homeProps
  console.log('homeprops-->', homeProps);
  const [posts, setPosts] = useState([]); // Using the state hooks to store the data
  const [searchedPost, setSearchedPost] = useState([]);
  const [name, setName] = useState("Please Login/Signup")
  const [inValidSearch, setInValidSearch] = useState(false);

  var firstBatch = posts.filter((item, index) => index < 10);
  var lastBatch = posts.slice(Math.max(posts.length - 10, 1));

  const isMounted = useIsMounted();
  console.log('App mounted is-->', isMounted.current)

  function handleSearch(e) {
    const { value } = e.target;
    let pattern = new RegExp(/(^100$)|^[1-9]\d?$/)
    console.log(pattern.test(value))
    let res = pattern.test(value)
    if(res) {
      param = value;
      setInValidSearch(false)
    } else {
      param = ""
      setInValidSearch(true)
    }
  }

  function search(e) {
    e.preventDefault();
    searchPost()
  }

  // Fetching only the searched posts through the Id
  function searchPost() {
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
    if(isMounted.current) {
      fetchPosts();
    }
  }, [isMounted]);

  // Changing the name based on the home props
  useEffect(() => {
    if (homeProps) {
      setName(homeProps[0].name)
    }
  }, [name])

  // Displaying the list of elements
  function displayList(data) {
    return data.map((x) => (
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
            <strong>Welcome {name}</strong>
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
            style={{ display: name.includes('Login/Signup') ? 'none' : 'block' }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={search}
            style={{ display: name.includes('Login/Signup') ? 'none' : 'block' }}
            disabled={inValidSearch ? "disabled" : null}
          >
            Search
          </button>
        </form>
        <div className="text-center mt-2">
          {inValidSearch && <p className="text-danger para">Kindly enter valid digits from 1 to 100</p>}
        </div>
      </div>
      <div style={{ display: name.includes('Login/Signup') ? 'none' : 'block' }}>
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
    </div>
  );
}
