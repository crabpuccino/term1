import { data_tw_mid, data_math_mid, data_stat_mid } from './data.js';
//tech writing
const tech_mid24 = data_tw_mid.slice(0,61);
const tech_mid23 = data_tw_mid.slice(60,121);
const tech_mid21 = data_tw_mid.slice(120,181);
const tech       = [tech_mid24, tech_mid23, tech_mid21];

//math1
const math_mid21 = data_math_mid.slice(0,30);
const math_mid22 = data_math_mid.slice(30,69);
const math_mid23 = data_math_mid.slice(69,100);
const math_mid24 = data_math_mid.slice(100,148);
const math_mid25 = data_math_mid.slice(148,198);
const math       = [math_mid21, math_mid22, math_mid23, math_mid24, math_mid25];

//ststics
const stat_mid19 = data_stat_mid.slice(0,17);
const stat_mid20 = data_stat_mid.slice(17,31);
const stat_mid22 = data_stat_mid.slice(31,46);
const stat_mid23 = data_stat_mid.slice(46,63);
const stat_mid24 = data_stat_mid.slice(63,80);
const stat_mid25 = data_stat_mid.slice(80,93);
const stat       = [stat_mid19, stat_mid20, stat_mid22, stat_mid23, stat_mid24, stat_mid25];


const quest = document.getElementById('quest');
const count = document.getElementById('count');
const c1    = document.getElementById('c1');
const c2    = document.getElementById('c2');
const c3    = document.getElementById('c3');
const c4    = document.getElementById('c4');
const c5    = document.getElementById('c5');
const check = document.querySelector('.main-btn');
const timer = document.getElementById('timer');
const row   = document.getElementById('row');
const exp   = document.querySelector('.explanation')

let answer = 0;
let score  = localStorage.getItem('right') || 0;
let wrong  = localStorage.getItem('wrong') || 0;
let Ttime  = Number(localStorage.getItem('times')) || 0;
let streak = 0;

function disable(){
  c1.style.pointerEvents = 'none';
  c2.style.pointerEvents = 'none';
  c3.style.pointerEvents = 'none';
  c4.style.pointerEvents = 'none';
  c5.style.pointerEvents = 'none';
};
function enable(){
  c1.style.pointerEvents = 'auto';
  c2.style.pointerEvents = 'auto';
  c3.style.pointerEvents = 'auto';
  c4.style.pointerEvents = 'auto';
  c5.style.pointerEvents = 'auto';
};
function del(){
  c1.style.borderColor = 'black';
  c2.style.borderColor = 'black';
  c3.style.borderColor = 'black';
  c4.style.borderColor = 'black';
  c5.style.borderColor = 'black';
  c1.style.backgroundColor = 'transparent';
  c2.style.backgroundColor = 'transparent';
  c3.style.backgroundColor = 'transparent';
  c4.style.backgroundColor = 'transparent';
  c5.style.backgroundColor = 'transparent';
  document.querySelectorAll(".letter").forEach(a => {
    a.style.backgroundColor = 'var(--sect-clr)';
  });
};

c1.onclick = function(){
  answer = document.getElementById("answer1").textContent;
  del();
  c1.style.borderColor = 'var(--lite-green)';
  c1.querySelector('.letter').style.backgroundColor = 'var(--lite-green)';
};
c2.onclick = function(){
  answer = document.getElementById("answer2").textContent;
  del();
  c2.style.borderColor = 'var(--lite-green)';
  c2.querySelector('.letter').style.backgroundColor = 'var(--lite-green)';
};
c3.onclick = function(){
  answer = document.getElementById("answer3").textContent;
  del();
  c3.style.borderColor = 'var(--lite-green)';
  c3.querySelector('.letter').style.backgroundColor = 'var(--lite-green)';
};
c4.onclick = function(){
  answer = document.getElementById("answer4").textContent;
  del();
  c4.style.borderColor = 'var(--lite-green)';
  c4.querySelector('.letter').style.backgroundColor = 'var(--lite-green)';
};
c5.onclick = function(){
  answer = document.getElementById("answer5").textContent;
  del();
  c5.style.borderColor = 'var(--lite-green)';
  c5.querySelector('.letter').style.backgroundColor = 'var(--lite-green)';
};

// add the rest from here ملكش دعوة باللي فوق
function shuffle(array) {
  let i = array.length,
    randint;

  while (i !== 0) {
    randint = Math.floor(Math.random() * i);
    i--;
    [array[i], array[randint]] = [
      array[randint],
      array[i],
    ];
  }

  return array;
};
let questions = [];
const quizat = sessionStorage.getItem('quizat').split(',');
if(sessionStorage.getItem('matt') === 'Tech writing'){
  for(let i of quizat){
    questions = questions.concat(tech[i]);
  };
} else if(sessionStorage.getItem('matt') === 'Math 1'){
  for(let i of quizat){
    questions = questions.concat(math[i]);
  };
} else if(sessionStorage.getItem('matt') === 'Mechanics 1'){
  for(let i of quizat){
    questions = questions.concat(stat[i]);
  };
}
questions = shuffle(questions);

