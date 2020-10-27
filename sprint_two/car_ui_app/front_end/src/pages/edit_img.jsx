import React from "react";
import { Link } from "react-router-dom";

const editImgPage = () => {
    return (
        <div>
            <h1>Edit Existing Image Page</h1>
            <h2>Tap existing image to:</h2>
            <ul>
                <li>Replace</li>
                <li>Delete</li>
            </ul>
            <Link to="/car_ui">Back to Car UI Page</Link>
        </div>
    );
};

export default editImgPage; 