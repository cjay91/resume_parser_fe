import React, { useState } from "react";
import axios from 'axios';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PostForm = () => {
    const [post, setPost] = useState({
        title: '',
    });
    const [response, setResponse] = useState(null);

    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send a POST request to the specified endpoint with the data from the input field
        axios.post('http://127.0.0.1:5000/chat-with-csv', { post })
            .then(response => {
                // Assuming your response structure, adjust accordingly
                console.log(response);
                setResponse(response.data); // Update state with the response data
            })
            .catch(err => {
                console.error(err);
                setResponse('Error occurred'); // Update state with an error message
            });
    }

    return (
        <div className='d-flex align-items-center justify-content-center vh-100 w-100' style={{ textAlign: 'center', marginTop: '-200px' }}>
                <div className="w-50 text-center mt-5">
                <label>Enter the questions related to the candidate CVs.</label>
                <div className="upload-space"></div>
                <div className="card p-4" style={{ backgroundColor: "#e6f7ff" }}> {/* Wrap the form with a card */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" onChange={handleInput} name="title" />
                    </div>
                    <button className='btn btn-primary'>Submit</button>
                </form>
                {/* Conditional rendering of the response box */}
                {response !== null && (
                    <div className="response-box mt-4 p-3 border">
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default PostForm;
