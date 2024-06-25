
const image = document.getElementById('cover'),
    title = document.getElementById('musicTitle'),
    artist = document.getElementById('musicArtist'),
    cuuerntTimeEl = document.getElementById('currentTime'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('playerProgress'),
    previousBtn = document.getElementById('previous'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    {
        path: 'music/El Arieb Menk.m4a',
        displayName: 'El Arieb Menk',
        cover: 'images/download.jpg',
        artist: 'Nagat'
    },
    {
        path: 'music/OmKolthom.m4a',
        displayName: 'Enta Omry',
        cover: 'images/cc6ed5abaa9855f9b812c2a7f82d0a9b.jpg',
        artist: 'OmKolthom'
    },
    {
        path: 'music/Seret_El_Hobshort_version_Umm_Kulthum_سيرة_الحب_نسخة_قصيرة.m4a',
        displayName: 'Seret_Elhob',
        cover: 'images/cc6ed5abaa9855f9b812c2a7f82d0a9b.jpg',
        artist: 'OmKolthom'
    },
    {
        path: 'music/Fakarouny.m4a',
        displayName: 'Fakrouny',
        cover: 'images/th.jpg',
        artist: 'OmKolthom'
    },
    {
        path: 'music/lovely.m4a',
        displayName: 'lovely',
        cover: 'images/Billi.jpg',
        artist: 'Billie'
    },
];

let musicIndex = 0;
let isPlaying = false;
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause()
}


function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) %
        songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}


function updateProgress() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor
        (time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)} : ${formatTime(duration % 60)}`;
    cuuerntTimeEl.textContent = `${formatTime(currentTime / 60)} : ${formatTime(currentTime % 60)}`;
}



function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener('click', togglePlay);
previousBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgress);
playerProgress.addEventListener('click', setProgressBar);
loadMusic(songs[musicIndex]);

