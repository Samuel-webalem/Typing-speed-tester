const typingtext = document.querySelector(".typing-text p"),
  inputfield = document.querySelector(".wrapper .input-field"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  timetag = document.querySelector(".time span b"),
  tryagainbtn = document.querySelector(".try-again");

let timer,
  maxtime = 30,
  timeleft = maxtime,
charindex = mistakes = istyping = 0;
 

function ramdomparagraph() {
  let randindex = Math.floor(Math.random() * paragaraps.length);
  typingtext.innerHTML = "";
  paragaraps[randindex].split("").forEach((span) => {
    let spantag = `<span>${span}</span>`;
    typingtext.innerHTML += spantag;
  });
  typingtext.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputfield.focus());
  typingtext.addEventListener("click", () => inputfield.focus());
}

function inittyping() {
  const characters = typingtext.querySelectorAll("span");
  let typedchar = inputfield.value.split("")[charindex];
 if (charindex<characters.length-1 && timeleft>0) {
  
  if (!istyping) {
    timer = setInterval(inittimer, 1000);
    istyping = true;
   }
   
  if (typedchar == null) {
    charindex--;
    if (characters[charindex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charindex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charindex].innerText === typedchar) {
      characters[charindex].classList.add("correct");
    } else {
      mistakes++;
      characters[charindex].classList.add("incorrect");
    }
    charindex++;
  }

  characters.forEach((span) => span.classList.remove("active"));
  characters[charindex].classList.add("active");

  let wpm = Math.round(
    ((charindex - mistakes) / 5 / (maxtime - timeleft)) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = wpm;
  cpmTag.innerText = charindex-mistakes; 
  }
 else {
   inputfield.value = "";
   clearInterval(timer);
  }
}
function inittimer() {
  if (timeleft>0) {
    timeleft--;
    timetag.innerText = timeleft;
  }
  else {
    clearInterval(timer);
  }
}

function resetgame() {
  ramdomparagraph();
  inputfield.value = "";
  clearInterval(timer); 
  timeleft = maxtime;
  charindex = mistakes = istyping = 0;
  timetag.innerText = timeleft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;  
}
ramdomparagraph();

inputfield.addEventListener("input", inittyping);
tryagainbtn.addEventListener("click",resetgame)