let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn"); 
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true; //player O
let clickCount = 0;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=>{
    turn0 = true;
    clickCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(!box.innerText){
            if(turn0){
                box.innerText = "O";
                turn0 = false;
            }
            else{
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;
            clickCount++;
            checkWinner();
            checkDraw();
        }
    });
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner)=>{
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = ()=>{
    for(let pattern of winPatterns){
          let pos1val = boxes[pattern[0]].innerText;
          let pos2val = boxes[pattern[1]].innerText; 
          let pos3val = boxes[pattern[2]].innerText;
        
          if(pos1val && pos2val && pos3val){
            if(pos1val===pos2val && pos2val===pos3val){
                console.log("Winner!",pos1val);
                disableBoxes();
                showWinner(pos1val);
                return true;
            }
          }
        
        }
        return false;
};

const checkDraw = () => {
    if (!checkWinner()) {
        if(clickCount==9){
            msg.innerText = "Oops, Game draw!";
            msgContainer.classList.remove("hide");
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

 