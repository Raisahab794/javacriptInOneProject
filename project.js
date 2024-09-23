const prompt=require('prompt-sync')();


const ROWS=3;
const COLS=4;
 const SYMBOLS_COUNT={
    'A':2,
    'B':4,
    'C':6,
    'D':8,
 }
const SYMBOLS_VALUES={
    'A':5,
    'B':4,
    'C':3,
    'D':2,
}




const deposit=()=>{
    while(true){
        const depositamount=prompt('Enter the amount to deposit: ');
        const amount=parseFloat(depositamount);
        if(isNaN(amount)||amount<=0){
            console.log('Invalid deposit amount, Try again!');
        }else{ 
           return amount;
        }
    }
};
const numberoflines=()=>{
    while(true){
        const line=prompt('Entet the number of lines to bet on(1-3): ');
        const numberofline=parseFloat(line);
        if(isNaN(numberofline)||numberofline<=0||numberofline>3){
            console.log('Invalid number of lines, Try again!');
        }else{
            return numberofline;
        }
    }
};
const getbet=(balance,lines)=>{
    while(true){
        const bet=prompt('Enter the bet per line amount: ');
        const amount=parseFloat(bet);
        if(isNaN(amount)||amount<=0 || amount>balance/lines){
            console.log('Invalid bet amount, Try again!');
        }else{
            return amount;
        }
    }
}

let balance=deposit();
const lines=numberoflines();
const bet=getbet(balance,lines);

