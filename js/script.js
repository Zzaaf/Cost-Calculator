const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    endButton = document.querySelector('.end-button'),
    formCalculate = document.querySelector('.form-calculate'),
    totalField = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range');

console.dir(startButton);

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function handler(event) {
    const target = event.target;
    
    if (target.classList.contains('want-faster')) {
        if (target.checked) {
            showElement(fastRange);
        } else {
            hideElement(fastRange);
        }
    }
}

startButton.addEventListener('click', function(){
    hideElement(firstScreen);
    showElement(mainForm);
})

endButton.addEventListener('click', function(){

    for (const element of formCalculate.elements) {
        if (element.tagName === 'FIELDSET') {
            hideElement(element);
        } 
    }

    showElement(totalField);
})

formCalculate.addEventListener('change', handler);