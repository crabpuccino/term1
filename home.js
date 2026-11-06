//buttons
const math  = document.getElementById('math');
const ph    = document.getElementById('physics');
const stat  = document.getElementById('stat');
const chem  = document.getElementById('chem');
const tech  = document.getElementById('tech');
const chaos = document.getElementById('67');
const manuf = document.getElementById('manuf');

//comp
const rating = document.getElementById('rator');
const right  = document.getElementById('right');
const wrong  = document.getElementById('wrong');
const rower  = document.getElementById('streak');
const timed  = document.getElementById('timed');

function buttonMain(val){
  sessionStorage.setItem('matt', val);
  window.location.href = 'mixer.html';
};

math.onclick = function(){buttonMain('Math 1')};
tech.onclick = function(){buttonMain('Tech writing')};
stat.onclick = function(){buttonMain('Mechanics 1')};

const rator = document.getElementById("rator");
const rightA = Number(localStorage.getItem('right')) || 0;
const wrongA = Number(localStorage.getItem('wrong')) || 0;
const timedA = Number(localStorage.getItem('times'))/1000 || 0;
const streak = localStorage.getItem('rower');

const percent = (rightA/(rightA+wrongA)*100).toFixed(2);
rator.textContent = percent+'%';
document.querySelector('.progress').style.setProperty('--p', (percent/100)*360);

right.textContent   = 'right answers: '+rightA;
wrong.textContent   = 'wrong answers: '+wrongA;
rower.textContent  = 'streak: '+streak;
if(timedA >= 60){
  timed.textContent = 'no lifeometer:'+(timedA/60).toFixed(2)+'mins';
}else if(timedA/60 >= 60){
  timed.textContent = 'no lifeometer:'+(timedA/60).toFixed(2)+'h';
}else{
  timed.textContent = 'no lifeometer: '+timedA.toFixed(2)+'secs';
};
