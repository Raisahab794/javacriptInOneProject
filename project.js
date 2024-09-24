const prompt=require('prompt-sync')();


const ROWS=3;
const COLS=3;
 const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8,
 }
const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2,
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

const spin=()=>{
    const symbols=[];
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
       for(let i=0;i<count;i++){
           symbols.push(symbol);
       }
    }
 
    const reels = []; // Initialize the reels array with empty sub-arrays
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelsymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomindex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomindex, 1);
        }
    }
    return reels;
};

const transpose=(reels)=>{
    const transposedreels=[];
    for(let i=0;i<ROWS;i++){
        transposedreels.push([]);
        for(let j=0;j<COLS;j++){
            transposedreels[i].push(reels[j][i]);
        }
    }
    return transposedreels;
};

   const printrows=(transposedreels)=>{
           for(const row of transposedreels){
               let rowstring='';
               for(const [i,symbol] of row.entries()){
                   rowstring+=symbol;
                   if(i<row.length-1){
                       rowstring+=' | ';
                   }
               }
                console.log(rowstring);
           }
   }

   const getwinnings=(transposedreels,bet,lines)=>{
    let winnings=0;
    for (let row=0;row<lines;row++){
        const symbol=transposedreels[row];
        let allsame=true;
        for(const s of symbol){
            if(s!==symbol[0]){
                allsame=false;
                break;
            }
        }
        if(allsame){
            winnings+=bet*SYMBOLS_VALUES[symbol[0]];
        }
    }
    return winnings;
   };


const game=()=>{
    let balance=deposit();
    while(true) { 
        console.log('you have ballance of $'+balance);
    const lines=numberoflines();
    const bet=getbet(balance,lines);
    balance-=bet*lines;
    const reels=spin();
    const transposedreels=transpose(reels);
    printrows(transposedreels);
    const winnings=getwinnings(transposedreels,bet,lines);
    balance+=winnings;
    console.log(`You won $${winnings.toFixed(2).toString()}!`);

    if(balance<=0){
        console.log('You have no balance to play');
        break;
    }
        const playagain=prompt('Do you want to play again (y/n)?: ');
        if(playagain!='y'){
            break;
        }
    }
}
game();