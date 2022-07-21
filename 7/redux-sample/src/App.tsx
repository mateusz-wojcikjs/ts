import React, {useState} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {USER_TYPE} from "./store/UserReducer";
import UserDisplay from "./UserDisplay";
import {POST_TYPE} from "./store/PostReducer";
import PostDisplay from "./PostDisplay";

function App() {
  const [userId, setUserId] = useState(0);
  const dispatch = useDispatch()
  const [postId, setPostId] = useState(0);
  const onChangeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userIdFormInput = e.target.value ? Number(e.target.value) : 0;
    console.log("userid", e.target.value);
    setUserId(e.target.value ? Number(e.target.value) : 0);

    const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log("users", users);
      const user = users.find((userItem: any) => {
        return userItem && userItem.id === userIdFormInput;
      });
      dispatch({
        type: USER_TYPE,
        payload: {
          id: user.id,
          username: user.username,
          email: user.email,
          city: user.address.city,
        }
      });
    }
  }

  const onChangePostId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const postIdFormInput = e.target.value ? Number(e.target.value) : 0;
    setPostId(postIdFormInput);

    const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts/" + postIdFormInput);
    if (postResponse.ok) {
      const post = await postResponse.json();
      console.log("post", post);
      dispatch({
        type: POST_TYPE,
        payload: {
          id: post.id,
          title: post.title,
          body: post.body,
        }
      })
    }
  }
  return (
    <div className="App">
      <div>
        <label>Identyfikator użytkownika</label>
        <input type="text" value={userId} onChange={onChangeUserId}/>
      </div>
      <UserDisplay />
      <div>
        <label>Identyfikator Wpisu</label>
        <input type="text" value={postId} onChange={onChangePostId}/>
      </div>
      <PostDisplay />
    </div>
  );
}

export default App;
