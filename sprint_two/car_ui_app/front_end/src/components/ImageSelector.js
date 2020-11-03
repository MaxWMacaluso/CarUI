import React, {useState, useEffect} from 'react';
import FileUpload from '../components/FileUpload';
import { getProfile } from '../actions/profile';



const ImageSelector = (props) => {
  const [tock, setTock] = useState(false);
  const [defaultImages, setDefaultImages] = useState(null);
  const [userImages, setUserImages] = useState(null);
  const user_token = localStorage.getItem('user_token');

  function fetchImages() {
    getProfile().then(res => {
      const profile_id = res.profile_id;
      fetch(`http://localhost:3001/userUploadedImages?access_token=${user_token}`).then(response => {
              return response.text();
      })
      .then(data => {
        try {
          setUserImages(JSON.parse(data).map((d) => <div><li><img onClick={() => props.imageChosen("http://localhost:3001/uploads/profile_"+profile_id+"/"+d)} src={"http://localhost:3001/uploads/profile_"+profile_id+"/"+d}/></li></div>));
        } catch(e) {
          console.log(e);
        }
        // setUserImages(data);
        console.log(userImages);
      });
    })
    // fetch(`http://localhost:3001/userUploadedImages?access_token=${user_token}`).then(res => {
    //   setUserImages(res);
    // }).catch(err => {
    //   console.log(err);
    // })


    fetch(`http://localhost:3001/defaultImages`).then(response => {
            return response.text();
    })
    .then(data => {

      // console.log(typeof data);
      setDefaultImages(JSON.parse(data).map((d) => <div><li><img onClick={() => props.imageChosen("http://localhost:3001/uploads/"+d)} src={"http://localhost:3001/uploads/"+d} /></li></div>));

      // setDefaultImages(data);
      console.log(defaultImages);
    });

    // console.log(defaultImages);
    // console.log(userImages);
  }

  function onSuccessfulImageUpload () {
    console.log("he")
    fetchImages()
  }

  useEffect(() => {
    if (tock == 0) {
      fetchImages()
    }
    setTock(1)


  });


  return (
    <div>
      <h3>Default Images</h3>
      <ul class="images">
      {defaultImages ? defaultImages : "No iamges here!"}
      </ul>
      <h3>User Images</h3>
      <ul class="images">
      {userImages ? userImages : "No iamges here!"}
      </ul>
      <FileUpload onSuccessfulUpload = {onSuccessfulImageUpload}/>
      <div style={{'color': props.skinColour}}></div>
      {/*<button onClick={props.imageChosen('hello')}>Click ME </button>*/}

    </div>
  )
}

export default ImageSelector
