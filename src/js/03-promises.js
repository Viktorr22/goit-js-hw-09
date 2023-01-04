
const button = document.querySelector('button');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
import Notiflix from 'notiflix';


button.addEventListener('click', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const inputFirstDelay = Number(firstDelay.value);
  const inputStepDelay = Number(stepDelay.value);  
  const inputAmount = Number(amount.value);  

  for (let i = 1; i <= inputAmount; i += 1) {
    const stepTime = inputFirstDelay + inputStepDelay * (i - 1);
    createPromise(i, stepTime)
      .then(({ position, delay }) => {
             Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            //  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
      .catch(({ position, delay }) => {
             Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
            //  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            });  

  }
}

function createPromise(position, delay) {  
   return new Promise((resolve, reject) => {
      setTimeout(() => {
       const shouldResolve = Math.random() > 0.3;
       if (shouldResolve) {
         resolve({ position, delay });
       }
       else {
         reject({ position, delay });
  }
    }, delay);
  });
}

// for (let i = 0; i < position; i += 1) {
//   createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// };

// let delay = null;
// let step = null;
// let position = null;

// amountValue.addEventListener('input', inputAmount);
// function inputAmount(event) {
//    position = event.target.value;
// }

// stepValue.addEventListener('input', inputStep);
// function inputStep(event) {
//    step = event.target.value;
// }

// delayValue.addEventListener('input', inputDelay);
// function inputDelay(event) {
//   console.log(position);
//    delay = event.target.value;
// }
