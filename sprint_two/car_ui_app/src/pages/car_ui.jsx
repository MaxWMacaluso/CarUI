import React from "react";
import { Link } from "react-router-dom";

const carUIPage = () => {
    return (
        <div>
            <h1>Car UI Page</h1>
            <Link to="/upload_img">Upload Image</Link>
            <Link to="/edit_img">Edit Existing Image</Link>
            <h2>Edit Existing Image</h2>
            <ul>
                <li>Size, position, rotation</li>
                <li>Delete</li>
                <li>Replace</li>
            </ul>
            <Link to="/">Back to Profile Page</Link>
        </div>
    );
};

export default carUIPage; 