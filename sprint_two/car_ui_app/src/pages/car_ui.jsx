import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import CarUIMoveable from '../components/CarUIMoveable'; //'./' is current folder
import FileUpload from '../components/FileUpload';
import { useParams } from "react-router";

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
  const location = useLocation();
  let { profile_id } = useParams();
  const [tick, setTick] = useState(false);

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
    console.log(`http://localhost:3001/images-by-profile${location.search}`)
        fetch(`http://localhost:3001/images-by-profile${location.search}`)
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
            setImgs(data.map((d) => <div><li key={d.img_source}>{d.img_source}</li><img/></div>));

            // setImgs(<div><div dangerouslySetInnerHTML={{__html: newImageLines}} ></div><h2>Here</h2></div>);
          });
  }

  function FormatImages() {
    if (!imgs) {
      return <h1> Help </h1>
    }
    var newImageLines = ''
    for (var row of imgs) {
      newImageLines += `<img id = "placedImage" className="moveable_${row.img_id}" src = "${row.img_source}" style = ""/>`
    }
    return <div><div dangerouslySetInnerHTML={{__html: newImageLines}} ></div><h2>Here</h2></div>
;
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
        <div id = "canvas"></div>
            <CarUIMoveable id = "carUIMoveable" ref = {moveableComponentReference} moveableTarget="target" />
            {imgs ? imgs : "No iamges here!"}
            <button onClick = {console.log('hi')}>click </button>
            <img id = "placedImage" className="moveable_koala3" src="https://www.treehugger.com/thmb/pzsLSvqKfyLxIvqIogiWba54u3c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__05__koala-0f87652acc244db2ba7d2e231c868f16.jpg"/>
            <img id = "placedImage" className="moveable_koala4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>

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
