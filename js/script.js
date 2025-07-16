// Variables globales
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

// Elementos del DOM
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('.btn-equals');
const resetButton = document.querySelector('.btn-reset');

// Event Listeners básicos
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent));
});

equalsButton.addEventListener('click', calculate);
resetButton.addEventListener('click', reset);

// Funciones básicas
function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput.replace('.', ',');
}