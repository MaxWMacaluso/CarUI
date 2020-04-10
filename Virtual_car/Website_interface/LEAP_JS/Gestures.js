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
                } else if (circle.state == 'update') {
                    direction = circle.pointable.direction;
                    //if pointable exists
                    if (direction) {
                        normal = circle.normal;
                        clockwise = Leap.vec3.dot(direction, normal) > 0;
                        if (clockwise) {
                            console.log("Clockwise")
                        } else {
                            console.log("Counter-Clockwise")
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
                if(isHorizontal){
                    if(gesture.direction[0] > 0){
                        swipeDirection = "right";
                    } else {
                        swipeDirection = "left";
                    }
                } else { //vertical
                    if(gesture.direction[1] > 0){
                        swipeDirection = "up";
                    } else {
                        swipeDirection = "down";
                    }                  
                }
                console.log(swipeDirection)
                break;
            }
        });
    }
});

