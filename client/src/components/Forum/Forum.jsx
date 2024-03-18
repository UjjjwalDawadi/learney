import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Forum.css';

const Forum = () => {
    const [questions, setQuestions] = useState([]);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ title: '', content: '', audience: 'public' });
    const author = localStorage.getItem('username');

    useEffect(() => {
        // Fetch preexisting posts from the backend when the component mounts
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/questions');
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
                // Handle error gracefully (e.g., show error message to the user)
            }
        };

        fetchPosts();
    }, []); // Run this effect only once when the component mounts

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        try {
            // Create postInformation object with post data and author's name
            const postInformation = {
                ...newQuestion,
                author,
            };

            // Perform API call to submit the postInformation to the backend
            const response = await axios.post('/api/questions', postInformation);
            const savedQuestion = response.data;
            setQuestions([...questions, savedQuestion]);
            setShowQuestionForm(false); // Hide the question form after submission
            setNewQuestion({ title: '', content: '', audience: 'public' }); // Reset form fields
            window.location.reload();
        } catch (error) {
            console.error('Error submitting question:', error);
            // Handle error gracefully (e.g., show error message to the user)
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
        setNewQuestion({ title: '', content: '', audience: 'public' }); // Reset form fields
    };

    return (
        <div className='forum'>
            <div className="forum-banner">
                <p>Before posting, please make sure to read the forum guidelines:</p>
                <ul>
                    <li>Respect other users and their opinions.</li>
                    <li>Avoid spamming or posting irrelevant content.</li>
                    <li>Provide clear and concise questions.</li>
                    <li>Be courteous and helpful when responding to others.</li>
                </ul>
            </div>
            {showQuestionForm ? (
                <form className='add-qn-form' onSubmit={handleSubmitQuestion}>
                    <label>Title</label>
                    <input type="text" name="title" value={newQuestion.title} onChange={handleChange} required />

                    <label>Content</label>
                    <textarea name="content" value={newQuestion.content} onChange={handleChange} required />

                    <label>Choose post audience</label>
                    <select name="audience" value={newQuestion.audience} onChange={handleChange}>
                        <option value="Public">Public</option>
                        <option value="Student">Students</option>
                        <option value="Teacher">Teachers</option>
                    </select>

                    <div className="post-btns">
                        <button className="post-btn" type="submit">Post Question</button>
                        <button className="post-btn" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <button className='add-qn-btn' onClick={() => setShowQuestionForm(true)}>Add Question</button>
            )}
            {/* Render existing questions */}
            {questions.map((question, index) => (
                <div className='post-card' key={index}>
                    {question.author}
                    {question.createdAt}
                    <h3>{question.title}</h3>
                    <p>{question.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Forum;
