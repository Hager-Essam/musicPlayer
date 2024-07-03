
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
        path: 'music/audio_2024-07-03_10-06-27.ogg',
        displayName: 'سورة الحجر',
        cover: 'images/OIP.jpg',
        artist: 'هزاع البلوشى '
    },
    {
        path: 'music/سورة الكهف احمد العجمي.m4a',
        displayName: 'سورة الكهف',
        cover: 'images/الكهف.png',
        artist: 'أحمد العجمى'
    },
    {
        path: 'music/سورة طه - إدريس ابكر.m4a',
        displayName: 'سورة طه',
        cover: 'images/ابكر.png',
        artist: 'ادريس ابكر'
    },
    {
        path: 'music/يا_قوم_إنما_هذه_الحياة_الدنيا_متاع_الشيخ_محمد_صديق_المنشاوي_سور.m4a',
        displayName: 'تلاوات نادرة',
        cover: 'images/OIP (1).jpg',
        artist: 'المنشاوى'
    },
    {
        path: 'music/{_وجاءت_سكرة_الموت_}_إستمع_كيف_تلاها_الشيخ_محمد_اللحيدان_بالنبرة.m4a',
        displayName: 'تلاوات اللحيدان',
        cover: 'images/OIP.jpg',
        artist: 'محمد اللحيدان'
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

