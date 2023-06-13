/*
JS CODE FOR ASR DEMO APP.
script tag placed at end of body of index.html <-- once all elements exist
*/

// -----------------------------------
// Global variables
// -----------------------------------
let isToggled = false;
const filePath1 = "subtitleFile1.srt";
const filePath2 = "subtitleFile2.srt";
let currTime = 0;
let subtitles = [];

let subtitleElement = document.getElementById("subtitleDisplay");
let subtitlePrev = document.getElementById("subtitlePrev");
let subtitleNext = document.getElementById("subtitleNext");

let subtitleElementMobile = document.getElementById("subtitleDisplayMobile");
let subtitlePrevMobile = document.getElementById("subtitlePrevMobile");
let subtitleNextMobile = document.getElementById("subtitleNextMobile");

// -----------------------------------
// create waveform and attach audio
// -----------------------------------
var wavesurfer = WaveSurfer.create({
  container: document.getElementById("audio"),
  height: 210,
  waveColor: "white",
  progressColor: "#bef264",
  barWidth: 0, // 2
  barGap: 0, // 3
  barRadius: 2, // 4
  cursorColor: "#bef264",
  cursorWidth: 1,
});

wavesurfer.load("audio.wav"); // init load

var wavesurferMobile = WaveSurfer.create({
  container: document.getElementById("audioMobile"),
  height: 210,
  waveColor: "white",
  progressColor: "#bef264",
  barWidth: 0, // 2
  barGap: 0, // 3
  barRadius: 2, // 4
  cursorColor: "#bef264",
  cursorWidth: 1,
});

wavesurferMobile.load("audio.wav");

window.addEventListener("resize", function () {
  wavesurferMobile.load("audio.wav");
  wavesurfer.load("audio.wav");
});

// -----------------------------------
// Toggle button
// -----------------------------------
const toggleButton = document.getElementById("toggleButton");
const toggleDot = document.getElementById("toggleDot");
const typeElement = document.getElementById("ASRtype");

toggleButton.addEventListener("click", () => {
  isToggled = !isToggled;
  subtitles = [];
  subtitlePrev.textContent = "";
  subtitleNext.textContent = "";
  subtitleElement.textContent = "Real-time transcription";

  subtitlePrevMobile.textContent = "";
  subtitleNextMobile.textContent = "";
  subtitleElementMobile.textContent = "Real-time transcription";

  if (isToggled) {
    toggleButton.classList.add("bg-gray-300");
    toggleButton.classList.remove("bg-lime-400");
    toggleDot.style.transform = "translateX(-100%)";
    // wavesurfer.load("audioAlt.wav");
    if (wavesurfer.isPlaying()) {
        wavesurfer.playPause();
    }
    typeElement.textContent = "Other ASR";
  } else {
    toggleButton.classList.remove("bg-gray-300");
    toggleButton.classList.add("bg-lime-400");
    toggleDot.style.transform = "translateX(0)";
    // wavesurfer.load("audio.wav");
    if (wavesurfer.isPlaying()) {
        wavesurfer.playPause();
    }
    typeElement.textContent = "Sentient ASR";
  }
});

const toggleButtonMobile = document.getElementById("toggleButtonMobile");
const toggleDotMobile = document.getElementById("toggleDotMobile");

toggleButtonMobile.addEventListener("click", () => {
  isToggled = !isToggled;
  subtitles = []
  subtitlePrevMobile.textContent = ""
  subtitleNextMobile.textContent = ""
  subtitleElementMobile.textContent = "Real-time transcription"

  if (isToggled) {
    toggleButtonMobile.classList.add("bg-gray-300");
    toggleButtonMobile.classList.remove("bg-lime-400");
    toggleDotMobile.style.transform = "translateX(-100%)";
    if (wavesurferMobile.isPlaying()) {
        wavesurferMobile.playPause();
    }
    
  } else {
    toggleButtonMobile.classList.remove("bg-gray-300");
    toggleButtonMobile.classList.add("bg-lime-400");
    toggleDotMobile.style.transform = "translateX(0)";
    if (wavesurferMobile.isPlaying()) {
        wavesurferMobile.playPause();
    }
  }
});

// -----------------------------------
// Pause and play button functionality
// -----------------------------------
const playBtn = document.querySelector(".playButton");
const pauseBtn = document.querySelector(".pauseButton");
let filePath = filePath1;

const playBtnMobile = document.getElementById("playButtonMobile");
const pauseBtnMobile = document.getElementById("pauseButtonMobile");

wavesurfer.on("finish", function () {
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
});

wavesurferMobile.on("finish", function () {
  pauseBtnMobile.classList.add("hidden");
  playBtnMobile.classList.remove("hidden");
});

playBtn.addEventListener("click", () => {
  if (isToggled) {
    filePath = filePath2;
  } else {
    filePath = filePath1;
  }
  fetchFile(filePath);
  wavesurfer.playPause();
});

pauseBtn.addEventListener("click", () => {
  //   if (isToggled) {
  //     filePath = filePath2;
  //   }
  //   else {
  //     filePath = filePath1;
  //   }
  //   fetchFile(filePath);
  wavesurfer.playPause();
});

