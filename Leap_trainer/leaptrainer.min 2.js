/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Robert O'Leary
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * ------------------------------------------- NOTE -------------------------------------------
 *
 * The default recognition function in this version of LeapTrainer is geometric template matching.  
 * 
 * The implementation below is based on work at the University of Washington, described here:
 * 
 * 	http://depts.washington.edu/aimgroup/proj/dollar/pdollar.html
 * 
 * This implementation has been somewhat modified, functions in three dimensions, and has been 
 * optimized for performance.
 * 
 * --------------------------------------------------------------------------------------------
 */
var LeapTrainer={};(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true,prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}function Class(){if(!initializing&&this.initialize){this.initialize.apply(this,arguments);}}Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;Class.overidden=prop;return Class;};})();LeapTrainer.Controller=Class.extend({controller:null,pauseOnWindowBlur:false,minRecordingVelocity:300,maxRecordingVelocity:30,minGestureFrames:5,minPoseFrames:75,recordedPoseFrames:0,recordingPose:false,hitThreshold:0.65,trainingCountdown:3,trainingGestures:1,convolutionFactor:0,downtime:1000,lastHit:0,gestures:{},poses:{},trainingGesture:null,listeners:{},paused:false,renderableGesture:null,initialize:function(options){if(options){for(var optionName in options){if(options.hasOwnProperty(optionName)){this[optionName]=options[optionName];}}}this.templateMatcher=new LeapTrainer.TemplateMatcher();var connectController=!this.controller;if(connectController){this.controller=new Leap.Controller();}this.bindFrameListener();if(connectController){this.controller.connect();}},onFrame:function(){},bindFrameListener:function(){var recording=false,frameCount=0,gesture=[],recordValue=function(val){gesture.push(isNaN(val)?0:val);},recordVector=function(v){recordValue(v[0]);recordValue(v[1]);recordValue(v[2]);};this.onFrame=function(frame){if(this.paused){return;}if(new Date().getTime()-this.lastHit<this.downtime){return;}if(this.recordableFrame(frame,this.minRecordingVelocity,this.maxRecordingVelocity)){if(!recording){recording=true;frameCount=0;gesture=[];this.renderableGesture=[];this.recordedPoseFrames=0;this.fire("started-recording");}frameCount++;this.recordFrame(frame,this.controller.frame(1),recordVector,recordValue);this.recordRenderableFrame(frame,this.controller.frame(1));}else{if(recording){recording=false;this.fire("stopped-recording");if(this.recordingPose||frameCount>=this.minGestureFrames){this.fire("gesture-detected",gesture,frameCount);var gestureName=this.trainingGesture;if(gestureName){this.saveTrainingGesture(gestureName,gesture,this.recordingPose);}else{this.recognize(gesture,frameCount);}this.lastHit=new Date().getTime();this.recordingPose=false;}}}};this.controller.on("frame",this.onFrame.bind(this));if(this.pauseOnWindowBlur){this.controller.on("blur",this.pause.bind(this));this.controller.on("focus",this.resume.bind(this));}},recordableFrame:function(frame,min,max){var hands=frame.hands,j,hand,fingers,palmVelocity,tipVelocity,poseRecordable=false;for(var i=0,l=hands.length;i<l;i++){hand=hands[i];palmVelocity=hand.palmVelocity;palmVelocity=Math.max(Math.abs(palmVelocity[0]),Math.abs(palmVelocity[1]),Math.abs(palmVelocity[2]));if(palmVelocity>=min){return true;}if(palmVelocity<=max){poseRecordable=true;break;}fingers=hand.fingers;for(j=0,k=fingers.length;j<k;j++){tipVelocity=fingers[j].tipVelocity;tipVelocity=Math.max(Math.abs(tipVelocity[0]),Math.abs(tipVelocity[1]),Math.abs(tipVelocity[2]));if(tipVelocity>=min){return true;}if(tipVelocity<=max){poseRecordable=true;break;}}}if(poseRecordable){this.recordedPoseFrames++;if(this.recordedPoseFrames>=this.minPoseFrames){this.recordingPose=true;return true;}}else{this.recordedPoseFrames=0;}},recordFrame:function(frame,lastFrame,recordVector,recordValue){var hands=frame.hands;var handCount=hands.length;var hand,finger,fingers,fingerCount;for(var i=0,l=handCount;i<l;i++){hand=hands[i];recordVector(hand.stabilizedPalmPosition);fingers=hand.fingers;fingerCount=fingers.length;for(var j=0,k=fingerCount;j<k;j++){finger=fingers[j];recordVector(finger.stabilizedTipPosition);}}},recordRenderableFrame:function(frame,lastFrame){var frameData=[];var hands=frame.hands;var handCount=hands.length;var hand,finger,fingers,fingerCount,handData,fingersData;for(var i=0,l=handCount;i<l;i++){hand=hands[i];handData={position:hand.stabilizedPalmPosition,direction:hand.direction,palmNormal:hand.palmNormal};fingers=hand.fingers;fingerCount=fingers.length;fingersData=[];for(var j=0,k=fingerCount;j<k;j++){finger=fingers[j];fingersData.push({position:finger.stabilizedTipPosition,direction:finger.direction,length:finger.length});}handData.fingers=fingersData;frameData.push(handData);}this.renderableGesture.push(frameData);},create:function(gestureName,skipTraining){this.gestures[gestureName]=[];this.fire("gesture-created",gestureName,skipTraining);if(typeof skipTraining=="undefined"||!skipTraining){this.pause();this.startTraining(gestureName,this.trainingCountdown);}},startTraining:function(gestureName,countdown){if(countdown>0){this.fire("training-countdown",countdown);countdown--;setTimeout(function(){this.startTraining(gestureName,countdown);}.bind(this),1000);return;}this.resume();this.trainingGesture=gestureName;this.fire("training-started",gestureName);},retrain:function(gestureName){var storedGestures=this.gestures[gestureName];if(storedGestures){storedGestures.length=0;this.startTraining(gestureName,this.trainingCountdown);return true;}return false;},trainAlgorithm:function(gestureName,trainingGestures){for(var i=0,l=trainingGestures.length;i<l;i++){trainingGestures[i]=this.templateMatcher.process(trainingGestures[i]);}},saveTrainingGesture:function(gestureName,gesture,isPose){var trainingGestures=this.gestures[gestureName];trainingGestures.push(gesture);if(trainingGestures.length==this.trainingGestures){this.gestures[gestureName]=this.distribute(trainingGestures);this.poses[gestureName]=isPose;this.trainingGesture=null;this.trainAlgorithm(gestureName,trainingGestures);this.fire("training-complete",gestureName,trainingGestures,isPose);}else{this.fire("training-gesture-saved",gestureName,trainingGestures);}},distribute:function(trainingGestures){var factor=this.convolutionFactor;if(factor==0){return trainingGestures;}var gesture,generatedGesture,value;for(var i=0,p=factor;i<p;i++){for(var j=0,l=trainingGestures.length;j<l;j++){gesture=trainingGestures[j];generatedGesture=[];for(var k=0,m=gesture.length;k<m;k++){value=gesture[k];generatedGesture[k]=Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)*((value*10000)/50)+(value*10000))/10000;}trainingGestures.push(generatedGesture);}}return trainingGestures;},recognize:function(gesture,frameCount){var gestures=this.gestures,threshold=this.hitThreshold,allHits={},hit=0,bestHit=0,recognized=false,closestGestureName=null,recognizingPose=(frameCount==1);for(var gestureName in gestures){if(this.poses[gestureName]!=recognizingPose){hit=0;}else{hit=this.correlate(gestureName,gestures[gestureName],gesture);}allHits[gestureName]=hit;if(hit>=threshold){recognized=true;}if(hit>bestHit){bestHit=hit;closestGestureName=gestureName;}}if(recognized){this.fire("gesture-recognized",bestHit,closestGestureName,allHits);this.fire(closestGestureName);}else{this.fire("gesture-unknown",allHits);}},correlate:function(gestureName,trainingGestures,gesture){gesture=this.templateMatcher.process(gesture);var nearest=+Infinity,foundMatch=false,distance;for(var i=0,l=trainingGestures.length;i<l;i++){distance=this.templateMatcher.match(gesture,trainingGestures[i]);if(distance<nearest){nearest=distance;foundMatch=true;}}return(!foundMatch)?0:(Math.min(parseInt(100*Math.max(nearest-4)/-4,0),100)/100);},getRecordingTriggerStrategy:function(){return"Frame velocity";},getFrameRecordingStrategy:function(){return"3D Geometric Positioning";},getRecognitionStrategy:function(){return"Geometric Template Matching";},toJSON:function(gestureName){var gesture=this.gestures[gestureName];if(gesture){return JSON.stringify({name:gestureName,pose:this.poses[gestureName]?true:false,data:gesture});}},fromJSON:function(json){var imp=JSON.parse(json);var gestureName=imp.name;this.create(gestureName,true);this.gestures[gestureName]=imp.data;this.poses[gestureName]=imp.pose;return imp;},on:function(event,listener){var listening=this.listeners[event];if(!listening){listening=[];}listening.push(listener);this.listeners[event]=listening;return this;},off:function(event,listener){if(!event){return this;}var listening=this.listeners[event];if(listening){listening.splice(listening.indexOf(listener),1);this.listeners[event]=listening;}return this;},fire:function(event){var listening=this.listeners[event];if(listening){var args=Array.prototype.slice.call(arguments);args.shift();for(var i=0,l=listening.length;i<l;i++){listening[i].apply(this,args);}}return this;},pause:function(){this.paused=true;return this;},resume:function(){this.paused=false;return this;},destroy:function(){this.controller.removeListener("frame",this.onFrame);}});
/*
 * --------------------------------------------------------------------------------------------------------
 * 
 * 										GEOMETRIC TEMPLATE MATCHER
 * 
 * --------------------------------------------------------------------------------------------------------
 * 
 * Everything below this point is a geometric template matching implementation. This object implements the current 
 * DEFAULT default recognition strategy used by the framework.
 * 
 * This implementation is based on work at the University of Washington, described here:
 * 
 * 	http://depts.washington.edu/aimgroup/proj/dollar/pdollar.html
 * 
 * This implementation has been somewhat modified, functions in three dimensions, and has been 
 * optimized for performance.
 * 
 * Theoretically this implementation CAN support multi-stroke gestures - but there is not yet support in the LeapTrainer 
 * Controller or training UI for these kinds of gesture.
 * 
 * --------------------------------------------------------------------------------------------------------
 */
