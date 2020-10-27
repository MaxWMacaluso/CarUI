//----------Leap Motion Stuff-------------------------------------------------
function concatData(id, data) {
    return id + ": " + data + "<br>";
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
      handString += concatData('confidence', hand.confidence)
      handString += concatData('pinch_strength', hand.pinchStrength);
      handString += concatData('grab_strength', hand.grabStrength);


      //can do hand.thumb and other fingers to get data
      handString += "<br>";
      for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
        finger = hand.fingers[j];
        //fingerString += concatData('finger_type', finger.type) + " (" + getFingerName(finger.type) + ") <br>";
        fingerString += concatData("finger_dip", finger.dipPosition);
        fingerString += concatData("finger_pip", finger.pipPosition);
        fingerString += concatData("finger_mcp", finger.mcpPosition);
        fingerString += "<br>";
      }

      frameString+= handString
    }

    output.innerHTML = frameString;
  });