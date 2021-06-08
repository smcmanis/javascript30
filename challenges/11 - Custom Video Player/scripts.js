const player = document.querySelector('.player')
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress');
const progressBarFill = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"');
const skipBtns = player.querySelectorAll('button[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play/pause controls
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updatePlayButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

// Slider/range controls
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Seeking 
function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleProgressUpdate() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBarFill.style.flexBasis = `${progress}%`;
}

// Skipping forward/backwards
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgressUpdate);

toggle.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let seeking = false;
progressBar.addEventListener('click', scrub)
progressBar.addEventListener('mousemove', (e) => seeking && scrub(e));
progressBar.addEventListener('mousedown', () => seeking = true);
progressBar.addEventListener('mouseup', () => seeking = false);

