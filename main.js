song=""
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
scoreLeftWrist=0
scoreRightWrist=0
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log('PoseNet Is Initialized')
}

function draw(){
    image(video,0,0,600,500)
    //color for the value displayers
    fill("#FF0000")
    //color for the red buttons
    stroke("#FF0000")
    //If condition for Y position
    if(scoreLeftWrist>0.1){
        //circle
        circle(leftWristX,leftWristY,20)
        //Left wrist y coordinates
        InNumberleftWristY=Number(leftWristY)
        //rounding y coordinates of the left wrist and putting it in the variable remove_decimals
        remove_decimals=floor(InNumberleftWristY)
        //Y coordinates divided by 500 and putting that in variable volume
        volume=remove_decimals/500
        //Value of volume on red button
        document.getElementById("volume").innerHTML="Volume ="+volume
        //setting the song's volume to the variable volume
        song.setVolume(volume)
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20)

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed=0.5x"
            song.rate(0.5)
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed=1x"
            song.rate(1)
        }
        if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed=1.5x"
            song.rate(1.5)
        }
        if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed=2x"
            song.rate(2)
        }
        if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed=2.5x"
            song.rate(2.5)
        }
    }
}

function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function gotPoses(results){
    if (results.length>0) {
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        scoreLeftWrist=results[0].pose.keypoints[9].score
        scoreRightWrist=results[0].pose.keypoints[10].score
        console.log("scoreLeftWrist="+scoreLeftWrist)
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)

        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("rightWristX="+leftWristX+"rightWristY="+leftWristY)
    }
}