import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import CarUIMoveable from '../components/CarUIMoveable'; //'./' is current folder
import FileUpload from '../components/FileUpload';
import { useParams, RouteComponentProps } from "react-router";

// var value = "target"
//
// var element = <CarUIMoveable id = "carUIMoveable" moveableTarget={value} />;
//
// function changeClass(){
//   if (value == "target")
//     value = "temp"
//   else
//     value = "target"
//   element.resetState;
// }


function CarUIPage () {
  // Variables for Moveable
  const [moveableComponentReference, setMoveableCommponentReference] = useState(React.createRef());
  const [begin, setBegin] = useState(null);
  const [end, setEnd] =  useState(null);

  const [imgs, setImgs] = useState(false);
  const [localCopy, setLocalCopy] = useState(null);
  const location = useLocation();

  function getQueryParams() {
    var temp = location.search;
    temp = temp.split("?")[1]
    temp = temp.split(/=|\&/g);
    var queryParams = {};
    for (var i = 0; i < temp.length; i +=2) {
      queryParams[temp[i]] = temp[i+1]
    }
    return queryParams
  }

  var queryParams = null;
  try {
    queryParams = getQueryParams();
  }catch (e) {

  }
  console.log(queryParams)
  const [tick, setTick] = useState(false);
  const user_token = localStorage.getItem('user_token');


  useEffect(() => {
    if (tick == 0) {
      getImg();
    }
    setTick(1)
  });

  function getImg() {
    console.log(location);
    // var profile_id = location.search.query.profile_id;
    // console.l
    console.log(`http://localhost:3001/images-by-profile?access_token=${user_token}`)
        fetch(`http://localhost:3001/images-by-profile?access_token=${user_token}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            console.log("Data Retrieved:")
            console.log(data);
            var newImageLines = <div></div>
            for (var row of data) {
              var className = `moveable_${row.img_id}`;
              newImageLines += <img id = "placedImage" className={className} src = {row.img_source} style = ""/>
            }
            data = JSON.parse(data)
            // data =[{"name":"test1"},{"name":"test2"}];
            console.log(typeof data);
            setLocalCopy(data);
            setImgs(data.map((d) => <div><li key={d.img_source}>{d.img_source}</li><img id = "placedImage" className={"moveable"+d.img_id} src = {d.img_source} style = {{transform: d.img_transform, transformOrigin: d.img_transform_origin}} /></div>));

            // setImgs(<div><div dangerouslySetInnerHTML={{__html: newImageLines}} ></div><h2>Here</h2></div>);
          });
  }

  function save() {
    if (localCopy == null) {
      return;
    }
    for (var i = 0; i < localCopy.length; i++) {
      localCopy[i].img_transform = document.querySelector(".moveable" + localCopy[i].img_id + "").style.transform;
      localCopy[i].img_transform_origin = document.querySelector(".moveable" + localCopy[i].img_id + "").style.transformOrigin;
    }
    console.log(localCopy)
    fetch('http://localhost:3001/update-image-transforms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(localCopy)

    })
    .then(response => {
            return response.text();
    })
    .then(data => {
            alert(data);
            getImg();
    });
  }

  function addImage () {
    let img_source = prompt('Enter image source');
    let img_transform = `translate(0px, 0px)`+  ` rotate(0deg)`+ ` scale(1, 1)`
    let img_transform_origin = "50% 50%";
    // let profile_id = queryParams.profile_id;
    console.log({img_source, img_transform, img_transform_origin, user_token})
    if (img_source != null) {
    fetch('http://localhost:3001/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({img_source, img_transform, img_transform_origin, user_token})
    })
    .then(response => {
            return response.text();
    })
    .then(data => {
            alert(data);
            getImg();
    });
  }
  }

  function changeTarget(newTarget, delay = 0) {
    if (newTarget == null || newTarget == "" || !newTarget.startsWith('moveable')){
      newTarget ="none"
    }
    if (moveableComponentReference.current == null) {
      console.log('null')

    }
    else {
      console.log('resettingstates')
      moveableComponentReference.current.resetStates(newTarget);
    }
  }

  function handleClick(e){
    console.log("mouse is down!")
    setBegin(new Date());
  }

  function finishClick(e){
    console.log("mouse is up!")
    setEnd(new Date());

    if ((end - begin) < 200) {
      changeTarget(e.target.className)
    }
  }

    return (
        <div onMouseDown = {handleClick} onClick = {finishClick}>
        <button onClick = {save}> save </button>
        <div id = "canvas"></div>
            <CarUIMoveable id = "carUIMoveable" ref = {moveableComponentReference} moveableTarget="target" />
            {imgs ? imgs : "No iamges here!"}
            <button onClick = {addImage}>click </button>
            {/*<img id = "placedImage" className="moveable_koala3" src="https://www.treehugger.com/thmb/pzsLSvqKfyLxIvqIogiWba54u3c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__05__koala-0f87652acc244db2ba7d2e231c868f16.jpg"/>
            <img id = "placedImage" className="moveable_koala4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>*/}

                  <br/><br/><br/>
                  <FileUpload/>



            <Link to="/">Back to Profile Page</Link>
        </div>
    );

}
export default CarUIPage;
//
// <Link to="/upload_img">Upload Image</Link>
// <Link to="/edit_img">Edit Existing Image</Link>
// <h2>Edit Existing Image</h2>
// <ul>
//     <li>Size, position, rotation</li>
//     <li>Delete</li>
//     <li>Replace</li>
// </ul>
