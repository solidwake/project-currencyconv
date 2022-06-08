const list = document.querySelectorAll('.list select'),
button = document.querySelector('form button');

for(let i = 0; i < list.length; i++) {
    for(currencyList in countryList) {
        //Set USD to GBP as default conversion
        let selected;
        if(i == 0) {
            selected = currencyList == 'USD' ? 'selected' : '';
        } else if(i == 1){
            selected = currencyList == 'GBP' ? 'selected' : '';
        }
        //Create an option tag that passes the currency as a text value
        let option = `<option value='${currencyList}' ${selected}>${currencyList}</option>`;
        //Insert the option tag into the select tag
        list[i].insertAdjacentHTML('beforeend', option);
    }
}

button.addEventListener('click', event => {
    event.preventDefault(); //Prevent form submission
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector('.amount input');
    let amountValue = amount.amountValue;
    //Set input value to 1 if user input is 0 or empty
    if(amountValue == '' || amountValue == '0') {
        amount.value = '1';
        amountValue = 1;
    }
}