const list = document.querySelectorAll('.list select');

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