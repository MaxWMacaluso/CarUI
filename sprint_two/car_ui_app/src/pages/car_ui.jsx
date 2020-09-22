import React, {Component} from "react";
import ReactDOM from 'react-dom'

import { Link } from "react-router-dom";
import CarUIMoveable from '../components/CarUIMoveable'; //'./' is current folder

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


  render() {
    return (
        <div onMouseDown = {this.handleClick} onClick = {this.finishClick}>
        <div></div>
            <CarUIMoveable id = "carUIMoveable" ref = {this.moveableComponentReference} moveableTarget="target" />
            <button onClick = {console.log('hi')}>click </button>
            <img className="moveable_koala1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>
            <img className="moveable_koala2" src="https://www.cleveland.com/resizer/SXjBJpKXJyHP-3qgHMor_GD-bSc=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/5PDI6AQ7INBTVNP4VXP72DHSUQ.jpg"/>
            <img className="moveable_koala3" src="https://www.treehugger.com/thmb/pzsLSvqKfyLxIvqIogiWba54u3c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__05__koala-0f87652acc244db2ba7d2e231c868f16.jpg"/>
            <img className="moveable_koala4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/1117px-Cutest_Koala.jpg"/>

            <Link to="/upload_img">Upload Image</Link>
            <Link to="/edit_img">Edit Existing Image</Link>
            <h2>Edit Existing Image</h2>
            <ul>
                <li>Size, position, rotation</li>
                <li>Delete</li>
                <li>Replace</li>
            </ul>
            <Link to="/">Back to Profile Page</Link>
        </div>
    );
};
}
