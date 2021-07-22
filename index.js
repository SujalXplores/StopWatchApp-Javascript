let sw_id,
  timer_id,
  sw_seconds = 0,
  sw_minutes = 0,
  sw_hours = 0;

let stopWatch = document.getElementById('show-time');

document.getElementById('defaultOpen').click();

function openTabHandler(event, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(cityName).style.display = 'block';
  event.currentTarget.className += ' active';
}

const startStopWatch = () => {
  document.getElementById('sw-start').style.display = 'none';
  document.getElementById('sw-stop').style.display = 'inline-block';
  document.getElementById('sw-lap').style.display = 'inline-block';
  document.getElementById('sw-reset').style.display = 'inline-block';
  sw_seconds++;
  if (sw_seconds >= 60) {
    sw_seconds = 0;
    sw_minutes++;
    if (sw_minutes >= 60) {
      sw_minutes = 0;
      sw_hours++;
    }
  }

  stopWatch.innerText =
    (sw_hours ? (sw_hours > 9 ? sw_hours : '0' + sw_hours) : '00') +
    ':' +
    (sw_minutes ? (sw_minutes > 9 ? sw_minutes : '0' + sw_minutes) : '00') +
    ':' +
    (sw_seconds > 9 ? sw_seconds : '0' + sw_seconds);

  incrementStopWatch();
};

const incrementStopWatch = () => {
  clearInterval(sw_id);
  sw_id = setInterval(startStopWatch, 1000);
};

const resumeStopWatch = () => {
  incrementStopWatch();
  document.getElementById('sw-stop').style.display = 'inline-block';
  document.getElementById('sw-lap').style.display = 'inline-block';
  document.getElementById('sw-resume').style.display = 'none';
};

const stopStopWatch = () => {
  clearInterval(sw_id);
  document.getElementById('sw-stop').style.display = 'none';
  document.getElementById('sw-lap').style.display = 'none';
  document.getElementById('sw-resume').style.display = 'inline-block';
};

const resetStopWatch = () => {
  clearInterval(sw_id);
  stopWatch.textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  sw_seconds = 0;
  sw_minutes = 0;
  sw_hours = 0;
  document.getElementById('sw-start').style.display = 'inline-block';
  document.getElementById('sw-stop').style.display = 'none';
  document.getElementById('sw-lap').style.display = 'none';
  document.getElementById('sw-reset').style.display = 'none';
  document.getElementById('sw-resume').style.display = 'none';
};

const onLapHandler = () => {
  const li = document.createElement('li');
  li.className = 'sw-lap';
  li.textContent = stopWatch.innerText;
  document.getElementById('laps').appendChild(li);
};

setInterval(() => {
  const australia = new Date().toLocaleString('en-US', {
    timeZone: 'Australia/Sydney',
    timeStyle: 'medium',
  });

  const newYork = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    timeStyle: 'medium',
  });

  const london = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/London',
    timeStyle: 'medium',
  });

  const japan = new Date().toLocaleString('en-US', {
    timeZone: 'Japan',
    timeStyle: 'medium',
  });

  document.getElementById('city_australia').textContent = australia;
  document.getElementById('city_ny').textContent = newYork;
  document.getElementById('city_london').textContent = london;
  document.getElementById('city_japan').textContent = japan;
}, 1000);

const incrementTimer = (totalSecs) => {
  if (totalSecs > 0) {
    totalSecs--;
  }

  hh = Math.floor(totalSecs / 60 / 60);
  mm = Math.floor(totalSecs / 60) - hh * 60;
  ss = totalSecs % 60;

  document.getElementById('timer_value').innerText = `${hh}:${mm}:${ss}`;

  if (timer_id) clearInterval(timer_id);

  timer_id = setInterval(() => {
    incrementTimer(totalSecs);
  }, 1000);
};

const startTimer = () => {
  let timer_value = document.getElementById('timer_input').value;
  document.getElementById('timer_value').innerText = timer_value;

  let [hh, mm, ss] = timer_value.split(':');
  console.log(hh, mm, ss);
  let totalSecs = +hh * 60 * 60 + +mm * 60 + +ss;
  incrementTimer(totalSecs);
};
