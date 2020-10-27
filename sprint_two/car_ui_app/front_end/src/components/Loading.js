import React from 'react';
import { Link } from 'react-router-dom';

const Loading = () => {
  return (
    <div>
    <img className = "center" src = {process.env.PUBLIC_URL + '/loading.gif'}/>
    <div id = "overlay">Testing</div>
    </div>
  );
};

export default Loading;
