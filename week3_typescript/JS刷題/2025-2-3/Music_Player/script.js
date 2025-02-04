// 獲取播放列表元素
const playlistSongs = document.getElementById("playlist-songs");
// 獲取播放按鈕元素
const playButton = document.getElementById("play");
// 獲取暫停按鈕元素
const pauseButton = document.getElementById("pause");
// 獲取下一首按鈕元素
const nextButton = document.getElementById("next");
// 獲取上一首按鈕元素
const previousButton = document.getElementById("previous");
// 獲取隨機播放按鈕元素
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

// 創建一個新的音頻對象
const audio = new Audio();

// 初始化用戶數據對象
let userData = {
  songs: [...allSongs],  // 複製所有歌曲到用戶的歌曲列表
  currentSong: null,     // 當前播放的歌曲，初始為 null
  songCurrentTime: 0,    // 當前歌曲播放的時間點，初始為 0
};

// 播放歌曲的函數
const playSong = (id) => {
  // 在用戶的歌曲列表中找到對應 ID 的歌曲
  const song = userData?.songs.find((song) => song.id === id);
  
  // 設置音頻源和標題
  audio.src = song.src;
  audio.title = song.title;

  // 決定從哪個時間點開始播放
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    // 如果是新歌曲，從頭開始播放
    audio.currentTime = 0;
  } else {
    // 如果是當前歌曲，從上次暫停的地方繼續播放
    audio.currentTime = userData?.songCurrentTime;
  }
  
  // 更新當前歌曲
  userData.currentSong = song;
  
  // 添加 "playing" 類到播放按鈕
  playButton.classList.add("playing");

  // 更新 UI
  highlightCurrentSong();    // 高亮當前播放的歌曲
  setPlayerDisplay();        // 設置播放器顯示
  setPlayButtonAccessibleText(); // 設置播放按鈕的無障礙文本
  
  // 開始播放音頻
  audio.play();
};

// 暫停播放歌曲的函數
const pauseSong = () => {
  // 保存當前歌曲播放的時間點
  userData.songCurrentTime = audio.currentTime;
  
  // 移除播放按鈕的 "playing" 類
  playButton.classList.remove("playing");
  // 暫停音頻播放
  audio.pause();
};

// 播放下一首歌曲的函數
const playNextSong = () => {
  if (userData?.currentSong === null) {
    // 如果當前沒有播放歌曲，播放列表中的第一首歌
    playSong(userData?.songs[0].id);
  } else {
    // 獲取當前歌曲的索引，並播放下一首歌
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

// 播放上一首歌曲的函數
const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    // 獲取當前歌曲的索引，並播放上一首歌
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
   }
};

// 隨機播放函數
const shuffle = () => {
  // 隨機排序歌曲列表
  userData?.songs.sort(() => Math.random() - 0.5);
  // 重置當前歌曲和播放時間
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  // 更新 UI
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

// 刪除歌曲的函數
const deleteSong = (id) => {
  // 如果刪除的是當前播放的歌曲，重置播放狀態
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }

  // 從歌曲列表中移除指定 ID 的歌曲
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  // 更新 UI
  renderSongs(userData?.songs); 
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

  // 如果刪除後歌曲列表為空，顯示重置按鈕
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    // 為重置按鈕添加點擊事件監聽器
    resetButton.addEventListener("click", () => {
      // 重置歌曲列表
      userData.songs = [...allSongs];
      // 更新 UI
      renderSongs(sortSongs()); 
      setPlayButtonAccessibleText();
      // 移除重置按鈕
      resetButton.remove();
    });
  }
};

// 設置播放器顯示信息的函數
const setPlayerDisplay = () => {
  // 獲取顯示歌曲標題和藝術家的元素
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  // 從用戶數據中獲取當前歌曲的標題和藝術家
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  // 更新顯示的歌曲標題和藝術家
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

// 高亮當前播放歌曲的函數
const highlightCurrentSong = () => {
  // 獲取所有播放列表中的歌曲元素
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  // 獲取當前播放歌曲的元素
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  // 移除所有歌曲元素的 aria-current 屬性
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  // 為當前播放的歌曲添加 aria-current 屬性
  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

// 渲染歌曲列表的函數
const renderSongs = (array) => {
  // 將歌曲數組轉換為 HTML 字符串
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  // 將生成的 HTML 插入到播放列表容器中
  playlistSongs.innerHTML = songsHTML;
};

// 設置播放按鈕的無障礙文本的函數
const setPlayButtonAccessibleText = () => {
  // 獲取當前歌曲或播放列表中的第一首歌
  const song = userData?.currentSong || userData?.songs[0];

  // 設置播放按鈕的 aria-label 屬性
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

// 獲取當前播放歌曲的索引
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// 為播放按鈕添加點擊事件監聽器
playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    // 如果當前沒有播放歌曲，播放第一首歌
    playSong(userData?.songs[0].id);
  } else {
    // 否則播放當前歌曲
    playSong(userData?.currentSong.id);
  }
});

// 為暫停按鈕添加點擊事件監聽器
pauseButton.addEventListener("click", pauseSong);

// 為下一首按鈕添加點擊事件監聽器
nextButton.addEventListener("click", playNextSong);

// 為上一首按鈕添加點擊事件監聽器
previousButton.addEventListener("click", playPreviousSong);

// 為隨機播放按鈕添加點擊事件監聽器
shuffleButton.addEventListener("click", shuffle);

// 為音頻結束事件添加監聽器
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      // 如果有下一首歌，播放下一首
      playNextSong();
    } else {
      // 如果沒有下一首歌，重置播放狀態
      userData.currentSong = null;
      userData.songCurrentTime = 0;  
      pauseSong()
      setPlayerDisplay()
      highlightCurrentSong()
      setPlayButtonAccessibleText()
    }
});

// 按歌曲標題排序的函數
const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

// 渲染排序後的歌曲列表
renderSongs(sortSongs());
// 設置播放按鈕的無障礙文本
setPlayButtonAccessibleText();