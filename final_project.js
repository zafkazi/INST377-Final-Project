//help form
function textValidation(){
            inputTest = document.getElementById("bigbox").value;
            const validationRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if(validationRegex.test(inputTest)) {
                alert('Error: Special characters not allowed in this field.')
                return false;
            }
            return true;
}

//populate currencies in form
function populateForm(){
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency  = document.getElementById("toCurrency");


    fetch("https://api.frankfurter.app/currencies")
    .then((res) => res.json())
    .then((resJson) => {
        console.log('Response JSON: ', resJson);

        for (const currencyCode in resJson) {
            console.log('Object: ', currencyCode);
            
            //Populate From Currency
            const option = document.createElement("option");
            option.value = currencyCode;
            option.innerHTML = resJson[currencyCode];
            fromCurrency.appendChild(option);
            
            //Populate To Currency
            const option2 = document.createElement("option");
            option2.value = currencyCode;
            option2.innerHTML = resJson[currencyCode];
            toCurrency.appendChild(option2);
        }
    });

}




window.onload = populateForm;