playBtnMobile.addEventListener("click", () => {
  if (isToggled) {
    filePath = filePath2;
  } else {
    filePath = filePath1;
  }
  fetchFile(filePath);
  wavesurferMobile.playPause();
});

pauseBtnMobile.addEventListener("click", () => {
  wavesurferMobile.playPause();
});

// displaying of pause/play element now depends on wavesurfer play/pause event.
// decoupled from the clicking of those elements
wavesurfer.on("play", function () {
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
});

wavesurfer.on("pause", function () {
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
});

wavesurferMobile.on("play", function () {
  playBtnMobile.classList.add("hidden");
  pauseBtnMobile.classList.remove("hidden");
});

wavesurferMobile.on("pause", function () {
  pauseBtnMobile.classList.add("hidden");
  playBtnMobile.classList.remove("hidden");
});

// -----------------------------------
// Grab and ready subtitles for use
// -----------------------------------

function fetchFile(filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((contents) => {
      processSRTFile(contents);
      // console.log(contents);
    })
    .catch((error) => {
      console.error(error);
    });
}

function processSRTFile(contents) {
  const lines = contents.trim().split("\n\n");

  for (let i = 0; i < lines.length; i++) {
    const [indexLine, timeLine, ...textLines] = lines[i].split("\n");
    const index = parseInt(indexLine);
    let [startTime, endTime] = timeLine.split(" --> ");
    const text = textLines.join("\n");
    startTime = convertTimestampToNumeric(startTime);
    endTime = convertTimestampToNumeric(endTime);
    const subtitle = { index, startTime, endTime, text };
    subtitles.push(subtitle);
    // console.log(subtitles)
  }
}

function convertTimestampToNumeric(timestamp) {
  const parts = timestamp.split(":");
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseFloat(parts[2].replace(",", "."));

  return hours * 3600 + minutes * 60 + seconds;
}

// -----------------------------------
// Get synchronised subtitles and display them
// -----------------------------------
const playElement = document.getElementById("playButton");
const pauseElement = document.getElementById("pauseButton");
const audioElement = document.getElementById("audio");

// Execute on Time Event update
wavesurfer.on("audioprocess", function () {
  getCurrentSubtitles();
});

wavesurferMobile.on("audioprocess", function () {
  getCurrentSubtitlesMobile();
  console.log("mobile exec")
});

let currTimeMin = 0;

function getCurrentSubtitles() {
  currTime = wavesurfer.getCurrentTime();

  for (i = 0; i < subtitles.length; i++) {
    if (
      currTime >= subtitles[i].startTime &&
      currTime <= subtitles[i].endTime
    ) {
      subtitleElement.textContent = subtitles[i].text;

      if (i - 1 >= 0) {
        subtitlePrev.textContent = subtitles[i - 1].text;
      }

      if (i + 1 < subtitles.length) {
        subtitleNext.textContent = subtitles[i + 1].text;
      }

      let timeElement = document.getElementById("timestampDisplay");
      if (currTime > 60) {
        currTimeMin = currTimeMin / 60;
        currTime = currTime % 60;
      }
      currTimeSec = Math.round(currTime);
      currTimeDisplay = currTimeMin.toString() + ":" + currTimeSec.toString();
      timeElement.textContent = currTimeDisplay;
    }
  }
}

function getCurrentSubtitlesMobile() {
  currTime = wavesurferMobile.getCurrentTime();

  for (i = 0; i < subtitles.length; i++) {
    if (
      currTime >= subtitles[i].startTime &&
      currTime <= subtitles[i].endTime
    ) {
      subtitleElementMobile.textContent = subtitles[i].text;

      if (i - 1 >= 0) {
        subtitlePrevMobile.textContent = subtitles[i - 1].text;
      }

      if (i + 1 < subtitles.length) {
        subtitleNextMobile.textContent = subtitles[i + 1].text;
      }

      let timeElementMobile = document.getElementById("timestampDisplayMobile");
      if (currTime > 60) {
        currTimeMin = currTimeMin / 60;
        currTime = currTime % 60;
      }
      currTimeSec = Math.round(currTime);
      currTimeDisplay = currTimeMin.toString() + ":" + currTimeSec.toString();
      timeElementMobile.textContent = currTimeDisplay;
    }
  }
}

// -----------------------------------
// Dropdown
// -----------------------------------
const dropdownMenu = document.getElementById("dropdownMenu");
let selectedOption = "Japanese";

dropdownMenu.addEventListener("change", function (event) {
  let oldOption = selectedOption;
  selectedOption = event.target.value;
  console.log(selectedOption);

  const currMenuOption = document.getElementById(selectedOption);
  const oldMenuOption = document.getElementById(oldOption);

  currMenuOption.classList.remove("hidden");
  oldMenuOption.classList.add("hidden");
});

const dropdownMenuMobile = document.getElementById("dropdownMenuMobile");
let selectedOptionMobile = "JapaneseMobile";

dropdownMenuMobile.addEventListener("change", function (event) {
  let oldOptionMobile = selectedOptionMobile;
  selectedOptionMobile = event.target.value + "Mobile";

  const currMenuOptionMobile = document.getElementById(selectedOptionMobile);
  const oldMenuOptionMobile = document.getElementById(oldOptionMobile);

  currMenuOptionMobile.classList.remove("hidden");
  oldMenuOptionMobile.classList.add("hidden");
});
