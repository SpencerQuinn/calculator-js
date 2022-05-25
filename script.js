const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.number-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equals')


let brain = {
    logicHistory: [],
    prevVal: '',
    currentVal: '',
    operand: '',

}

let operratorButtonPushed = false

const opperations = {
    "+": add,
    "-": sub,
    "*": mult,
    "/": dvd,
}




operatorButtons.forEach(op => op.addEventListener('click', function(e){
    if(brain.operand == ''){
    logOperations(e)
    brain.prevVal = brain.currentVal
    display.textContent = brain.prevVal
    operratorButtonPushed = !operratorButtonPushed
    return
    }
    
    brain.prevVal = performOperation(Number(brain.prevVal), Number(brain.currentVal), brain.operand);
    display.textContent = brain.prevVal
    logOperations(e)
    console.log(brain)
    operratorButtonPushed = !operratorButtonPushed
}))

equalButton.addEventListener('click', equalButtonPress)




// Numbers displayed listener
numberButtons.forEach(num => num.addEventListener('click', function(){
    if(operratorButtonPushed){
        display.textContent = ''
        operratorButtonPushed = !operratorButtonPushed
    }
    display.textContent += this.dataset.number
    brain.currentVal = display.textContent
    console.log(brain.currentVal)
}))


// Clear Display
clearButton.addEventListener('click', function(){
    clearLogic()
    clearDisplay()
})

function clearDisplay(){
    display.textContent = '';
    brain.currentVal = ''
}

function clearLogic(){
    brain.logicHistory = []
    brain.prevVal = ''
    brain.currentVal = ''
    console.log("ClearButton pushed", brain)
}

// Operations

function logOperations(e){
    let currentOperand = e.target.textContent
    brain.operand = currentOperand
    console.log(brain)

}

function performOperation(a, b, op){
    return opperations[op](Number(a),Number(b))
}

function equalButtonPress(){
    if(brain.prevVal == '') return
    let result = performOperation(Number(brain.prevVal), Number(brain.currentVal), brain.operand)
    brain.prevVal = result
    brain.currentVal = ''
    display.textContent = brain.prevVal
    console.log(brain)

}


// Arithmatic functions

function add(a, b){
    return a + b
}

function sub(a, b){
    return a - b;
}

function mult(a, b){
    return a * b
}

function dvd(a, b){
    return a / b;
}

