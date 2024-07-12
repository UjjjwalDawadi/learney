import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forum.css";

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    audience: "public",
  });
  const author = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    try {
      const postInformation = { ...newQuestion, author, userId };
      const response = await axios.post("/api/questions", postInformation);
      const savedQuestion = response.data;
      setQuestions([...questions, savedQuestion]);
      setShowQuestionForm(false);
      setNewQuestion({ title: "", content: "", audience: "public" });
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowQuestionForm(false);
    setNewQuestion({ title: "", content: "", audience: "public" });
  };

  const timeDifference = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMs = now - createdAt;

    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);
    const diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
    const diffInDays = Math.floor(diffInMs / 1000 / 60 / 60 / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="forum">
      <div className="forum-banner">
        <p>Before posting, please make sure to read the forum guidelines:</p>
        <ul>
          <li>Respect other users and their opinions.</li>
          <li>Avoid spamming or posting irrelevant content.</li>
          <li>Provide clear and concise questions.</li>
          <li>Be courteous and helpful when responding to others.</li>
        </ul>
      </div>
      <div style={{ display: "flex" }}>
        <div className="posts">
          {questions.map((question, index) => (
            (userRole === "Admin" || userRole === question.audience || question.audience === "Public") && (
                <div className="post-card" key={index}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <img
                      src={question.authorImage}
                      className="comment-image"
                      alt="author-profile"
                      style={{ width: "35px" }}
                    />
                    <span className="full-name">{question.author}</span>
                  </div>
                  <div>
                    <span className="audience">{question.audience}</span>
                  </div>
                </div>
                <span className="created-at">{timeDifference(question.createdAt)}</span>
                <h3 style={{ marginLeft: "20px" }}>{question.title}</h3>
                <p style={{ marginLeft: "20px" }}>{question.content}</p>
              </div>
            )
          ))}
        </div>
        {showQuestionForm ? (
          <form className="add-qn-form" onSubmit={handleSubmitQuestion}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newQuestion.title}
              onChange={handleChange}
              required
            />

            <label>Content</label>
            <textarea
              name="content"
              value={newQuestion.content}
              onChange={handleChange}
              required
            />

            <label>Choose post audience</label>
            <select
              name="audience"
              value={newQuestion.audience}
              onChange={handleChange}
            >
              <option value="Public">Public</option>
              <option value="Student">Students</option>
              <option value="Teacher">Teachers</option>
            </select>

            <div className="post-btns">
              <button className="post-btn" type="submit">
                Post Question
              </button>
              <button className="post-btn" type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{ width: "550px" }}>
            <button
              className="add-qn-btn"
              onClick={() => setShowQuestionForm(true)}
            >
              Add Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
