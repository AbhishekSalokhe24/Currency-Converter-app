const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropDowns = document.querySelectorAll(".drop-down select");

let btn = document.querySelector("form button");

const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");

let finalMsg = document.querySelector(".msg");


for(select of dropDowns){

    for(curCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
       

        if(select.name === "from" && curCode === "USD"){
            newOption.selected = "USD";
        }
        else if(select.name === "to" && curCode === "INR"){
            newOption.selected = "INR";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlagImg(evt.target);
    });
}

const updateFlagImg = (element)=>{
    let curElement = element.value;
    //console.log(curElement);
    let countryCode = countryList[curElement];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt)=>{

    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //console.log(amtVal);

    if(amtVal === ""|| amtVal < 1){
        amount.value = 1;
        amtVal = 1;
    }

    
   // console.log(fromCur.value,toCur.value);
   
    let URL = `${baseURL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCur.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = amtVal * rate;
    
   
    finalMsg.innerText = `${amtVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;

});