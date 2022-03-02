var calculation = '';
var hasOperator = 0;
var first = '';
var second = '';
var canRemove = true;

function strcat(str) {

    if (isOperator(str)) {
        hasOperator++;
        if (hasOperator > 1) {
            calculate();
            canRemove = true;
            calculation = document.getElementById('result').value + str;
            document.getElementById('calculation').value = calculation;
            hasOperator = 1;
        }else{
            setCalculation(str);
        }
    }else{
        if (canRemove == false) {
            canRemove = true;
            hasOperator = 0;
            calculation = '';
        }
        setCalculation(str);
    }
}

function setCalculation(str) {
    if (str == 10) {
        calculation = calculation.concat(Math.PI);
    }
    calculation = calculation.concat(str);
    document.getElementById('calculation').value = calculation;
}

function isOperator(str){
    if (str == '+' || str == '-' || str == '*' || str == '/' || str == '%') {
        return true;
    }
    return false;
}

function remove() {
    if (canRemove == true) {
        if (isOperator(calculation.charAt(calculation.length - 1))) {
            hasOperator --;
        }
        calculation = calculation.slice(0, -1);
        document.getElementById('calculation').value = calculation;   
    }
}

function clearAll() {
    calculation = '';
    hasOperator = 0;
    canRemove = true;
    document.getElementById('calculation').value = calculation;
    document.getElementById('result').value = '';
}

function calculate() {
    var operator = '';

    for (let index = 0; index < calculation.length; index++) {
        if (isOperator(calculation.charAt(index))) {
            first = calculation.substring(0, index);
            second = calculation.substring(index + 1);
            operator = calculation.charAt(index);
            break;
        }
    }

    if (isRealNumber(first) || isRealNumber(second)) {
        var firstNumber = parseFloat(first);
        var secondNumber = parseFloat(second);
        getResult(firstNumber, operator, secondNumber);
    }else{
        var firstNumber = parseInt(first);
        var secondNumber = parseInt(second);
        getResult(firstNumber, operator, secondNumber);
    }

    canRemove = false;
}

function isRealNumber(str) {
    for (let index = 0; index < str.length; index++) {
        if (str[index] == '.') {
            return true;
        }
    }
    return false;
}

function getResult(firstNumber, operator, secondNumber) {
    var result;
    if (operator == '+') {
        result = firstNumber + secondNumber;
    }else if (operator == '-') {
        result = firstNumber - secondNumber;
    }else if (operator == '*') {
        result = firstNumber * secondNumber;
    }else if (operator == '/') {
        result = firstNumber / secondNumber;
    }else if (operator == '%') {
        result = firstNumber % secondNumber;
    }
    if (!isNaN(result)) {
        document.getElementById('result').value = result;
    }
}