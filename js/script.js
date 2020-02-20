const DATA = {
    whichSite: ['landing','multiPage','onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]
}

const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    endButton = document.querySelector('.end-button'),
    formCalculate = document.querySelector('.form-calculate'),
    totalField = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range');

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function priceCalculation(element) {
    if (element.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElement(fastRange);
    }
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

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
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