let buffer = "0";
let subBuffer = "5+3"
let currentOperator;

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
            console.log("÷")
            break;
        
        case "×":
        case "*":
            console.log("×")
            break;
        
        case "−":
        case "-":
            console.log(operator)
            break;

        case "+":
            console.log(operator)
            break;

        case "=":
            console.log(operator)
            break;

        case "C":
        case "c":
        case "AC":
            symbolClickEffect("AC")
            buffer = "0"
            break;

        case "+/-":
        case "n":
        case "N":
            symbolClickEffect("+/-")
            break;

        case "%":
            symbolClickEffect("%")
            break;

        default:
            return
    }
}

function handleNumber(number){
    numberClickEffect(number);
    if(number === ".") {
        if(buffer === "0") buffer += number;
        if(!containsDot()) return;
    }
    if(buffer === "0") buffer = "";
    buffer += number;
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


