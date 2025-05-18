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
            'look up *currency': (currency) =>{
                const cleaned = currency.trim().toUpperCase();

                const chartDropdown = document.getElementById("chartCurrency");
                const options = Array.from(chartDropdown.options);

                const match = options.find(opt => opt.value === cleaned);

                if (match) {
                    chartDropdown.value = cleaned;
                    lookupCurrency(); // load the chart
                } else {
                    alert(`Currency "${cleaned}" not found.`);
                }
            }
               
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
//DOES NOT WORK ---- using our api, always sending alert that conversion failed
//considered using the other api, but only using it to load the forms for now
function convertCurrency(){
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("number").value;

    //Checks to see if currencies are same
    if (fromCurrency == toCurrency){
        alert("You cannot convert to the same currency");
    }
    else{
        fetch(`https://api.frankfurter.dev/v1/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then((resp) => resp.json())
    .then((data) => {
        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        //alert(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
        document.getElementById("conversionResult").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
        return false;
    }
}

if(!localStorage.getItem("background")){
    localStorage.setItem('background', 'light');
}
//chart
let currencyChart;
function populateChartDropdown(){
    const chartCurrency = document.getElementById("chartCurrency");

    fetch("https://api.frankfurter.app/currencies")
        .then(res => res.json())
        .then(data => {
            for (const code in data) {
                const option = document.createElement("option");
                option.value = code;
                option.textContent = `${code} - ${data[code]}`;
                chartCurrency.appendChild(option);
            }
        });

    chartCurrency.addEventListener("change", lookupCurrency);
}
async function lookupCurrency() {
    const currencyCode = document.getElementById("chartCurrency").value;

    if (!currencyCode) {
        alert("Please select a currency.");
        return;
    }

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 2); // Go back 2 years

    const to = toDate.toISOString().split("T")[0];
    const from = fromDate.toISOString().split("T")[0];

    const url = `https://api.frankfurter.app/${from}..${to}?from=EUR&to=${currencyCode}`;

    const dateLabels = [];
    const exchangeRates = [];

    try {
        const response = await fetch(url);
        const data = await response.json();

        for (const date in data.rates) {
            dateLabels.push(date);
            exchangeRates.push(data.rates[date][currencyCode]);
        }

        const ctx = document.getElementById("currencyChart").getContext("2d");

        if (currencyChart) {
            currencyChart.destroy();
        }

        currencyChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: dateLabels,
                datasets: [{
                    label: `EUR to ${currencyCode} (Past 2 Years)`,
                    data: exchangeRates,
                    borderWidth: 2,
                    borderColor: "#28a745",
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching chart data:", error);
        alert("Failed to fetch currency data.");
    }
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
    defaultCurrency();
    populateForm();
    populateChartDropdown();
})
function toggleTheme() {
    console.log(localStorage.getItem("background"));
    applyTheme(localStorage.getItem("background"));
}