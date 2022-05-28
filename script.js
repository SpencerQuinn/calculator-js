const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.number-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equals')
const decimalButton = document.querySelector('.dec')
const equalPushed = false




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
    if(brain.operand == '' && !equalPushed){
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
    if(display.textContent.length >= 9) return
    display.textContent += this.dataset.number
    brain.currentVal = display.textContent
    console.log(brain.currentVal)
}))

decimalButton.addEventListener('click', function(e){
    if(operratorButtonPushed){
        display.textContent = ''
        operratorButtonPushed = !operratorButtonPushed
    }
    if(display.textContent.length >= 9) return
    display.textContent += "."
    brain.currentVal = display.textContent
    console.log(brain.currentVal)
})


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
    brain.operand = ''
    console.log("ClearButton pushed", brain)
}

// Operations

function logOperations(e){
    let currentOperand = e.target.textContent
    brain.operand = currentOperand
    console.log(brain)

}

function performOperation(a, b, op){
    return Math.round((opperations[op](Number(a),Number(b)))*100)/100
}

function equalButtonPress(){
    if(brain.prevVal == '') return
    let result = performOperation(Number(brain.prevVal), Number(brain.currentVal), brain.operand)
    console.log("Hello", answerLengthAdjust(result))
    brain.prevVal = result
    brain.currentVal = ''
    brain.operand = ''
    display.textContent = answerLengthAdjust(Number(brain.prevVal))
    console.log(brain)
    equalPushed = true

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

function answerLengthAdjust(num){
    let zeros = 0;
    if(String(num).length > 9){
        let newNum = num
       while(newNum % 10 == 0){
           newNum /= 10
           zeros+=1
           console.log(newNum, num)
       }
       if(String(newNum).length > 6){
           let roundingamount = String(newNum).length - 6
           zeros += roundingamount
           newNum = Math.round(newNum / 10**roundingamount)
       }
       console.log("zeros", zeros, "newNum", newNum)
       zeros += String(newNum).length - 1
       newNum = newNum / (10**(String(newNum).length - 1))
       console.log("finalzeros", zeros, "finalnewNum", newNum)
       return `${newNum}e${zeros}`
    }
    return num
}

//Visual Funcitons