let counter = 0;
function main(){
  quest.textContent = questions[counter][0];
  const options = shuffle(questions[counter].slice(1,6));
  document.getElementById('answer1').textContent = options[0];
  document.getElementById('answer2').textContent = options[1];
  document.getElementById('answer3').textContent = options[2];
  document.getElementById('answer4').textContent = options[3];
  document.getElementById('answer5').textContent = options[4];
  for(let j = 1; j<=5; j++){
    if(document.getElementById('answer'+j).textContent == ''){
      document.getElementById('c'+j).style.display = 'none';
    }else{document.getElementById('c'+j).style.display = 'flex';};
  };
  if(sessionStorage.getItem('matt') === 'Mechanics 1'){
    document.getElementById("figure").style.display = 'block';
    document.getElementById("figure").setAttribute("src", `./media/${questions[counter][6]}.jpg`);
  };
};
main();

const timing = stopwatch((t) => timer.textContent = t)

function stopwatch(onFrame = null) {
  let start = performance.now();
  let offset = 0;       // time accumulated before last pause
  let running = true;

  function frameLoop() {
    if (!running) return;

    const ms = offset + (performance.now() - start);

    if (typeof onFrame === "function") {
      onFrame(format(ms), ms);
    }

    requestAnimationFrame(frameLoop);
  }

  requestAnimationFrame(frameLoop);

  function pad(n, len = 2) {
    return String(n).padStart(len, "0");
  }

  function format(ms) {
    const h = Math.floor(ms / 3_600_000);
    ms %= 3_600_000;

    const m = Math.floor(ms / 60_000);
    ms %= 60_000;

    const s = Math.floor(ms / 1000);
    const milli = Math.floor((ms % 1000)/10);

    return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(milli)}`;
  }

  return {
    read() {
      return format(offset + (running ? performance.now() - start : 0));
    },
    readMs() {
      return offset + (running ? performance.now() - start : 0);
    },
    stop() {
      if (!running) return;
      offset += performance.now() - start;
      running = false;
    },
    resume() {
      if (running) return;
      running = true;
      start = performance.now();
      requestAnimationFrame(frameLoop);
    }
  };
};

let Ctime = 0;

check.onclick = function(){
  del();
  disable();
  const correct = questions[counter][Number(questions[counter][6])];
  if (answer == 0){enable();}
  else if(check.textContent === 'check'){
    if(correct == answer){
      switch(answer){
        case document.getElementById('answer1').textContent:
          c1.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer2').textContent:
          c2.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer3').textContent:
          c3.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer4').textContent:
          c4.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer5').textContent:
          c5.style.backgroundColor = 'var(--lite-green)';
          break;
      }
      score++;
      streak++;
      row.style.color = 'var(--accent)';
    }else{
      switch(answer){
        case document.getElementById('answer1').textContent:
          c1.style.backgroundColor = 'var(--lite-red)';
          break;
        case document.getElementById('answer2').textContent:
          c2.style.backgroundColor = 'var(--lite-red)';
          break;
        case document.getElementById('answer3').textContent:
          c3.style.backgroundColor = 'var(--lite-red)';
          break;
        case document.getElementById('answer4').textContent:
          c4.style.backgroundColor = 'var(--lite-red)';
          break;
        case document.getElementById('answer5').textContent:
          c5.style.backgroundColor = 'var(--lite-red)';
          break;
      };
      switch(correct){
        case document.getElementById('answer1').textContent:
          c1.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer2').textContent:
          c2.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer3').textContent:
          c3.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer4').textContent:
          c4.style.backgroundColor = 'var(--lite-green)';
          break;
        case document.getElementById('answer5').textContent:
          c5.style.backgroundColor = 'var(--lite-green)';
          break;
      };
      wrong++;
      if(localStorage.getItem('rower') < streak){localStorage.setItem('rower', streak);};
      streak = 0;
    };
    row.textContent = streak;
    Ttime = (Number(Ttime)+(Number(timing.readMs())-Ctime)).toFixed(0);
    console.log(Ctime)
    console.log(Ttime);
    Ctime = Number(timing.readMs());
    localStorage.setItem('right', score);
    localStorage.setItem('wrong', wrong);
    localStorage.setItem('times', Ttime);
    check.textContent = 'next';
    timing.stop();
    exp.textContent = questions[counter][7]
    exp.style.backgroundColor = 'var(--lite-green)'
  }else{
    row.style.color = 'var(--text-clr)';
    enable();
    counter++
    count.textContent = 'Q.'+String(counter+1);
    exp.textContent = '';
    exp.style.backgroundColor = 'var(--bg-clr)'
    main();
    answer = 0;
    check.textContent = 'check';
    timing.resume();
  };
};