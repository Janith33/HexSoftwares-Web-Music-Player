'use strict';



/*ALL MUSIC INFORMATION*/

const musicData = [
  {
    backgroundImage: "./code/assets/images/poster-1.jpeg",
    posterUrl: "./code/assets/images/poster-1.jpeg",
    title: "7 Years",
    album: "Blue Album",
    year: 2015,
    artist: "Lukas Graham",
    musicPath: "./code/assets/music/7-Years.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-2.jpg",
    posterUrl: "./code/assets/images/poster-2.jpg",
    title: "A Thousand Miles",
    album: "Legally Blonde",
    year: 2001,
    artist: "Vanessa Carlton",
    musicPath: "./code/assets/music/A Thousand Miles.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-3.jpg",
    posterUrl: "./code/assets/images/poster-3.jpg",
    title: "Forever Young",
    album: "Synth-pop",
    year: 1984,
    artist: "Alphaville",
    musicPath: "./code/assets/music/Alphaville_Forever_young.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-4.jpeg",
    posterUrl: "./code/assets/images/poster-4.jpeg",
    title: "Everything I Do",
    album: " Robin Hood: Prince of Thieves",
    year: 1991,
    artist: "Bryan Adams",
    musicPath: "./code/assets/music/Everything_I_Do_I_Do_It_For_You.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-5.jpg",
    posterUrl: "./code/assets/images/poster-5.jpg",
    title: "Every Breath You Take",
    album: "Synchronicity",
    year: 1983,
    artist: "The Police",
    musicPath: "./code/assets/music/EveryBreathYouTake.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-6.jpeg",
    posterUrl: "./code/assets/images/poster-6.jpeg",
    title: "As Long as You Love Me",
    album: "Backstreet's Back",
    year: 1997,
    artist: "Backstreet Boys",
    musicPath: "./code/assets/music/Backstreet-Boys-As-Long-as-You-Love-Me.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-7.jpg",
    posterUrl: "./code/assets/images/poster-7.jpg",
    title: "Always",
    album: "Cross Road",
    year: 1994,
    artist: "Bon Jovi",
    musicPath: "./code/assets/music/Bon_Jovi_Always.mp3",
  },

  {
    backgroundImage: "./code/assets/images/poster-8.jpg",
    posterUrl: "./code/assets/images/poster-8.jpg",
    title: "My Heart Will Go On",
    album: " ",
    year: 1997,
    artist: "Celine Dion",
    musicPath: "./code/assets/music/My_Heart_Will_Go_On.mp3",
  },

];





const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/*PLAYLIST*/

const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = musicData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title} Album Poster"
        class="img-cover">

      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `;
}



/*PLAYLIST MODAL SIDEBAR TOGGLE*/

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);




/*PLAYLIST ITEM*/

const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
});




/*PLAYER*/

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(musicData[currentMusic].musicPath);

const changePlayerInfo = function () {
  playerBanner.src = musicData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
  playerTitle.textContent = musicData[currentMusic].title;
  playerAlbum.textContent = musicData[currentMusic].album;
  playerYear.textContent = musicData[currentMusic].year;
  playerArtist.textContent = musicData[currentMusic].artist;

  audioSource.src = musicData[currentMusic].musicPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
}

addEventOnElements(playlistItems, "click", changePlayerInfo);



const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");




const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);




/*PLAY MUSIC*/

const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);




const playerRunningTime = document.querySelector("[data-running-time");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
}



/*RANGE FILL WIDTH*/

const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
  let element = this || ranges[0];

  const rangeValue = (element.value / element.max) * 100;
  element.nextElementSibling.style.width = `${rangeValue}%`;
}

addEventOnElements(ranges, "input", updateRangeFill);




/*SEEK MUSIC*/

const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);




/*END MUSIC*/

const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill();
  }
}



/*SKIP TO NEXT MUSIC*/

const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= musicData.length - 1 ? currentMusic = 0 : currentMusic++;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipNextBtn.addEventListener("click", skipNext);




/*SKIP TO PREVIOUS MUSIC*/

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic <= 0 ? currentMusic = musicData.length - 1 : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);



/*SHUFFLE MUSIC*/

const getRandomMusic = () => Math.floor(Math.random() * musicData.length);

const shuffleMusic = () => currentMusic = getRandomMusic();

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function () {
  playerShuffleBtn.classList.toggle("active");

  isShuffled = isShuffled ? false : true;
}

playerShuffleBtn.addEventListener("click", shuffle);



/*REPEAT MUSIC*/

const playerRepeatBtn = document.querySelector("[data-repeat]");

const repeat = function () {
  if (!audioSource.loop) {
    audioSource.loop = true;
    this.classList.add("active");
  } else {
    audioSource.loop = false;
    this.classList.remove("active");
  }
}

playerRepeatBtn.addEventListener("click", repeat);



/*MUSIC VOLUME*/

const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
}

playerVolumeRange.addEventListener("input", changeVolume);



/*MUTE MUSIC*/

const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume();
  }
}

playerVolumeBtn.addEventListener("click", muteVolume);