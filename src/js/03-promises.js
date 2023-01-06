import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
    const {
    elements: { delay, step, amount }
    } = event.currentTarget;

  for (let i = 1; i <= Number(amount.value); i += 1) {
    const stepTime = Number(delay.value) + Number(step.value) * (i - 1);
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



