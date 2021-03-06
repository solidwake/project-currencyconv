const list = document.querySelectorAll('.list select'),
fromCurrency = document.querySelector('.from select'),
toCurrency = document.querySelector('.to select'),
button = document.querySelector('form button');

for(let i = 0; i < list.length; i++) {
    for(currency_code in country_code) {
        //Set USD to GBP as default conversion
        let selected;
        if(i == 0) {
            selected = currency_code == 'USD' ? 'selected' : '';
        } else if(i == 1){
            selected = currency_code == 'GBP' ? 'selected' : '';
        }
        //Create an option tag that passes the currency as a text value
        let option = `<option value='${currency_code}' ${selected}>${currency_code}</option>`;
        //Insert the option tag into the select tag
        list[i].insertAdjacentHTML('beforeend', option);
    }
    list[i].addEventListener('change', event => {
        loadFlag(event.target);
    });
}

function loadFlag(element) {
    for(code in country_code) {
        if(code == element.value) {
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`
        }
    }
}

window.addEventListener('load', () => {
    getExchangeRate();
});

button.addEventListener('click', event => {
    event.preventDefault(); //Prevent form submission
    getExchangeRate();
});

const conversionArrows = document.querySelector('.list .conversion-arrows');
conversionArrows.addEventListener('click', () => {
    let tempCode = fromCurrency.value; //Temporary currency code in 'from' list
    fromCurrency.value = toCurrency.value; //Pass 'to' currency code into 'from' currency code
    toCurrency.value = tempCode; //Pass temporary currency code into 'to' currency code
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

var apiKey = config.API_KEY;

function getExchangeRate() {
    const amount = document.querySelector('.amount input'),
    exchangeRateText = document.querySelector('.exchange-rate');
    let amountValue = amount.value;
    //Set input value to 1 if user input is 0 or empty
    if(amountValue == '' || amountValue == '0') {
        amount.value = '1';
        amountValue = 1;
    }
    exchangeRateText.innerText = 'Getting exchange rate...';
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    //Fetch API response, parse into a JSON then pass the result into another method
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
        exchangeRateText.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() => {
        exchangeRateText.innerText = 'Something went wrong';
    });
}