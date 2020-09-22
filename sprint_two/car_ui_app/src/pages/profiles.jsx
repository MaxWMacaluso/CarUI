import React from "react";
import { Link } from "react-router-dom";

const profilesPage = () => {
    return (
        <div>
            <h1>Profiles Page</h1>
            <h2>Select Profile (TODO add Component)</h2>

            {/* Renders hyper-text (like an a-tag) */}
            <Link to="/create_profile">Create Profile</Link>
        </div>
    );
};

export default profilesPage; 