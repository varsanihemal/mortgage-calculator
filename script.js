console.log('Hey');

// monthly payment = 

// loan[rate/12] / [1-[1+rate/12]^-12[year]]

// const btn = document.getElementsByClassName('btn')[0];

// Selecting the form using the correct id
const form = document.getElementById('submit-form');
let amount = document.getElementById('amount');
let term = document.getElementById('term');
let rate = document.getElementById('rate');
let radio = document.getElementsByClassName('radio');


let amountError = document.querySelector('.amount-error');
let termError = document.querySelector('.term-error');
let rateError = document.querySelector('.rate-error');
let typeError = document.querySelector('.type-error');

const emptyContainer = document.querySelector('.empty');
const completedContainer = document.querySelector('.completed');

// Function to format numbers with commas
function formatNumber(number) {
    return number.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

amount.addEventListener("blur", () => {
    let value = amount.value;

    if (!isNaN(value) && value.trim() !== '') {
        value = parseFloat(value) * 1000;
        amount.value = value;
    }
})

// Adding an event listener to handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    amountError.textContent = '';
    termError.textContent = '';
    rateError.textContent = '';
    typeError.textContent = '';

    let hasError = false;

    if (amount.value === "") {
        // alert("need to enter in a value");
        let errorText = document.createTextNode("This field is required");
        amountError.appendChild(errorText)
        hasError = true;
    }

    if (term.value === "") {
        let errorText = document.createTextNode("This field is required")
        termError.appendChild(errorText);
        hasError = true;
    }

    if (rate.value === "") {
        let errorText = document.createTextNode("This field is required")
        rateError.appendChild(errorText);
        hasError = true;
    }

    let radioChecked = false;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioChecked = true;
            break;
        }
    }

    if (!radioChecked) {
        let errorText = document.createTextNode("This field is required");
        typeError.appendChild(errorText);
        hasError = true;
    }

    // Calculation
    // loan[rate/12] / [1-[1+rate/12]^-12[year]]
    if (!hasError) {
        let loanAmount = parseFloat(amount.value);
        let annualRate = parseFloat(rate.value) / 100;
        let years = parseFloat(term.value);
        let monthlyRate = annualRate / 12;
        let numberOfPayments = years * 12;
        let monthlyPayment = 0;

        if (radio[0].checked) {
            monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        } else {
            monthlyPayment = loanAmount * monthlyRate;
        }

        // Update the completed results section
        document.querySelector('.monthly-payment').textContent = `£${formatNumber(monthlyPayment)}`;
        document.querySelector('.repay-total').textContent = `£${formatNumber(monthlyPayment * numberOfPayments)}`;

        emptyContainer.classList.add('hidden');
        completedContainer.classList.remove('hidden');
    }


});