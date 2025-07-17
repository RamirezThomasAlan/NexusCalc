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

const specialButtons = document.querySelectorAll('.btn-special');

specialButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '+/-') toggleSign();
        if (button.textContent === '%') applyPercentage();
    });
});

function setOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op === '×' ? '*' : op === '÷' ? '/' : op;
    resetScreen = true;
}

function calculate() {
    if (operation === null || resetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput.replace(',', '.'));
    const current = parseFloat(currentInput.replace(',', '.'));

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentInput = result.toString().replace('.', ',');
    operation = null;
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput.replace(',', '.')) * -1).toString().replace('.', ',');
    updateDisplay();
}

function applyPercentage() {
    currentInput = (parseFloat(currentInput.replace(',', '.')) / 100).toString().replace('.', ',');
    updateDisplay();
}

function reset() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}