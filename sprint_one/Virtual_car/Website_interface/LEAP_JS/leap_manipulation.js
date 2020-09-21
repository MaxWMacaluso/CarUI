//----------Leap Motion Stuff-------------------------------------------------
function concatData(id, data) {
    return id + ": " + data + "<br>";
}

function getFingerName(fingerType) {
  switch(fingerType) {
    case 0:
      return 'Thumb';
    break;
    
    case 1:
      return 'Index';
    break;

    case 2:
      return 'Middle';
    break;

    case 3:
      return 'Ring';
    break;

    case 4:
      return 'Pinky';
    break;
  }
}

function concatJointPosition(id, position) {
  return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}


var output = document.getElementById('output');
var frameString = "", handString ="", fingerString = "";
var hand, finger;

//leap.loop uses browser's requestAnimationFrame
var options = {enableGestures: true};
//main leap loop
Leap.loop(options, function(frame) {
  //prints frame id and data
  frameString = concatData("frame_id", frame.id);
  frameString += concatData("num_hands", frame.hands.length);
  frameString += concatData("num_fingers", frame.fingers.length);
  frameString += "<br>";

  //hand type (left or right)
  for (var i = 0, len = frame.hands.length; i < len; i++) {
    hand = frame.hands[i];
    handString = concatData('hands_type', hand.type);
    handString += concatData('confidence', hand.confidence);
    handString += concatData('pinch_strength', hand.pinchStrength);
    handString += concatData('grab_strength', hand.grabStrength);
    handString += "<br>";

    //helpers for thump, pinky, etc.
    fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition)
    for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
      finger = hand.fingers[j];
      fingerString += concatData('finger_type', finger.type) + " (" + getFingerName(finger.type) + ") <br>";
      fingerString += concatData("finger_dip", finger.dipPosition);
      fingerString += concatData("finger_pip", finger.pipPosition);
      fingerString += concatData("finger_mcp", finger.mcpPosition);
      fingerString += "<br>";
    }

    frameString+= handString
    frameString += fingerString
  }

  output.innerHTML = frameString;
});