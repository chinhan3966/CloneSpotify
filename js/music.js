var swiper = new Swiper(".main__right--container", {
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $(".main__right--playlist");
const btnPlay = $(".btn__play");
const btnPrev = $(".btn__prev");
const btnNext = $(".btn__next");
const audio = $("#audio");
const song = $("#song");
const singer = $("#singer");
const imgBox = $("#imgBox");
const progressSong = $("#progressSong");
const currentTime = $("#currentTime");
const durationSong = $("#durationSong");
const playlistItem = $(".main__right--playlist");
const example = $(".main__right--playlist__item");
const cdThumb = $(".dasboard__avatar");

const app = {
  isPlaying: false,
  indexCurrent: 0,
  songs: [
    {
      image: "./image/album-adam.jpg",
      name: "lock away",
      singer: "adam levine",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741533789224960/Alan_Walker_-_Sing_Me_To_SleepMP3_160K.mp3",
      time: "4:05",
    },
    {
      image: "./image/album-adele.jpg",
      name: "hello",
      singer: "adele",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741536591806484/Alan_Walker_-_Fade_NCS_ReleaseMP3_160K.mp3",
      time: "3:05",
    },
    {
      image: "./image/album-chaliputh.jpg",
      name: "attention",
      singer: "charliputh",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741544149549096/Andromedik_-_SHE_NCS_ReleaseMP3_160K.mp3",
      time: "2:05",
    },
    {
      image: "./image/album-ed_sheeran.jpg",
      name: "shape of you",
      singer: "ed sheeran",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741547203002389/Ascence_-_About_You_NCS_ReleaseMP3_160K.mp3",
      time: "1:05",
    },
    {
      image: "./image/album-shawn.jpg",
      name: "stitches",
      singer: "shawn mendes",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741549177995264/Cartoon_-_On___On_feat._Daniel_Levi_NCS_ReleaseMP3_160K.mp3",
      time: "4:10",
    },
    {
      image: "./image/album-hanava.jpg",
      name: "i hate u",
      singer: "hanava",
      path: "https://cdn.discordapp.com/attachments/775740994595323954/775741580619284540/Clarx___Harddope_-_Castle_NCS_ReleaseMP3_160K.mp3",
      time: "2:15",
    },
  ],
  render: function () {
    const listSong = app.songs.map(function (song, index) {
      return `

            <div class="main__right--playlist__item ${
              index === app.indexCurrent ? "active" : ""
            }" 
             data-index="${index}">
                <div class="number">0${index + 1}</div>
                <div class="playlist__img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="playlist__body">
                    <h2>${song.name}</h2>
                    <p>${song.singer}</p>
                </div>
                <div class="durationSong">
                    <h4>${song.time}</h4>
                </div>
                <div class="playlist__iconHeart">
                    <i class="fas fa-heart"></i>
                </div>
            </div>

            `;
    });

    playlist.innerHTML = listSong.join("");
  },
  handleEvent: function () {
    const animateCd = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    animateCd.pause();

    btnPlay.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onended = function () {
      btnNext.click();
    };

    audio.onplay = function () {
      app.isPlaying = true;
      btnPlay.classList.add("active");
      animateCd.play();
    };

    audio.onpause = function () {
      app.isPlaying = false;
      btnPlay.classList.remove("active");
      animateCd.pause();
    };

    btnNext.onclick = function () {
      app.nextSong();
      app.render();
    };

    btnPrev.onclick = function () {
      app.prevSong();
      app.render();
    };

    audio.ontimeupdate = function () {
      var changePercent = (audio.currentTime / audio.duration) * 100;
      progressSong.value = changePercent;
      setTimeout(function () {
        durationSong.innerHTML = app.formatTime(audio.duration);
        currentTime.innerHTML = app.formatTime(audio.currentTime);
      }, 10);
    };

    progressSong.onchange = function () {
      var changeProgess = (progressSong.value * audio.duration) / 100;
      audio.currentTime = changeProgess;
    };

    playlistItem.onclick = function (e) {
      const nodeSong = e.target.closest(
        ".main__right--playlist__item:not(.active)"
      );
      // const nodeSongs = e.target.closest('.main__right--playlist')
      if (nodeSong) {
        app.indexCurrent = Number(nodeSong.getAttribute("data-index"));
        // nodeSong.preventDefault()
        // e.stopPropagation();
      }

      app.loadCunrentSong();
      audio.play();
      app.render();
    };
  },
  formatTime: function (time) {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }

    return `${min} : ${sec}`;
  },
  loadCunrentSong: function () {
    song.innerText = this.songs[this.indexCurrent].name;
    singer.innerText = this.songs[this.indexCurrent].singer;
    audio.src = this.songs[this.indexCurrent].path;
    imgBox.src = this.songs[this.indexCurrent].image;
  },

  playSong: function () {
    this.loadCunrentSong();
  },

  nextSong: function () {
    this.indexCurrent++;
    if (this.indexCurrent >= this.songs.length) {
      this.indexCurrent = 0;
    }
    this.loadCunrentSong();
    audio.play();
  },
  prevSong: function () {
    this.indexCurrent--;
    if (this.indexCurrent <= 0) {
      this.indexCurrent = app.songs.length - 1;
    }
    this.loadCunrentSong();
    audio.play();
  },
  start: function () {
    app.render();

    app.handleEvent();

    app.playSong();
  },
};

app.start();
