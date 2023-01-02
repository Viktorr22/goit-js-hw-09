const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;


function getRandomHexColor() {
  return body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startChangeColor = () => {
    timerId = setInterval(getRandomHexColor, 1000);
    buttonStart.setAttribute("disabled","disabled");
}

buttonStart.addEventListener('click', startChangeColor);

const stopChangeColor = () => {
    clearInterval(timerId);
    buttonStart.removeAttribute("disabled");
}

buttonStop.addEventListener('click', stopChangeColor);


