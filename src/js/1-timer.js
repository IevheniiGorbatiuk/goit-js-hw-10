import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const daysDisplayed = document.querySelector('[data-days]');
const hoursDisplayed = document.querySelector('[data-hours]');
const minutesDisplayed = document.querySelector('[data-minutes]');
const secondsDisplayed = document.querySelector('[data-seconds]');
let startButton = document.querySelector('[data-start]');
function btnDisabled(){
    startButton.disabled = true;
    startButton.classList.remove("active-btn");
}
function btnActivated(){
    startButton.disabled = false;
    startButton.classList.add("active-btn");
}
startButton.disabled = true;
let userSelectedDate;
let timerInterval;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] > Date.now()){
            userSelectedDate = selectedDates[0];
            btnActivated();
            updateTimerDisplay();
        }else{
            userSelectedDate = undefined;
            btnDisabled();
            iziToast.error({
              message:
                'Please choose a date in the future',
              position: 'topRight',
              icon: '',
            });
        };
      console.log(selectedDates[0]);
    },
  };
  startButton.addEventListener('click', () => {
    if (userSelectedDate) {
      startTimer(); 
    }
  });
  
  function updateTimerDisplay() {
    const timeDifference = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
    if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
      daysDisplayed.textContent = addLeadingZero(days);
      hoursDisplayed.textContent = addLeadingZero(hours);
      minutesDisplayed.textContent = addLeadingZero(minutes);
      secondsDisplayed.textContent = addLeadingZero(seconds);
    }
  
   
    if (timeDifference <= 0) {
      stopTimer();
    }
  }
  
  function startTimer() {
    timerInterval = setInterval(updateTimerDisplay, 1000);
    btnDisabled();
  }
  
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
  
      daysDisplayed.textContent = '00';
      hoursDisplayed.textContent = '00';
      minutesDisplayed.textContent = '00';
      secondsDisplayed.textContent = '00';
  
      timerInterval = null;
    }
  }
  
  function addLeadingZero(number) {
    return String(number).padStart(2, '0');
  }
  
  function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
   flatpickr('#datetime-picker', options);