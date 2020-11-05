import React from 'react';

//TODO: Don't need?
//import { Link } from 'react-router-dom';

const Loading = () => {
  return (
    <div>
    <img className = "center" src = {process.env.PUBLIC_URL + '/loading.gif'} alt="Loading Gif"/>
    <div id = "overlay">Testing</div>
    </div>
  );
};

export default Loading;
