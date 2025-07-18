document.addEventListener('DOMContentLoaded', () => {
    // Variables de estado
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Elementos del DOM
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('.btn-equals');
    const resetButton = document.querySelector('.btn-reset');
    const signButton = document.querySelectorAll('.btn-special')[0];
    const percentageButton = document.querySelectorAll('.btn-special')[1];
    const decimalButton = document.querySelector('[data-decimal]');

    // Inicializar display
    updateDisplay();

    // Event Listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.dataset.number));
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => setOperation(button.dataset.operation));
    });

    equalsButton.addEventListener('click', calculate);
    resetButton.addEventListener('click', handleReset);
    signButton.addEventListener('click', toggleSign);
    percentageButton.addEventListener('click', applyPercentage);
    decimalButton.addEventListener('click', appendDecimal);

    // Manejar teclado
    document.addEventListener('keydown', handleKeyboardInput);

    // Funciones
    function updateDisplay() {
        display.textContent = currentInput.replace('.', ',');
    }

    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

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
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        // Efecto de confeti para resultados grandes
        if (Math.abs(result) > 1000) {
            confetti({ 
                particleCount: 100, 
                spread: 70,
                colors: ['#fd7e14', '#0d6efd']
            });
        }

        currentInput = result.toString().replace('.', ',');
        operation = null;
        resetScreen = true;
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

    function handleReset() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        resetScreen = false;
        updateDisplay();
    }

    function handleKeyboardInput(e) {
        if (/[0-9]/.test(e.key)) {
            appendNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            setOperation(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        } else if (e.key === 'Escape') {
            handleReset();
        } else if (e.key === '.' || e.key === ',') {
            appendDecimal();
        } else if (e.key === '%') {
            applyPercentage();
        }
    }
});