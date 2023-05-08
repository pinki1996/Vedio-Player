const playbtn = document.getElementById('play');
const myvedio = document.querySelector('video');
const myProgressbar =  document.getElementById('progressbar');
const duration = document.getElementById('duration');
const hcurrentTime = document.getElementById('currenttime');
const progressrange = document.getElementById('progress-range');
const myVolumerange = document.getElementById('volume-range');
const myVolumeBar = document.getElementById('volume-bar');
const volumeBtn = document.getElementById('volume');
const speed = document.getElementById('speed');
const fullScreen = document.getElementById('fullscreen');
const playContainer = document.getElementById('player-container');



let isVedioplaying =  false;

function playVedio(){

    //playing the vedio
    isVedioplaying =  true;
    playbtn.classList.replace('fa-play','fa-pause')
    myvedio.play()
}

function pauseVedio(){

    //pause the vedio
    isVedioplaying =  false;
    playbtn.classList.replace('fa-pause','fa-play')
    myvedio.pause() 
}

function controlVedio(){
    
    //Logic to play or pause the vedio
    if(isVedioplaying){
        pauseVedio()
    }else{
        playVedio()
    }

}
playbtn.addEventListener('click',controlVedio);

myvedio.addEventListener('timeupdate',function(event){
    
    //Logic(currentTime, duration)
    
    let myCurrentTime = myvedio.currentTime;
    let myDuration = myvedio.duration;
    // console.log(myCurrentTime,myDuration)

    let progressPercentage = (myCurrentTime / myDuration) * 100 //total % of vedio that is already played
    // console.log(progressPercentage)
    myProgressbar.style.width = `${progressPercentage}%`


    //Logic for duration part (80.14)----> 1min second
    const durationInminutes = Math.floor(myDuration / 60) // minutes
    // console.log(durationInminutes)

    let durationInSeconds = Math.floor(myDuration % 60) //second
    // console.log(durationInSeconds)

    if(durationInSeconds <= 9){
        durationInSeconds = `0${durationInSeconds}` //05,06,07
    }
    
    duration.innerText  = `/${durationInminutes}:${durationInSeconds}`

    ///Logic for currenttime

    const currentTImeInminutes = Math.floor(myCurrentTime / 60) // minutes
    // console.log(durationInminutes)

    let currentTimeInSeconds = Math.floor(myCurrentTime % 60) //second
    // console.log(currentTimeInSeconds)

    if(currentTimeInSeconds <= 9){
        currentTimeInSeconds = `0${currentTimeInSeconds}` //05,06,07
    }
    
    hcurrentTime.innerText  = `${currentTImeInminutes}:${currentTimeInSeconds}`
})

progressrange.addEventListener('click',function(event){
    //logic to move the bar to that location 
    // totalWidth of bar = 1282px

    // console.log(event)
    const totalWidth = event.srcElement.offsetWidth
    // console.log(totalWidth)

    const totalWidthfromstart = event.offsetX
    // console.log(totalWidthfromstart)

    const clickPercentage = (totalWidthfromstart / totalWidth) * 100
    // console.log(clickPercentage)

    myProgressbar.style.width = `${clickPercentage}%`

    myvedio.currentTime = (totalWidthfromstart / totalWidth) * myvedio.duration
})

myVolumerange.addEventListener('click',function(event){
    //Logic to control the volumn

    const totalWidth = event.srcElement.offsetWidth
    const totalWidthfromstart = event.offsetX
    
    let myVolumeBarPercentage = (totalWidthfromstart / totalWidth) *100
    myVolumeBar.style.width =`${myVolumeBarPercentage}%`

    // 0 ----> no sound
    //1 ---> max-sound

    const volumneInfo = totalWidthfromstart / totalWidth

    if(volumneInfo < 0.5){

        myvedio.volume = 0.2
    }else{
        myvedio.volume = 1
    }
})

let ismuted =false;

function mute(){

    //Logic to make the sound = 0, replace volumne btn to mute btn, volumn bar ---->0

    ismuted = true
    myvedio.volume = 0;
    volumeBtn.classList.replace('fa-volume-up','fa-volume-mute');
    myVolumeBar.style.width =`${0}%`
}
function unmute(){
    ismuted = false
    //Logic to make the sound unmute, replace mute btn to volume  btn
    const totalWidth = event.srcElement.offsetWidth
    const totalWidthfromstart = event.offsetX

    let myVolumeBarPercentage = (totalWidthfromstart / totalWidth) *100
    myVolumeBar.style.width =`${myVolumeBarPercentage}%`

    const volumneInfo = totalWidthfromstart / totalWidth
    if(volumneInfo < 0.5){

        myvedio.volume = 0.2
    }else{
        myvedio.volume = 1
    }

    volumeBtn.classList.replace('fa-volume-mute','fa-volume-up')
    
}

volumeBtn.addEventListener('click',function(){
    if(ismuted){
        unmute()
    }else{
        mute()
    }
})

speed.addEventListener('change',function(){
    myvedio.playbackRate = speed.value
})

let fullscreen = false;

function displayFullScreen(container){
    //Logic to display the vedio in full screen mode
    if(container.requestFullscreen){
        container.requestFullscreen()
    }
}
function closeFullScreen(container){
    // Logic to close the vedio which is already in full screen mode back to normal
    if(container.exitFullscreen){
        container.exitFullscreen()
    }
}

fullScreen.addEventListener('click',function(){
    //Logic to expand the full screen
    if(!fullscreen){
        displayFullScreen(playContainer)
    }else{
        closeFullScreen(playContainer)
    }
})

// ASSIGNMENT
// Create a reusable function that reduces the length of the code written for currentTime and duration. 
// ======================
// SOLUTION
// ======================
// Calculate display time format
// function displayTime(time) {
//     const minutes = Math.floor(time / 60);
//     let seconds = Math.floor(time % 60);
//     seconds < 10 ? seconds = `0${seconds}` : seconds;
//     return `${minutes}:${seconds}`;
//   }
  
//   // Update progress bar as video plays
//   function updateProgress() {
//     MyProgressBar.style.width = `${(MyVideo.currentTime / MyVideo.duration) * 100}%`;
//     CurrentTime.textContent = displayTime(MyVideo.currentTime);
//     Duration.textContent = displayTime(MyVideo.duration);
// }