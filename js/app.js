const list = document.querySelectorAll('.list select');

for (let i = 0; i < list.length; i++) {
    for(currencyList in countryList) {
        //Create a variable that passes the currency as a text value
        let option = `<option value='${currencyList}'>${currencyList}</option>`;
        list[i].insertAdjacentHTML('beforeend', option);
    }
}