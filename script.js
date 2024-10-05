const baseURL =
  "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdownMenu = document.querySelectorAll(".converter select");
const btn = document.querySelector("form button");
const fromCrncy = document.querySelector("select[name='from-country']");
const toCrncy = document.querySelector("select[name='to-country']");
const conMsg = document.querySelector(".conversion-msg");

for (let select of dropdownMenu) {
  for (let crncyCode in countryCodesList) {
    let newOption = document.createElement("option");
    newOption.innerText = crncyCode;
    newOption.value = crncyCode;

    if (crncyCode === "USD" && select.name === "from-country") {
      newOption.selected = "selected";
    } else if (crncyCode === "INR" && select.name === "to-country") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let crncyCode = element.value;
  let countryCode = countryCodesList[crncyCode];
  let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let imgSrc = element.parentElement.querySelector("img");
  imgSrc.src = newImgSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal < 1 || amtVal === "" || isNaN(amtVal)) {
    alert("Amount must be greater than 0 and should be numeric!!!");
    return;
  }

  const URL = `${baseURL}/${fromCrncy.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCrncy.value.toLowerCase()][toCrncy.value.toLowerCase()];

  let finalAmt = amtVal * rate;
  conMsg.innerText = `${amtVal} ${fromCrncy.value} = ${finalAmt} ${toCrncy.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
