/* ----------------------------
-  NOTES on javascript
- from Eloquent Javascript
- by Marijn Haverbeke
- Notes by Juan Marcos Avina
- June 2026
-------------------------------*/

/* ---------------------------------------
- Chapter 2: Values Types and Operators  -
-----------------------------------------*/

/* using backticks instead of quotations
for strings lets you do calculations with
${}.  This spits out the string "half of 100 is 50"*/
`half of 100 is ${100 / 2}`;

/* type of spits out the type of a value */
typeof 4.5;

/* +add-sub and /div*mult and also %module */
314 % 100;

/* Boolean values */
3 > 2; //true
3 < 2; //false
"Ardvark" < "Zoroaster"; //true
/* this is almost alphabetic. but uppercase letters are always greater than lowercase*/
NaN == NaN; //false the only value that is not equal to itself

true && false; //false - && is AND
true || false; //true - || is OR
!true; //false - ! is NOT (flips value infront of it)

/* ternary, a?b:c - if a is true, spits out b, else c */
true ? 1 : 2; //->1
false ? 1 : 2; //->2

/* when using incorrect operations on a value
javascript will quietly convert it to the corect type
sometimes in ways that don't make sense*/
8 * null; //0
"5" - 1; //4
"5" + 1; //51
"five" * 2; //NaN
false == 0; //true
null == undefined; //true
null == 0; //false

/* when you do not want automatic type conversion
use === or !== (an extra equals sign). this denotes
an exact and precise equivalence*/
"" == false; //true
"" === false; //false

/* ||  will default to the value on the left when boolean
or when can be converted to boolean.  Otherwise gives value
on right*/
null || "user"; //->user
"Agnes" || "user"; //->Agnes
0 || -1; //-> -1
/* but ?? is still preferable most of the time */
0 ?? 100; //-> 0
0 || 100; //-> 100
null ?? 100; //-> 100

/* ----------------------------
- Chapter 3 Program Structure -
------------------------------*/

// to set a variable
let ten = 10;
let mood = "light";
let mood = "dark";
let one=1, two=2;

// can also use var and const
var name = "Ayda";
const greeting="hello";

//functions
prompt("Enter Passcode") //function in browser, pulls up prompt window
console.log("the value of ten is", ten); //displays, kinda like print in python
Math.max(2,4); //->4 
Math.min(2,4); //->2
Number(prompt("Pick a number")); //Number() converts user input into number
String(prompt("type a string")); //String() converts into string
Boolean(prompt("put a bool value")) //Boolean() converts into boolean
Number.isNaN(14) //-> false, returns true if number is NaN

// conditional execution
// basic format for if-else statements
let num=Number(prompt("Pick a number"));
if(!Number.isNaN(num)){
  console.log("your number is", num");
} else {
  console.log("this not a number");
}

//if -else statements with several conditions
if (num<10){
  console.log("Small");
} else if (num<100){
  console.log("medium");
} else{
  console.log("large");
}

//while loops
let number=0;
while (number <=12){
  console.log(number);
  number=number+2;
}

// do loops (it's like a while loop, 
// except it always runs atleast once, 
// and checks to keep running after the first run)
let yourName;
do {
  yourName = prompt("who are you?");
} while (!yourName);
console.log("hello"+yourName);

// for loops
for (let num=0; num <= 12; num=num+2){
  console.log(num);
}
// the first part, "let num=0;" initializes the loop
// the second part, "num<=12;" checks for the loop to continue
// the third part, "num=num+2;" updates the state of the loop


//use break; to end a loop early
//this ecample finds the first number that is both greater than 20 and divisible by 7

for (let current=20; ;current=current+1){
  if (current % 7 == 0){
    console.log(current);
    break;
  }
}

//shortcut for updating counter
counter = counter+1;
counter +=1;
counter++;

//instead of a bunch of if-else statements, you can do a switch, case
switch (prompt("what is the weather like?")){
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("dress lightly.");
    break;
  case "etc.."
    console.log("you can have as many cases as you want");
    break;
}

switch (true){
  case /*boolean statement*/:
    /*stuff that happens*/;
    break;  
  case /*boolean statement*/:
    /*stuff that happens*/;
    break;
}

/*----------------------
- Chapter 4: Functions -
-----------------------*/


