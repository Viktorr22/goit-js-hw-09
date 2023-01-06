import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const start = document.querySelector('button');
const input = document.querySelector('input[type="text"]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');


start.setAttribute("disabled", "disabled");

let someDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
        console.log(selectedDates);
      if (selectedDates.getTime() < Date.now()) {          
          Notiflix.Notify.failure('Please choose a date in the future');
          start.setAttribute("disabled", "disabled");
          return;
      }
      else { 
        someDate = selectedDates;
        start.removeAttribute("disabled"); 
      }
  },
};

flatpickr(input, options);

start.addEventListener("click", startTimer);

function startTimer() {
  const startDate = someDate.getTime();  
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = startDate - currentDate;   
    const timeComponents = convertMs(deltaTime);    
    updateTimerValue(timeComponents);
    if (deltaTime <= 1000) {
        clearInterval(intervalId);
  }
  }, 1000);
 
  start.setAttribute("disabled", "disabled");
}

function updateTimerValue({ days, hours, minutes, seconds }) {
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

























