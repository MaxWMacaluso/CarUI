var CircleL_count = 0
var CircleR_count = 0
var SwipeL_count = 0
var SwipeR_count = 0
var SwipeU_count = 0
var SwipeD_count = 0
var upKey = 81
var downKey = 65
var downState = 81
//main loop that is continually checking for gestures
var controller = Leap.loop({enableGestures: true}, function(frame){
    //if a gestures is recognized 
    if(frame.valid && frame.gestures.length > 0){
        //Reconizes parent gesture, child gestures will be in each case statement
        frame.gestures.forEach(function(gesture){
          switch (gesture.type){

            case "circle":
                circle = gesture
                circle.pointable = frame.pointable(circle.pointableIds[0]);
                if (circle.state == 'start') {
                        clockwise = true
                        console.log("Circle Start");
                        //prints number of times finger goes in circle
                        // var circleProgress = gesture.progress;
                        // var completeCircles = Math.floor(circleProgress);
                        // console.log("Circle Update: " + completeCircles);
                } else if (circle.state == 'update' & circle.duration > .7) {
                    direction = circle.pointable.direction;
                    //if pointable exists
                    if (direction) {
                        normal = circle.normal;
                        clockwise = Leap.vec3.dot(direction, normal) > 0;
                        if (clockwise) {
                            console.log("Clockwise")
                            CircleL_count +=1
                            if (svg_map.has(upKey) & CircleL_count%9 == 0) 
                            {
                              alterSVG(svg_map, upKey)
                            }
                        } else {
                            console.log("Counter-Clockwise")
                            CircleR_count +=1
                            if (svg_map.has(downKey) & CircleR_count%9 ==0) 
                            {
                              alterSVG(svg_map, downKey)
                            }
                        }
                    }
                } else if (circle.state == 'stop') {
                    console.log("Stop Circle")
                    break;
                }
                break;
        
            case "keyTap":
                console.log("Key Tap Gesture");
                break;

            case "swipe":
                //Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                //Classify as right-left or up-down
                if(isHorizontal & gesture.duration > .5){
                    if(gesture.direction[0] > 0){
                        swipeDirection = "right";
                        if (SwipeR_count%3 == 0 & upKey == 81) {
                            upKey = 87
                            downKey = 83
                            highlight(svg_map,87,0)
                            highlight(svg_map,81,1)
                            highlight(svg_map,69,1)
                        }
                    } else {
                        swipeDirection = "left";
                        if (SwipeL_count%2 == 0 & downKey == 83){
                            upKey = 81
                            downKey= 65
                            highlight(svg_map,87,1)
                            highlight(svg_map,81,0)
                            highlight(svg_map,69,1)
                        }
                    }
                    console.log(swipeDirection)
                } else if(gesture.duration > .5) { //vertical
                    if(gesture.direction[1] > 0){
                        swipeDirection = "up";
                        SwipeU_count +=1
                        if (upKey == 81 & SwipeU_count%5 == 0) 
                        {
                          downState = 81
                          downKey = 68
                          upKey = 69
                          highlight(svg_map,87,1)
                          highlight(svg_map,81,1)
                          highlight(svg_map,69,0)
                        }
                        else if (upKey == 83 & SwipeU_count%5 == 0)
                        {
                            downState = 83
                            downKey = 68
                            upKey = 69
                            highlight(svg_map,87,1)
                            highlight(svg_map,81,1)
                            highlight(svg_map,69,0)
                        }
                    } else {
                        swipeDirection = "down";
                        SwipeD_count +=1
                        if (downState == 83 & SwipeD_count%5 == 0) 
                        {
                            upKey = 87
                            downKey = 83
                            highlight(svg_map,87,0)
                            highlight(svg_map,81,1)
                            highlight(svg_map,69,1)
                        }
                        else if (downState == 81 & SwipeD_count%5 == 0)
                        {
                            upKey = 81
                            downKey = 65
                            highlight(svg_map,87,1)
                            highlight(svg_map,81,0)
                            highlight(svg_map,69,1)
                        }
                    }
                    console.log(swipeDirection)                  
                }

                break;
            }
        });
    }
});

