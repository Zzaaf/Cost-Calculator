const DAY_STRING = ['день', 'дня', 'дней'];

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
    adapt_value = document.querySelector('.adapt_value');

    desktopTemplates = document.getElementById('desktopTemplates'),
    desktopTemplates_value = document.querySelector('.desktopTemplates_value'),

    mobileTemplates = document.getElementById('mobileTemplates'),
    mobileTemplates_value = document.querySelector('.mobileTemplates_value'),

    editable = document.getElementById('editable'),
    editable_value = document.querySelector('.editable_value'),

    typeSite = document.querySelector('.type-site'),
    maxDeadline = document.querySelector('.max-deadline'),
    rangeDeadline = document.querySelector('.range-deadline'),
    deadlineValue = document.querySelector('.deadline-value'),
    calcDescription = document.querySelector('.calc-description'),
    
    metrikaYandex = document.getElementById('metrikaYandex'),
    analyticsGoogle = document.getElementById('analyticsGoogle'),
    sendOrder = document.getElementById('sendOrder'),

    cardHead = document.querySelector('.card-head'),
    totalPrice = document.querySelector('.total_price'),
    firstFieldset = document.querySelector('.first-fieldset');
    

function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function addOptionsString() {
    let str = '';

    if (metrikaYandex.checked || analyticsGoogle.checked || sendOrder.checked) {
        str += '. Подключим:';

        if (metrikaYandex.checked) {
            str += ' Яндекс Метрику';

            if (analyticsGoogle.checked || sendOrder.checked) {
                str += ' и';                
            }
        }

        if (analyticsGoogle.checked) {
            str += ' Google Analytics';

            if (sendOrder.checked) {
                str += ' и';
                
            }
        }

        if (sendOrder.checked) {
            str += ' возможность отправки заявок на почту'
        }

        if (metrikaYandex.checked && analyticsGoogle.checked && sendOrder.checked) {
            str = '. Подключим Яндекс Метрику, Google Analytics и возможность отправки заявок на почту';                               
        }
    }

    str += '.';

    return str;
}

function renderTextContent(total, site, minDay, maxDay) {
    typeSite.textContent = site;
    totalPriceSum.textContent = total;
    rangeDeadline.min = minDay;
    rangeDeadline.max = maxDay;
    maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);

    adapt_value.textContent = adapt.checked ? 'Да' : 'Нет';
    desktopTemplates_value.textContent = desktopTemplates.checked ? 'Да' : 'Нет';
    mobileTemplates_value.textContent = mobileTemplates.checked ? 'Да' : 'Нет';
    editable_value.textContent = editable.checked ? 'Да' : 'Нет';

    calcDescription.textContent = `
    Разработаем ${site}${desktopTemplates.checked ? 'с индивидуальным дизайном' : ''}${adapt.checked ? ', адаптированный под мобильные устройства и планшеты' : ''}${editable.checked ? '. Установим панель админстратора, чтобы вы могли самостоятельно менять содержание на сайте без разработчика' : ''}${addOptionsString()}
    `;
}

function priceCalculate(element = {}) {
    let result = 0,
        index = 0,
        options = [],
        site = '',
        minDeadlineDay = DATA.deadlineDay[index][0],
        maxDeadlineDay = DATA.deadlineDay[index][1],
        overPercent = 0;

    if (element.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElement(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
            site = item.getAttribute('data-site');
            minDeadlineDay = DATA.deadlineDay[index][0];
            maxDeadlineDay = DATA.deadlineDay[index][1];                        
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        } else if (item.classList.contains('want-faster') && item.checked) {
            const overDay = maxDeadlineDay - rangeDeadline.value;
            overPercent = overDay * (DATA.deadlinePercent[index] / 100);   
        }
    }

    result += DATA.price[index];

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

    result += result * overPercent;

    renderTextContent(result, site, minDeadlineDay, maxDeadlineDay);    
}

function handler(event) {
    const target = event.target;
    
    if (target.classList.contains('want-faster')) {
        if (target.checked) {
            showElement(fastRange);
        } else {
            hideElement(fastRange);
        }
        priceCalculate(target);
    }

    if (!adapt.checked) {
        mobileTemplates.checked = false;
        mobileTemplates.setAttribute("disabled", "disabled");
        mobileTemplates_value.textContent = 'Нет';
    } else {
        mobileTemplates.removeAttribute("disabled", "disabled");
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculate(target);
    }
}

function moveBackPrice() {
    if (document.documentElement.getBoundingClientRect().bottom > document.documentElement.clientHeight + 200) {
        totalPrice.classList.remove('totalPriceBottom');
        firstFieldset.after(totalPrice);
        window.removeEventListener('scroll', moveBackPrice);
        window.addEventListener('scroll', movePrice);
    }
}

function movePrice() {
    if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 200) {
        totalPrice.classList.add('totalPriceBottom');
        endButton.before(totalPrice);
        window.removeEventListener('scroll', movePrice);
        window.addEventListener('scroll', moveBackPrice);
    }
}

startButton.addEventListener('click', function(){    
    hideElement(firstScreen);
    showElement(mainForm);

    window.addEventListener('scroll', movePrice);
})

endButton.addEventListener('click', function(){
    cardHead.textContent = 'Заявка на разработку сайта';
    hideElement(totalPrice);

    for (const element of formCalculate.elements) {
        if (element.tagName === 'FIELDSET') {
            hideElement(element);
        } 
    }

    showElement(totalField);
})

formCalculate.addEventListener('change', handler);
priceCalculate();