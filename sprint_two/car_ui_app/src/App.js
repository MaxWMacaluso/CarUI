// import React from 'react';
// import './App.css';
// import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

// //In JSX, class is replaced by className
// //JS in curly braces

// //Pages
// import profilesPage from './pages/profiles' //Done
// import createProfilesPage from './pages/create_profile' //Done
// import carUIPage from './pages/car_ui'
// import uploadImgPage from './pages/upload_img'
// import editImgPage from './pages/edit_img'

// import notFoundPage from './pages/404'; //Done

// function App() {
//   return (
//     //Router object can only have ONE child
//     <Router>
//       <Switch>
//         <Route exact path="/" component={profilesPage}/>
//         <Route exact path="/create_profile" component={createProfilesPage}/>
//         <Route exact path="/car_ui" component={carUIPage}/>
//         <Route exact path="/upload_img" component={uploadImgPage}/>
//         <Route exact path="/edit_img" component={editImgPage}/>

//         {/* Goes here if none are triggered; AT BOTTOM */}
//         <Route exact path='/404' component={notFoundPage}/>
//         <Redirect to='/404' />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

//Experiment-----------------------------

import React, {useState, useEffect} from 'react';
import FileUpload from './components/FileUpload';

function App() {
  const [imgs, setImgs] = useState(false);
  useEffect(() => {
    getImg();
  }, []);
  function getImg() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setImgs(data);
      });
  }

  function createImg() {
    let img_name = prompt('Enter image name');
    let pos_x = prompt('Enter pos x');
    let pos_y = prompt('Enter pos y');
    let rotation = prompt('Enter rotation');
    let scale = prompt('Enter scale');
    fetch('http://localhost:3001/img_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({img_name, pos_x, pos_y, rotation, scale}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getImg();
      });
  }

  function deleteImg() {
    let img_name = prompt('Enter image name');
    fetch('http://localhost:3001/img_data/${img_name}', {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getImg();
      });
  }

  return (
    <div>
      {imgs ? imgs : 'There is no image data available'}
      <br />
      <button onClick={createImg}>Add image</button>
      <br />
      <button onClick={deleteImg}>Delete image</button>
      <br/><br/><br/>
      <FileUpload/>
    </div>
  );
}
export default App;
