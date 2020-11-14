
const buttons = document.querySelectorAll('button')
const display = document.querySelector('#display')
let numberStored = ''
let operatorStored = ''
let newInput = false
let didEquals = false

//Sets events for each button. For numbers display them, for Clear, for Equal and else the operations.
buttons.forEach(button =>{
    button.addEventListener('click', function(){
        let input = this.textContent

        if (/\d/.test(input)) {
            if (didEquals) {
                setDisplay(input)
                didEquals = false
            }
            else {
            addToDisplay(input)
            }
        }
        else if (input == 'Cl') {
            clear()
        }
        else if (input == '=') {
            if (!numberStored || !operatorStored) {
                alert('Select an operator first! Data cleared')
                clear()
            }
            else {
                numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent))
                operatorStored = ''
                setDisplay(numberStored)
                numberStored = ''
                didEquals = true
            }
        }
        else {
            processOperator(input)
        }
    })
})



function addToDisplay(number) {
    let displayNum = display.textContent
    if (newInput) {
        newInput = false
        setDisplay(number)
    }
    else if (displayNum == 0) {
        setDisplay(number)
    }
    else {
        if (displayNum.includes('e')) {
            displayNum = Number(displayNum)
        }
        displayNum = displayNum + number
        setDisplay(displayNum)
    }
}

function setDisplay(displayNum) {
    displayNum = displayNum.toString()
    if (displayNum.length > 9) {
        displayNum = parseFloat(displayNum)
        displayNum = displayNum.toExponential(9)
    }
    display.textContent = displayNum
}

function clear() {
    display.textContent = 0
    numberStored = ''
    operatorStored = ''
}

function processOperator(operator) {
    if (!numberStored) {
        numberStored = display.textContent
    }
    else {
        numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent))
    }
    operatorStored = operator
    newInput = true
    didEquals = false
}



function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function sum(array) {
	return array.reduce((total, current) => total + current, 0);
}

function multiply (a,b) {
	return a*b;
}

function divide (a, b) {
	if (b == 0) {
		return "Error!"
	} else {
		return a/b;	
	}

}

function power(a,b) {
	return a**b;
}

function factorial(n) {
	if (n==0) return 1;
	
	let product = 1;

	for (let i = n; i>0; i--){
		product *= i;
	}
	return product;
	}

function operate(a, operator, b) {
	if (operator == '+') {
		return add(a, b)
	}
	else if (operator == '-') {
		return subtract(a, b)
	}
	else if (operator == '*') {
		return multiply(a, b)
	}
	else if (operator == '/') {
		return divide(a, b)
	}
	else if (operator == 'x^y') {
		return power(a, b)
	}
	else if (operator == 'x!') {
		return factorial(a)
	}
}
