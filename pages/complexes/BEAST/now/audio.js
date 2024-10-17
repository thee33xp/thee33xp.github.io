// Get the audio element and buttons
const audio = document.getElementById('myAudio');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const volumeControl = document.getElementById('volumeControl');
const seekSlider = document.getElementById('seekSlider');

// Add event listeners to the buttons
playButton.addEventListener('click', function() {
    audio.play();
});

pauseButton.addEventListener('click', function() {
    audio.pause();
});


// Updating the seek slider as the audio plays
audio.addEventListener('timeupdate', () => {
    // Update the slider value based on the currenttime
    seekSlider.value = (audio.currentTime / audio.duration) * 100 ;

});

// Seek Slider Controls
seekSlider.addEventListener('input', () => {
    // Calculate the new time based on slider pos
    const seekTime = (seekSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});





// Set initial volume
audio.volume = volumeControl.value;

// Add event listener to the volume control
volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
});