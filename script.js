let buffer = "0";
let previousOperator = ""; 
let runningTotal = 0;
let operatorActive = false;
let checkOperatorEql = false;



const calcButtons = document.querySelectorAll(".calc-btn");
const screen = document.querySelector(".screen");
const mainScreen = document.querySelector(".main-screen");
const clearOne = document.querySelector(".clear-one");

const arrayBtns = Array.from(calcButtons);
const divideBtn = arrayBtns.find(btn => btn.textContent === "÷");
const addBtn = arrayBtns.find(btn => btn.textContent === "+");
const minusBtn = arrayBtns.find(btn => btn.textContent === "−");
const timesBtn = arrayBtns.find(btn => btn.textContent === "×");
const equalsBtn = arrayBtns.find(btn => btn.textContent === "=");


function numberClickEffect(number){
    const arrayBtns = Array.from(calcButtons);
    const currentBtn = arrayBtns.find(btn => btn.textContent === `${number}`);
    currentBtn.classList.add("num-click")
    setTimeout(()=> {currentBtn.classList.remove("num-click"),10})
}

function symbolClickEffect(symbol){
    const arrayBtns = Array.from(calcButtons);
    const currentBtn = arrayBtns.find(btn => btn.textContent === `${symbol}`);
    currentBtn.classList.add("symbol-click")
    setTimeout(()=> {currentBtn.classList.remove("symbol-click"),10})
}

function operatorClickEffect(operator){
    if(operator === "/"){
        divideBtn.classList.add("operator-click");
        addBtn.classList.remove("operator-click");
        minusBtn.classList.remove("operator-click");
        timesBtn.classList.remove("operator-click");
    }else if(operator === "+"){
        addBtn.classList.add("operator-click");
        timesBtn.classList.remove("operator-click");
        divideBtn.classList.remove("operator-click");
        minusBtn.classList.remove("operator-click");
    }else if(operator === "-"){
        minusBtn.classList.add("operator-click");
        addBtn.classList.remove("operator-click");
        timesBtn.classList.remove("operator-click");
        divideBtn.classList.remove("operator-click");
    }else if(operator === "="){
        minusBtn.classList.remove("operator-click");
        addBtn.classList.remove("operator-click");
        timesBtn.classList.remove("operator-click");
        divideBtn.classList.remove("operator-click");
        equalsBtn.classList.add("operator-click");
        setTimeout(()=> {
            equalsBtn.classList.remove("operator-click");
        },300)
    }else{
        timesBtn.classList.add("operator-click");
        minusBtn.classList.remove("operator-click");
        addBtn.classList.remove("operator-click");
        divideBtn.classList.remove("operator-click");
    }
}

function clearOperatorEffect(){
    divideBtn.classList.remove("operator-click");
    addBtn.classList.remove("operator-click");
    minusBtn.classList.remove("operator-click");
    timesBtn.classList.remove("operator-click");
}

function containsDot(){
    const arrayBuffer = Array.from(buffer);
    const checkBuffer = arrayBuffer.some(num => num === ".");
    return (checkBuffer)? false: true;
}

function toggleNegative(){
    const stringBuffer = buffer.toString();
    const firstChr = stringBuffer.charAt(0);
    const rest = stringBuffer.slice(1)
    if(firstChr != "-"){
        const negaBuffer = `-${buffer}`;
        buffer = negaBuffer;
    } else{
        buffer = rest;
    }
}

function clearAll(){
    symbolClickEffect("AC");
    buffer = "0";
    previousOperator = "";
    runningTotal = 0;
    operatorActive = false;

    minusBtn.classList.remove("operator-click");
    addBtn.classList.remove("operator-click");
    timesBtn.classList.remove("operator-click");
    divideBtn.classList.remove("operator-click");
}

function runEqualSign(){
    operatorClickEffect("=");
    const floatBuffer = parseFloat(buffer);
    if(buffer == "0")return;
    if(previousOperator == "")return;
    handleMath(floatBuffer);
    buffer = runningTotal;
    operatorActive = true;
    previousOperator = "";
    checkOperatorEql = true;

    minusBtn.classList.remove("operator-click");
    addBtn.classList.remove("operator-click");
    timesBtn.classList.remove("operator-click");
    divideBtn.classList.remove("operator-click");
}

function deleteLastChr(){
    const stringBuffer = buffer.toString();
    const removeLast = stringBuffer.slice(0, stringBuffer.length - 1);
    if(checkOperatorEql){
        buffer = "0";
        mainScreen.innerText = buffer;
        checkOperatorEql = false;
        return
    }
    if(buffer == "0")return;
    if(buffer.length === 1) {
        buffer = "0";
        mainScreen.innerText = buffer;
        return;
    }
    buffer = removeLast;
    mainScreen.innerText = buffer;
}

clearOne.addEventListener("click", ()=> deleteLastChr())


function handleOperator(operator){
    switch (operator){
        case "÷":
        case "/":
            doMath("/");
            break;
        
        case "×":
        case "*":
            doMath("*");
            break;
        
        case "−":
        case "-":
            doMath("-");
            break;

        case "+":
            doMath("+");
            break;

        case "=":
        case "Enter":
            runEqualSign();
            break;

        case "C":
        case "c":
        case "AC":
            clearAll();
            break;

        case "+/-":
        case "n":
        case "N":
            symbolClickEffect("+/-");
            toggleNegative()
            break;

        case "%":
            symbolClickEffect("%");
            const numArray = parseFloat(buffer);
            const percentage = numArray / 100;
            if(buffer == "0") return;
            buffer = percentage;
            break;

        default:
            return
    }
}

function doMath(operator){
    operatorActive = true;
    const floatBuffer = parseFloat(buffer);
    if(buffer == "0" || buffer == "-0")return;
    operatorClickEffect(operator);
    if(previousOperator === ""){
        previousOperator = operator;
        runningTotal = floatBuffer;
        return
    }

    handleMath(floatBuffer);
    previousOperator = operator;
}

function handleMath(floatBuffer){
    if(previousOperator === "+"){
        runningTotal += floatBuffer;
    }else if(previousOperator === "/"){
        runningTotal /= floatBuffer;
    }else if(previousOperator === "-"){
        runningTotal -= floatBuffer;
    }else{
        runningTotal *= floatBuffer
    }

}

function handleNumber(number){
    numberClickEffect(number);
    if(buffer.length >= 6)return;
    if(operatorActive) buffer = "";
    clearOperatorEffect();
    if(number === ".") {
        if(buffer === "0") buffer += number;
        if(!containsDot()) return;
    }
    if(buffer === "0") buffer = "";
    if(buffer === "-0") buffer = "-"
    buffer += number;
    operatorActive = false;
}

calcButtons.forEach(calcButton => calcButton.addEventListener("click", e => {
    const buttonText = e.target.textContent;
    buttonClick(buttonText)
}));
window.addEventListener("keypress", e => {
    const keyContent = e.key;
    // spaceBar is throwing an error. This "if" statement fixed it.
    if(e.code === "Space")return;
    buttonClick(keyContent);
})

function buttonClick(button){
    const buttonContent = button;
    if(!isNaN(buttonContent) || buttonContent === "."){
        handleNumber(buttonContent);
    } else{
        handleOperator(buttonContent);
    }
    mainScreen.innerText = buffer;
}



window.addEventListener("keydown",e => {
    if(e.key === "Backspace"){
        deleteLastChr();
    }
    // console.log(e)
})