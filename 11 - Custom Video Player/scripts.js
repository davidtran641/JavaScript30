const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update the play/pause button when video's state changed
function updateButton() {
    console.log('Update button');
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log("Skip " + this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log("Range " + this.name + ", value = "+ this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    // console.log(`Video time update, currentTime = ${video.currentTime}, ${video.duration}`);
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(`scrub scrubTime = ${scrubTime}`);
    video.currentTime = scrubTime;
}

// Hook up events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(button => button.addEventListener('change', handleRangeUpdate));
ranges.forEach(button => button.addEventListener('mousemove', handleRangeUpdate));


progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
