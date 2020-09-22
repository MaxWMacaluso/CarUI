import React from "react";
import { Link } from "react-router-dom";
import CarUIMoveable from '../components/CarUIMoveable'; //'./' is current folder


const carUIPage = () => {
    return (
        <div>
            <CarUIMoveable moveableTarget="target" />

            <img class="target" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>
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
