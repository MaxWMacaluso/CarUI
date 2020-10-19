import React from "react";
import { Link } from "react-router-dom";

const uploadImgPage = () => {
    return (
        <div>
            <h1>Upload Image Page</h1>
            <h2>Choose from:</h2>
            <ul>
                <li>File</li>
                <li>Google Drive</li>
                <li>More?</li>
            </ul>
            <Link to="/car_ui">Back to Car UI Page</Link>
        </div>
    );
};

export default uploadImgPage; 