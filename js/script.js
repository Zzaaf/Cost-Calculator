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
    fastRange = document.querySelector('.fast-range'),
    totalPriceSum = document.querySelector('.total_price__sum'),
    adapt = document.getElementById('adapt'),
    mobileTemplates = document.getElementById('mobileTemplates');

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function priceCalculation(element) {
    let result = 0,
        index = 0,
        options = [];

    if (element.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElement(fastRange);
    }

    if (adapt.checked == false) {
        mobileTemplates.checked == false;
        mobileTemplates.setAttribute("disabled", "disabled");
    } else {
        mobileTemplates.removeAttribute("disabled", "disabled");
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value)            
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value)
        }
    }

    options.forEach(function(key){
        if (typeof(DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    })    

    result += DATA.price[index];

    totalPriceSum.textContent = result;
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