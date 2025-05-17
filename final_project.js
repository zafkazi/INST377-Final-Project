//help form
function textValidation(){
            inputTest = document.getElementById("bigbox").value;
            const validationRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if(validationRegex.test(inputTest)) {
                alert('Error: Special characters not allowed in this field.')
                
            }
            return false;
}
//annyang
function startVoice(){
    if (annyang){
        const commands = {
            'hello': () => alert('Hello World'),
            'change color to *color': (color) => document.body.style.backgroundColor = color,
            'navigate to *page': (page) => {
                const target = page.toLowerCase();
                if (target === 'home') window.location.href = 'home_page.html';
                else if (target === 'about') window.location.href = 'about_page.html';
                else if (target === 'help') window.location.href = 'help_page.html';
                else if (target === 'settings') window.location.href = 'settings_page.html';
            },
               
        }
        annyang.addCommands(commands);
        annyang.start();
    }
}
function stopVoice(){
    if(annyang){
        annyang.abort();
    }
}
//populate currencies in form

function populateForm(){
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency  = document.getElementById("toCurrency");


    fetch(`https://api.frankfurter.app/currencies`)
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

/*
function defaultCurrency(){
    const preferredCurrency  = document.getElementById("preferredCurrency");

    fetch(`https://api.frankfurter.app/currencies`)
    .then((res) => res.json())
    .then((resJson) => {
        console.log('Response JSON: ', resJson);

        for (const currencyCode in resJson) {
            console.log('Object: ', currencyCode);
            
            //Populate Preferred Currency
            const option3 = document.createElement("option");
            option3.value = currencyCode;
            option3.innerHTML = resJson[currencyCode];
            preferredCurrency.appendChild(option3);
            

        }
    });

}
*/
function convertCurrency(){
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if(!from || !to || !amount){
        alert("Please fill in all the fields before converting.")
        return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("conversionResult").innerHTML = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
            } else {
                alert("Conversion failed. Please try again.");
            }
        });
}

if(!localStorage.getItem("background")){
    localStorage.setItem('background', 'light');
}
//dark mode
function applyTheme(theme){
    if(theme === 'light'){
        document.body.classList.add("darkmode");
        localStorage.setItem("background", "dark");
    }
    else{
        document.body.classList.remove('darkmode');
        localStorage.setItem('background', 'light');

    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("anything");
    console.log(localStorage.getItem("background"));
    if(localStorage.getItem("background") === "dark"){
        document.body.classList.add("darkmode");

    }
    else{
        document.body.classList.remove('darkmode');

    }
    /*
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    applyTheme(savedTheme);

    const themeSelector = document.getElementById('theme');
    if (themeSelector) {
        themeSelector.value = savedTheme;
        themeSelector.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
    }
        */
})
function toggleTheme() {
    //const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    //const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    console.log(localStorage.getItem("background"));
    applyTheme(localStorage.getItem("background"));
}



window.onload = populateForm;
//window.onload = defaultCurrency;