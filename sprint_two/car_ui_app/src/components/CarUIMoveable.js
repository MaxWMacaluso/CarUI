import React, {Component} from 'react';
import Moveable from "react-moveable";


export default class CarUIMoveable extends Component { //<h1>{moveableTarget}</h1>;
  constructor(props){
    super(props);
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

  componentDidMount(){
    this.setState({
      target: document.querySelector(".target"),
      frame: {
        translate: [0,0],
        scale: [1,1],
        rotate: 0,
        transformOrigin: "50% 50%"
      }
    });
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
                const { translate, rotate, transformOrigin } = this.state.frame;
                target.style.transformOrigin = transformOrigin;
                target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
                    +  ` rotate(${rotate}deg)`;
            }}
        />
    </div>;
}
}
