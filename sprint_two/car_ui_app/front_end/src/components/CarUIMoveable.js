import React, {Component} from 'react';
import Moveable from "react-moveable";


export default class CarUIMoveable extends Component { //<h1>{moveableTarget}</h1>;
  constructor(props){
    super(props);
    this.resetState = this.resetState.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.frameFromStyle = this.frameFromStyle.bind(this);
    this.extract = this.extract.bind(this);

    this.state = {
      target: null,
      frame: {
        translate: [0,0],
        rotate: 0,
        scale: [1,1],
        transformOrigin: "50% 50%"
      }

    }
  }

  resetState() {
    this.setState({
      target: document.querySelector("." + this.props.moveableTarget + ""),
      frame: {
        translate: [0,0],
        scale: [1,1],
        rotate: 0,
        transformOrigin: "50% 50%"
      }
    });
  }
  resetStates(tempTarget) {
    console.log('Old frame: ');
    console.log(this.state.frame);
    this.setState({
      target: document.querySelector("." + tempTarget + ""),
      frame: this.frameFromStyle(tempTarget)
    });
  }

  extract(inputString, matchString) {
    var output = {};
    var variables = matchString.match(/\${.*?}/g)
    var split = matchString.split(/\${.*?}/g)
    for (var i = 0; i < variables.length; i++) {
      variables[i] = variables[i].replace("${", "").replace("}", "")
    }
    console.log(inputString)

    for (var i = 0; i < split.length; i++) {
      console.log()
      var beginIndex = inputString.indexOf(split[i])+split[i].length;
      inputString = inputString.substring(beginIndex);
      var endIndex = 0;
      try {
        endIndex = inputString.indexOf(split[i+1])
      } catch
      {
        endIndex = inputString.length;
      }
      output[variables[i]] = inputString.substring(0, endIndex);
    }
    return output;
  }

  frameFromStyle(tempTarget) {
    var frame = null;
    try {
      console.log('Trying')
      var transformOrigin = document.querySelector("." + tempTarget + "").style.transformOrigin;
      var transform = document.querySelector("." + tempTarget + "").style.transform;
      if (transform == NaN || transform == ""){
        throw 'Style.transform does not exist!'
      }
      // console.log("What is transform?")
      // console.log(transform)

      var transformValues = this.extract(transform, "translate(${translateX}px, ${translateY}px)"
          +  " rotate(${rotate}deg)"+ " scale(${scaleX}, ${scaleY})")
      // console.log('Results of transform values');
      // console.log(transformValues)
      frame = {
        translate: [parseInt(transformValues["translateX"]), parseInt(transformValues["translateY"])],
        scale: [parseFloat(transformValues["scaleX"]), parseFloat(transformValues["scaleY"])],
        rotate: parseFloat(transformValues["rotate"]),
        transformOrigin: transformOrigin
      }
      console.log('New frame: ')
      console.log(frame)
      //throw 'ee'
    } 
    catch(e) 
    {
      //console.log(`Caught ${e}`)
      frame = {
        translate: [0,0],
        scale: [1,1],
        rotate: 0,
        transformOrigin: "50% 50%"
      }
    }
    return frame;
  }

  componentDidMount(){
    this.resetState();
  }

  componentDidUpdate(prevProps){
    // this.target = document.querySelector(".jim")
    console.log("updating!")
  }

  render() {
    // put 1 below:  <div className="target">Target</div>

    return <div className="container">
        <Moveable
            target={this.state.target}

            //Scaleable
            scalable={true}
            keepRatio={false}
            throttleScale={0}
            renderDirections={["nw","n","ne","w","e","sw","s","se"]}

            originDraggable={true}
            originRelative={true}
            draggable={true}
            throttleDrag={0}
            startDragRotate={0}
            throttleDragRotate={0}
            zoom={1}
            origin={true}
            padding={{"left":0,"top":0,"right":0,"bottom":0}}
            rotatable={true}
            throttleRotate={0}
            rotationPosition={"top"}
            onScaleStart={({ set, dragStart }) => {
                set(this.state.frame.scale);
                dragStart && dragStart.set(this.state.frame.translate);
            }}
            onScale={({ target, scale, drag }) => {
                const beforeTranslate = drag.beforeTranslate;

                this.state.frame.translate = beforeTranslate;
                this.state.frame.scale = scale;
                this.state.target.style.transform
                    = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                    + ` scale(${scale[0]}, ${scale[1]})`;
            }}
            onScaleEnd={({ lastEvent }) => {
                if (lastEvent) {
                    this.state.frame.translate = lastEvent.drag.beforeTranslate;
                    this.state.frame.scale = lastEvent.scale;
                }
            }}
            onDragOriginStart={({ dragStart }) => {
                dragStart && dragStart.set(this.state.frame.translate);
            }}
            onDragOrigin={({ target, drag, transformOrigin }) => {
                this.state.frame.translate = drag.beforeTranslate;
                this.state.frame.transformOrigin = transformOrigin;
            }}
            onDragStart={({ set }) => {
                set(this.state.frame.translate);
            }}
            onDrag={({ target, beforeTranslate }) => {
                this.state.frame.translate = beforeTranslate;
            }}
            onRotateStart={({ set }) => {
                set(this.state.frame.rotate);
            }}
            onRotate={({ beforeRotate }) => {
                this.state.frame.rotate = beforeRotate;
            }}
            onRender={({ target }) => {
                const { translate, rotate, scale, transformOrigin } = this.state.frame;
                this.state.target.style.transformOrigin = transformOrigin;
                this.state.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
                    +  ` rotate(${rotate}deg)`+ ` scale(${scale[0]}, ${scale[1]})`;;
            }}
        />
    </div>;
}
}
