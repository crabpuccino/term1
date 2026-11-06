const matt = document.getElementById("matt");
matt.textContent = sessionStorage.getItem('matt') || "I'm more than lazy to add a failsafe plz choose a material frist";
if(matt.textContent == 'Tech writing'){
  document.getElementById("info").textContent = 'By: PROF. Dr. Tamer Helmy';
}

function generateFolders(array1, array2, counts) {
  let html = "";
  let pointer = 0;
  let idCounter = 0;

  array1.forEach((title, i) => {
    html += `<details class="folder" open>
      <summary class="sum">${title}</summary>
    `;

    for (let k = 0; k < counts[i]; k++) {
      html += `
        <div class="part flex-h">
          <label class="cat" for="ele${idCounter}">${array2[pointer]}</label>
          <input type="checkbox" class="what" id="ele${idCounter}">
        </div>
      `;
      pointer++;
      idCounter++;
    };

    html += `</details>\n`;
  });

  return html;
}; //it works don't touch it

let contents = [];
if(sessionStorage.getItem('matt') == 'Math 1'){
  const haeders = ["Mid1 prep"];
  contents = ["Mid 2021", "Mid 2022", "Mid 2023", "Mid 2024", "Mid 2025"];
  const counts = [5];
  document.querySelector("#container").innerHTML = generateFolders(haeders, contents, counts);

}else if(sessionStorage.getItem('matt') == 'Tech writing'){
  const haeders = ["Mid prep"];
  contents = ["Mid 2024", "Mid 2023", "Mid 2021"];
  const counts = [3];
  document.querySelector("#container").innerHTML = generateFolders(haeders, contents, counts);

}else if(sessionStorage.getItem('matt') == 'Mechanics 1'){
  const haeders = ["Mid prep"];
  contents = ["Mid 2019", "Mid 2020", "Mid 2022", "Mid 2023", "Mid 2024", "Mid 2025"];
  const counts = [6];
  document.querySelector("#container").innerHTML = generateFolders(haeders, contents, counts);
}

const start = document.getElementById('start');

start.onclick = function(){
  let quizat = [];
  for(let i = 0; i<contents.length; i++){
    if(document.getElementById("ele"+i).checked){
      quizat.push(i);
      console.log(quizat);
      console.log("contents:", contents);
    };
  };

  if(quizat.length === 0){
    document.getElementById('error').textContent = "you want smth in ur quiz or what";
  }
  else{
    sessionStorage.setItem('quizat', quizat);
    window.location.href = 'quiz.html';
  };
};