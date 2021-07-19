let id,
  seconds = 0,
  minutes = 0,
  hours = 0;

let timer = document.getElementById("show-time");

document.getElementById("defaultOpen").click();

function openTabHandler(event, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  event.currentTarget.className += " active";
}

const startStopWatch = () => {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  timer.innerText =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  incrementTimer();
};

const incrementTimer = () => {
  id = setTimeout(startStopWatch, 1000);
};

const stopStopWatch = () => {
  clearTimeout(id);
};

const resetStopWatch = () => {
  clearTimeout(id);
  timer.textContent = "00:00:00";
  document.getElementById("laps").innerHTML = "";
  seconds = 0;
  minutes = 0;
  hours = 0;
};

const onLapHandler = () => {
  const li = document.createElement("li");
  li.className = "sw-lap";
  li.textContent = timer.innerText;
  document.getElementById("laps").appendChild(li);
};

var date = new Date();
console.log(date.toLocaleString("en-GB"));
