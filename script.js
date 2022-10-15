let buffer = "0";
let subBuffer = "5+3"
let previousOperator = ""; 
let runningTotal = 0;
let operatorActive = false;

const clearBtn = document.querySelector(".clear");

let clearStatus = "AC";


const calcButtons = document.querySelectorAll(".calc-btn");
const screen = document.querySelector(".screen");
const mainScreen = document.querySelector(".main-screen");
const upperScreen = document.querySelector(".upper-screen");

upperScreen.innerText = subBuffer;

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

function containsDot(){
    const arrayBuffer = Array.from(buffer);
    const checkBuffer = arrayBuffer.some(num => num === ".");
    return (checkBuffer)? false: true;
}


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
            const floatBuffer = parseFloat(buffer);
            if(buffer == "0")return;
            if(previousOperator == "")return;
            handleMath(floatBuffer);
            buffer = runningTotal;
            operatorActive = true;
            previousOperator = "";
            break;

        case "C":
        case "c":
        case "AC":
            symbolClickEffect("AC");
            buffer = "0";
            previousOperator = "";
            runningTotal = 0;
            operatorActive = false;
            break;

        case "+/-":
        case "n":
        case "N":
            symbolClickEffect("+/-");
            const negaBuffer = `-${buffer}`;
            buffer = negaBuffer;
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
    if(operatorActive) buffer = "";
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
    buttonClick(keyContent);
})

function buttonClick(button){
    const buttonContent = button;
    if(!isNaN(buttonContent) || buttonContent === "."){
        handleNumber(buttonContent);
        // clearStatus = "C"
    } else{
        handleOperator(buttonContent);
    }
    mainScreen.innerText = buffer;
    // clearBtn.textContent = clearStatus;
}



// window.addEventListener("keypress",e => console.log(e))