import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import CarUIMoveable from '../components/CarUIMoveable'; //'./' is current folder
import FileUpload from '../components/FileUpload';

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
  const [moveableComponentReference, setMoveableCommponentReference] = useState(React.createRef());
  const [begin, setBegin] = useState(null);
  const [end, setEnd] =  useState(null);





  // changeClass(){
  //   this.reloadChild();
  //   console.log("hi")
  //   if (this.value == "target")
  //       this.value = "temp"
  //     else
  //       this.value = "target"
  // }
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

      // this.moveableComponentReference.current.resetStates(newTarget);

    }

  }


  useEffect(() => {
    console.log(moveableComponentReference.current)
    // this.setState({ bodyHeight: this.calendarBodyRef .current.clientHeight });
  });

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

//             <img className="moveable_koala1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leo.svg/360px-Leo.svg.png"/>
            // <img className="moveable_koala2" src="../../App_icon_4.svg"/>


    return (
        <div onMouseDown = {handleClick} onClick = {finishClick}>
        <div id = "canvas"></div>
            <CarUIMoveable id = "carUIMoveable" ref = {moveableComponentReference} moveableTarget="target" />
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
