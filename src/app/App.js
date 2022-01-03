import {useState} from 'react';
import React from "react";
import "./App.css";
import SearchBar from "../components/searchBar/SearchBar";
import PostsList from "../components/postsList/PostsList";

function App() {

  const [num, setNum] = useState(10);

  const loadMorePosts = () => {
    setNum(num+10)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./logo.png")} alt="" className="logo" />
        <h1>Reddix</h1>
      </header>
      <main>
        <SearchBar num={num}/>
        <PostsList loadMorePosts={loadMorePosts}/>
      </main>
    </div>
  );
}

export default App;
