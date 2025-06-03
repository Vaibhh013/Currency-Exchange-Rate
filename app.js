const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value || 1;

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const url = `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const rate = data[from][to];

        const finalAmount = amtVal * rate;

        // Country info
        const fromCountry = countryList[from.toUpperCase()];
        const toCountry = countryList[to.toUpperCase()];

        msg.innerText = `${amtVal} ${from.toUpperCase()} (${fromCountry}) = ${finalAmount.toFixed(4)} ${to.toUpperCase()} (${toCountry})`;
    } catch (err) {
        console.error("Error:", err);
        msg.innerText = "Error fetching exchange rate.";
    }
};


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    console.log('btn click');
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});