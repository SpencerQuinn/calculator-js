const display = document.querySelector('.current-value')
const numberButtons = document.querySelectorAll('.number-button')
const operatorButtons = document.querySelectorAll('.operator-button')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equals')
const decimalButton = document.querySelector('.dec')


let currentOperator = ""
let currVal = '', currValInt = parseFloat(currVal)
let prevVal = '', prevValInt = parseFloat(prevVal)

let log = []


const add = (a,b) => a + b
const sub = (a,b) => a - b
const mult = (a,b) => a * b
const dvd = (a,b) => a / b



const operationsObj = {
    "+": add,
    "-": sub,
    "*": mult,
    "/": dvd,
}


let operratorButtonPushed = false
let equalButtonPushed = false


operatorButtons.forEach(butt => butt.addEventListener('click', operatorPushHandler))


numberButtons.forEach(num => num.addEventListener('click', numberPushHandler))

numberButtons.forEach(num => num.addEventListener('click', clickEffect))

numberButtons.forEach(num => num.addEventListener('transitionend', function(){
    this.classList.remove('pushed')
}))


clearButton.addEventListener('click', clearButtonHandler)

equalButton.addEventListener('click', equalButtonHandler)

equalButton.addEventListener('click', clickEffect)

equalButton.addEventListener('transitionend', function(){
    this.classList.remove('pushed')
})

// ARITHMATIC
function performOperation(a, b, op){
    let result = operationsObj[op](Number(a), Number(b));
    return Math.round(result*100)/100
}

function lengthCheckForDisplay(num){
    if(String(num).length <= 9)return num
    
    let numInt = Number(num);

    // Get rid of decimals
    let roundedNum = String(Math.round(numInt))

    // Log total exponants after decimal
    let zeros = roundedNum.length - 1

   
    return `${roundedNum.slice(0,1)}.${roundedNum.slice(1,5)}e${zeros}`

}

function clearButtonHandler(){
    display.textContent = ''
    currVal = ''
    prevVal = ''
    log = []
    renderLog()
    operatorLight()
    currentOperator = ''
    operratorButtonPushed = false
    equalButtonPushed = false
}

function operatorPushHandler(){
    
    if(equalButtonPushed){
        currentOperator = this.textContent
        operratorButtonPushed = true
        operatorLight()
        log = ["ANS", currentOperator]
        currVal = ''
        renderLog()    
        equalButtonPushed = false
        displayResult(prevVal)
        return
    }
    else if(operratorButtonPushed){
        currentOperator = this.textContent
        log[-1] = currentOperator
        renderLog()
        operatorLight()
        return
    }
    prevVal = prevVal === '' ? currVal : performOperation(prevVal, currVal, currentOperator)
    displayResult(prevVal)
    currentOperator = this.textContent
    log.push(currVal, currentOperator)
    renderLog()
    currVal = ''
    operratorButtonPushed = true
    operatorLight()
   
    
}

function numberPushHandler(event){

    if(equalButtonPushed){
        clearButtonHandler()
    }
    else if(operratorButtonPushed){
        currVal = ''
        display.textContent = currVal
        operratorButtonPushed = false
    }
    else if(display.textContent.length == 9) return
    currVal += event.target.textContent
    display.textContent = currVal
}

function equalButtonHandler(){
    log.push(currVal, "=")
    renderLog()
    equalButtonPushed = true
    operratorButtonPushed = false
    operatorLight()
    prevVal = performOperation(prevVal, currVal, currentOperator)
    displayResult(prevVal)
}

function displayResult(result){
    display.textContent = lengthCheckForDisplay(result)
}

function clickEffect(){
    this.classList.add('pushed')
    
}

function operatorLight(){
    document.querySelectorAll('.operator-lights-container div').forEach(op => op.classList.contains('light-up-operator')? op.classList.remove('light-up-operator'): op)
    if(equalButtonPushed || !operratorButtonPushed) return
    let lightMeUp = document.querySelector(`.operator-lights-container div[data-operator="${currentOperator}"]`)
    lightMeUp.classList.add('light-up-operator')
    
}

function renderLog(){
    if(log === []){
        document.querySelector('.previous-operations').textContent = ''
        return
    }
    let displayRender = ""
    log.forEach(item => displayRender += `${item} `)
    document.querySelector('.previous-operations').textContent = displayRender
}












