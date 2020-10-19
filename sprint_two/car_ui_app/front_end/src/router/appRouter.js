//NOTES:
    //In JSX, class is replaced by className
    //JS in curly braces

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

//Pages
import profilesPage from '../pages/profiles' //Done
import createProfilePage from '../pages/create_profile' //Done
import CarUIPage from '../pages/car_ui'
import uploadImgPage from '../pages/upload_img'
import editImgPage from '../pages/edit_img'
import notFoundPage from '../pages/404'; //Done
import Header from '../components/Header';
import Profile from '../components/Profile';
import Logout from '../components/Logout';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  return (
    <Router history={history}>
      <div>
        {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
        <Switch>
            <Route exact path="/" component={profilesPage}/>
            <Route path="/register_user" component={createProfilePage}/>
            <Route path="/profile" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route path="/car_ui" component={CarUIPage}/>
            <Route path="/upload_img" component={uploadImgPage}/>
            <Route path="/edit_img" component={editImgPage}/>

            {/* Goes here if none are triggered; AT BOTTOM */}
            <Route exact path='/404' component={notFoundPage}/>
            {/* <Redirect to='/404' /> */}
        </Switch>
      </div>
    </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);

//Experiment-----------------------------

// import React, {useState, useEffect} from 'react';
// import FileUpload from './components/FileUpload';
//
// function App() {
//   const [imgs, setImgs] = useState(false);
//   useEffect(() => {
//     getImg();
//   }, []);
//
//   function getImg(profile_id = null) {
//     console.log(`http://localhost:3001/image?profile_id=${profile_id}`)
//     fetch(`http://localhost:3001/image?profile_id=${profile_id}`)
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         setImgs(data);
//       });
//   }
//
//   function createImg() {
//     // let img_id = prompt('Enter image id');
//     let img_source = prompt('Enter image source');
//     let img_transform = prompt('Enter image transform');
//     let img_transform_origin = prompt('Enter transform origin');
//     let profile_id = prompt('Enter profile id');
//     fetch('http://localhost:3001/image', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({img_source, img_transform, img_transform_origin, profile_id}),
//     })
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         alert(data);
//         getImg();
//       });
//   }
//
//   function deleteImg() {
//     let img_id = prompt('Enter image id');
//     fetch('http://localhost:3001/image/${img_id}', {
//       method: 'DELETE',
//     })
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         alert(data);
//         getImg();
//       });
//   }
//
//   return (
//     <div>
//       {imgs ? imgs : 'There is no image data available'}
//       <br />
//       <button onClick={createImg}>Add image</button>
//       <br />
//       <button onClick={deleteImg}>Delete image</button>
//       <br/><br/><br/>
//       <FileUpload/>
//     </div>
//   );
// }
//
// export default App;
