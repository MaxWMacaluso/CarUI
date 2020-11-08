import React, {useState, useEffect} from 'react';
import { BASE_API_URL } from '../utils/constants';
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
      
      //USER IMAGES
      fetch(`${BASE_API_URL}/userUploadedImages?access_token=${user_token}`).then(response => {
              return response.text();
      })
      .then(data => {
        try 
        {                                                                             
          setUserImages(JSON.parse(data).map((d) => <div><li><img onClick={() => props.imageChosen(`${BASE_API_URL}/uploads/profile_`+profile_id+"/"+d)} src={`${BASE_API_URL}/uploads/profile_`+profile_id+"/"+d} alt="Set user images"/></li></div>));
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

    //SYSTEM DEFAULT IMAGES
    fetch(`${BASE_API_URL}/defaultImages`).then(response => {
            return response.text();
    })
    .then(data => {
      try 
      {                                                                                             
        setDefaultImages(JSON.parse(data).map((d) => <div><li><img onClick={() => props.imageChosen(`${BASE_API_URL}/uploads/`+d)} src={`${BASE_API_URL}/uploads/`+d} alt="Set default images" /></li></div>));
      } 
      catch(e) 
      {
        console.log(e);
      }
    });

      //setDefaultImages(data);
      //console.log(defaultImages);
  }

  function onSuccessfulImageUpload () {
    //console.log("he")
    fetchImages()
  }

  useEffect(() => {
    if (tock == 0) 
    {
      fetchImages()
    }
    setTock(1)
  });


  return (
    <div>
      <h3>Default Images</h3>
      <ul className="images">
        {defaultImages ? defaultImages : "No images here!"}
      </ul>
      <h3>User Images</h3>
        <ul className="images">
          {userImages ? userImages : "No images here!"}
        </ul>
      <FileUpload onSuccessfulUpload = {onSuccessfulImageUpload}/>
      <div style={{'color': props.skinColour}}></div>
      {/*<button onClick={props.imageChosen('hello')}>Click ME </button>*/}
    </div>
  )
}

export default ImageSelector
