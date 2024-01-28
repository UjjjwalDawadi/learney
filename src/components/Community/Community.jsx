import React, { useState, useEffect, useRef } from 'react';
import './Community.css';
import Header from '../Home/Header'
import { IoSend } from "react-icons/io5";

const Sidebar = ({ setGroupName }) => {
  const groupNames = ['Programming', 'Design', 'Marketing', 'Science'];

  return (
    <div className="sidebar-community">
      <h1>Groups</h1>
      {groupNames.map((name, index) => (
        <p key={index} onClick={() => setGroupName(name)}>
          {name}
        </p>
      ))}
    </div>
  );
};

const Community = () => {
  const [posts, setPosts] = useState([]); // This will hold all the posts
  const role = 'student'; // This will be the role of the user
  const [groupName, setGroupName] = useState(''); // This will be the name of the group
  const messagesEndRef = useRef(null);

  const handlePost = (event) => {
    event.preventDefault();
    const text = event.target.elements.postText.value;
    const newPost = { text, role };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    event.target.reset();
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [posts]);

  return (
    <div>
      <Header/>
      <div className='community-container'>
        <Sidebar setGroupName={setGroupName} />
        {groupName ? (
          <div className='community'>
            <div className='community-header'>
              <h2>{groupName}</h2>
            </div>
            <div className='community-field'>
              {posts.map((post, index) => (
                <div key={index}>
                  <p>{post.text}</p>
                  <p>Posted by: {post.role}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="message">
              <form onSubmit={handlePost}>
                <div className="message-field">
                <input type="text" name="postText" placeholder='Type  here..'/>
                <button className='send-button' type="submit"  ><span className='send-icon'><IoSend /></span></button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <p>To start a conversation, join a group.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
