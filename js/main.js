const bill = document.getElementById('bill__amount');
const tipBtns = document.querySelectorAll('.tip')
const tipCustom = document.getElementById('tip__custom');
const people = document.getElementById('people-no');
const results = document.querySelectorAll('.tip-amount-display');
const results1 = document.querySelectorAll('.total-amount-display');
const resetBtn = document.querySelector('.reset');


bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0; //default value
let tipValue = 0.15; //default value  15% button is activate
let peopleValue = 1;


function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue() {
    if (bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
   // console.log(billValue);
}

function handleClick() {
   tipBtns.forEach(btn => {
        // clear active state
        btn.classList.remove('btn-active');

        // set active state
        if(event.target.innerHTML ==btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
   });

   //clear custom tip
   tipCustom.value = '';

   calculateTip();

  // console.log(tipValue);
}

function setTipCustomValue() {
    if(!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value/100);

    //remove active state from button
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }

   // console.log(tipValue);
}

function setPeopleValue() {
    if(!validateInt(people.value)) {
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);


   calculateTip();
  //  console.log(peopleValue);
}

function calculateTip() {
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
      //  let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
       // results[1].innerHTML = '$' + total.toFixed(2);
    }

    if (peopleValue >=1 ){
        let total = billValue * (tipValue + 1) / peopleValue;
        results1[0].innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    bill.value = '0';
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();
}