LeapTrainer.Point=function(x,y,z,stroke){this.x=x;this.y=y;this.z=z;this.stroke=stroke;};LeapTrainer.TemplateMatcher=Class.extend({pointCount:25,origin:new LeapTrainer.Point(0,0,0),process:function(gesture){var points=[];var stroke=1;for(var i=0,l=gesture.length;i<l;i+=3){points.push(new LeapTrainer.Point(gesture[i],gesture[i+1],gesture[i+2],stroke));}return this.translateTo(this.scale(this.resample(points,this.pointCount)),this.origin);},match:function(gesture,trainingGesture){var l=gesture.length,step=Math.floor(Math.pow(l,1-this.e)),min=+Infinity,minf=Math.min;for(var i=0;i<l;i+=step){min=minf(min,minf(this.gestureDistance(gesture,trainingGesture,i),this.gestureDistance(trainingGesture,gesture,i)));}return min;},gestureDistance:function(gesture1,gesture2,start){var p1l=gesture1.length;var matched=new Array(p1l);var sum=0,i=start,index,min,d;do{index=-1,min=+Infinity;for(var j=0;j<p1l;j++){if(!matched[j]){if(gesture1[i]==null||gesture2[j]==null){continue;}d=this.distance(gesture1[i],gesture2[j]);if(d<min){min=d;index=j;}}}matched[index]=true;sum+=(1-((i-start+p1l)%p1l)/p1l)*min;i=(i+1)%p1l;}while(i!=start);return sum;},resample:function(gesture,newLength){var target=newLength-1;var interval=this.pathLength(gesture)/target,dist=0,resampledGesture=new Array(gesture[0]),d,p,pp,ppx,ppy,ppz,q;for(var i=1,l=gesture.length;i<l;i++){p=gesture[i];pp=gesture[i-1];if(p.stroke==pp.stroke){d=this.distance(pp,p);if((dist+d)>=interval){ppx=pp.x;ppy=pp.y;ppz=pp.z;q=new LeapTrainer.Point((ppx+((interval-dist)/d)*(p.x-ppx)),(ppy+((interval-dist)/d)*(p.y-ppy)),(ppz+((interval-dist)/d)*(p.z-ppz)),p.stroke);resampledGesture.push(q);gesture.splice(i,0,q);dist=0;}else{dist+=d;}}}if(resampledGesture.length!=target){p=gesture[gesture.length-1];resampledGesture.push(new LeapTrainer.Point(p.x,p.y,p.z,p.stroke));}return resampledGesture;},scale:function(gesture){var minX=+Infinity,maxX=-Infinity,minY=+Infinity,maxY=-Infinity,minZ=+Infinity,maxZ=-Infinity,l=gesture.length,g,x,y,z,min=Math.min,max=Math.max;for(var i=0;i<l;i++){g=gesture[i];x=g.x;y=g.y;z=g.z;minX=min(minX,x);minY=min(minY,y);minZ=min(minZ,z);maxX=max(maxX,x);maxY=max(maxY,y);maxZ=max(maxZ,z);}var size=Math.max(maxX-minX,maxY-minY,maxZ-minZ);for(var i=0;i<l;i++){g=gesture[i];gesture[i]=new LeapTrainer.Point((g.x-minX)/size,(g.y-minY)/size,(g.z-minZ)/size,g.stroke);}return gesture;},translateTo:function(gesture,centroid){var center=this.centroid(gesture),g;for(var i=0,l=gesture.length;i<l;i++){g=gesture[i];gesture[i]=new LeapTrainer.Point((g.x+centroid.x-center.x),(g.y+centroid.y-center.y),(g.z+centroid.z-center.z),g.stroke);}return gesture;},centroid:function(gesture){var x=0,y=0,z=0,l=gesture.length,g;for(var i=0;i<l;i++){g=gesture[i];x+=g.x;y+=g.y;z+=g.z;}return new LeapTrainer.Point(x/l,y/l,z/l,0);},pathDistance:function(gesture1,gesture2){var d=0,l=gesture1.length;for(var i=0;i<l;i++){d+=this.distance(gesture1[i],gesture2[i]);}return d/l;},pathLength:function(gesture){var d=0,g,gg;for(var i=1,l=gesture.length;i<l;i++){g=gesture[i];gg=gesture[i-1];if(g.stroke==gg.stroke){d+=this.distance(gg,g);}}return d;},distance:function(p1,p2){var dx=p1.x-p2.x;var dy=p1.y-p2.y;var dz=p1.z-p2.z;return Math.sqrt(dx*dx+dy*dy+dz*dz);}});