import React, {Component} from "react";
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


export default class carUIPage extends Component {
  constructor(props){
    super(props);
    this.changeTarget = this.changeTarget.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.finishClick = this.finishClick.bind(this);
    // this.grabProfileImages = function () {
    //       // let profile_id = (useLocation().search).get("profile_id")
    //       console.log(`http://localhost:3001/images-by-profile?profile_id=${profile_id}`)
    //       fetch(`http://localhost:3001/images-by-profile?profile_id=${profile_id}`)
    //         .then(response => {
    //           return response.text();
    //         })
    //         .then(data => {
    //           console.log(data);
    //         });
    // }

    this.images = this.grabProfileImages();


    this.moveableComponentReference = React.createRef();
    this.begin = null;
    this.end = null;
  }




  // changeClass(){
  //   this.reloadChild();
  //   console.log("hi")
  //   if (this.value == "target")
  //       this.value = "temp"
  //     else
  //       this.value = "target"
  // }
  changeTarget(newTarget, delay = 0) {
    if (newTarget == null || newTarget == "" || !newTarget.startsWith('moveable')){
      newTarget ="none"
    }
    if (this.moveableComponentReference.current == null) {
      console.log('null')

    }
    else {
      console.log('resettingstates')
      this.moveableComponentReference.current.resetStates(newTarget);

      // this.moveableComponentReference.current.resetStates(newTarget);

    }
    this.value = "target"
  }


  componentDidMount() {
    console.log(this.moveableComponentReference.current)
    // this.setState({ bodyHeight: this.calendarBodyRef .current.clientHeight });
  }

  handleClick(e){
    console.log("mouse is down!")
    this.begin = new Date();
  }

  finishClick(e){
    console.log("mouse is up!")
    this.end = new Date();
    if ((this.end - this.begin) < 200) {
      this.changeTarget(e.target.className)
    }
  }

//             <img className="moveable_koala1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leo.svg/360px-Leo.svg.png"/>
            // <img className="moveable_koala2" src="../../App_icon_4.svg"/>

  render() {
    return (
        <div onMouseDown = {this.handleClick} onClick = {this.finishClick}>
        <div id = "canvas"></div>
            <CarUIMoveable id = "carUIMoveable" ref = {this.moveableComponentReference} moveableTarget="target" />
            <button onClick = {console.log('hi')}>click </button>
            <img id = "placedImage" className="moveable_koala3" src="https://www.treehugger.com/thmb/pzsLSvqKfyLxIvqIogiWba54u3c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__05__koala-0f87652acc244db2ba7d2e231c868f16.jpg"/>
            <img id = "placedImage" className="moveable_koala4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>

                  <br/><br/><br/>
                  <FileUpload/>



            <Link to="/">Back to Profile Page</Link>
        </div>
    );
};
}
//
// <Link to="/upload_img">Upload Image</Link>
// <Link to="/edit_img">Edit Existing Image</Link>
// <h2>Edit Existing Image</h2>
// <ul>
//     <li>Size, position, rotation</li>
//     <li>Delete</li>
//     <li>Replace</li>
// </ul>
