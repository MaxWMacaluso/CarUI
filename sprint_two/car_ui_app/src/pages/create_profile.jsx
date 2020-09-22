import React from "react";
import { Link } from "react-router-dom";

const createProfilesPage = () => {
    return (
        <div>
            <h1>Create Profile Page</h1>
            <h2>Add profile name</h2>
            <h2>Add more?</h2>

            <Link to="/car_ui">Car UI Page</Link>
        </div>
    );
};

export default createProfilesPage; 