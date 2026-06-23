# Learning JavaScript

The following notes are taken from reading through Marijn Haverbeke's wonderful book [Eloquent JavaScript](https://eloquentjavascript.net/index.html).

The link provided leads to the official website for the book, in which you can read it for free and get access to all the example code.  It even has a neat feature where you can try out the code on that website itself.  Highly recommend it!

We will be skipping chapter 1, as that chapter is devoted to the background of JavaScript, and the structure of the book itself.

---

## Chapter 2: Values, Types, and Operators

**Strings** can be denoted with single quotes, double quotes, or even backticks. For the most part there is no difference between them, so long as you are consistent with the use of them.  There is one little difference that comes along with using backticks though.

```
console.log(`half of 100 is ${100/2}`)
//-> half of 100 is 50
```

As you can see, using backticks allows you to use code inside of the string using the syntax of `${}`.

`typeof` spits out the type of a value.
```
typeof 4.5
//-> 'number'
```

For numbers, you can use the following operations:
```
4+4 //addition
4-4 //subtraction
4*4 //multiplication
4/4 //division
4**2 //exponentiation
4%3 //modulus (spits out the remainder)
```

Boolean Values are spit out from a plethora of different situations.  Here are some examples
```
3>2; //-> true
3<2; //-> false
"Ardvark" < "Zoroaster"; //-> true
```
One quick note about the getting a boolean value from strings, the value of a string is dependendent on it's alphabetical position.  A's will be above B's above C's etc...  But uppercase letters will always be above lowercase letters, and lowercase letters will always be above non-characters.
```
"A">"Z">"a">"z">"?"
```

NaN is the only value that is not equal to itself.
```
NaN == NaN //-> false
```

Operations on boolean values are as follows:
```
true && false; //->false, AND
true || false; //->true, OR
!true; //->false, NOT
```

Ternary operations are super handy.  There are three parts to the operation:
```
argument ? output1 : output2;
```

if the argument is `true`, then the output will be `output1`. if the argument is `false`, then the output will be `output2`.
```
true ? 1 : 2; //->1
false ? 1 : 2; //->2
```

**Weirdsies**
Why do people hate JavaScript?  Well, here are some probably reasons.  If you do operations on values that of the wrong type, the language will not spit out an error, it will instead try to convert the value into the correct type.  This sounds helpful until you realize that conversion is not done in any sort of intuitive way.
Here are some examples of weird choices that JavaScript makes for you without telling you.
```
8*null; //-> 0
"5"-1; //-> 4
"5"+1; //-> 51
"five"*2; //-> NaN
false == 0; //-> true
null == undefined; //-> true
null == 0; //-> false
```

If you do not want automatic type conversion, add an extra `=` to the symbol we use to check for sameness. The extra equal's sign makes the check true only if both values are exactly the same.  It is good practice to use these.

`===` instead of `==`

`!==` instead of `!=` 

---

## Chapter 3: Program Structure

To set a variable, use `let` and end every line of code with `;`. 
```
let ten = 10;
let mood = 'light';
let mood = 'dark';
let one=1, let two=2;
```

You can also use `var` and `const`.  Using `var` is not ideal since apparently it's got some more weirdsies.  But it is good practice to use `const` for variables that you know will not change.

**Functions**
We will go over functions in more detail later, but here are some very useful functions implemented into JavaScript by default.
```
prompt("enter Passcode"); //function in browser only, pulls up prompt window
console.log(); // displays, kinda like the print function
Math.max(2,4); //->4
Math.max(2,4); //->2
Number(); //converts value into number
String(); //converts value into string
Boolean(); //converts value into boolean
Number.isNaN(); //returns true if number is NaN
```

**Conditional Executions**

**if**
```
let num=Number(prompt("Pick a Number"));
if (num<10){
  console.log("your number is less than ten");
}
```

**if else**
```
let num=Number(prompt("Pick a Number"));
if (num<10){
  console.log("Your number is less than 10");
}else {
  console.log("Your number is 10 or more");
}
```

**if else with more conditions**
```
let num=Number(prompt("Pick a Number"));
if (num<10){
  console.log("small");
}else if (num<100) {
  console.log("medium");
} else {
  console.log("large");
}
```

**while**
```
let number=0;
while (number <=12){
  console.log(number);
  number=number+2;
}
```

**do**
do loops are much like a while loop, except it runs the loop once first, THEN it checks if it should run the loop again.
```
let yourName;
do{
  yourName = prompt("who are you?");
} while (!yourName);
console.log("Hello"+yourName);
```

**for**
the for loop consists of 3 arguments in the function.
- 1 - `let num=0;` - this initializes the loop
- 2 - `num <= 12;` - checks for the loop to continue
- 3 - `num++` - updates the loop
```
for (let num=0; num <= 12; num++){
  console.log(num);
}
```

**switch**
```
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
```
and
```
switch (true){
  case /*boolean statement*/:
    /*stuff that happens*/;
    break;  
  case /*boolean statement*/:
    /*stuff that happens*/;
    break;
}
```

**break**
Use `break;` to end the loop early.
the following example finds the first number bigger than 20 that is divisible by 7.
```
for (let current=20; ;current++){
  if (curent % 7 == 0){
    console.log(current);
    break;
  }
}
```

**counter**
You can update a counter in a loop in a couple different ways:
```
// let x be the amount you want to increase the counter by
counter = counter + x;
counter += x;
counter++; //this only works if x = 1
```

---

## Chapter 4: functions

Examples of defining a function:

```
const square1 = function(x){ //function notation
  return x*x;
};

function square2(x){ //simplified function notation : this is read by JS before anything else.  it ignores top-to-bottom code reading, goes to top automatically.
  return x*x;
}

const square3 = (x) =>{ //arrow notation
  return x*x;
};

const square4 = x => x*x; //simplified arrow notation: this one only works with functions with 1 input and 1 output.
```

**Some notes about functions.**

Keeping track of the scope of the variables is a key element of understanding functions.  A variable declared inside of a function will only exist locally within that function.  This means that if it is called outside of the function, that will not work.  Also, this means that calling a function several times will call the variable several times, each time it will have no memory and be completely independent from other instances of it being called.

Putting an `=` in the parameter of the function will make it so that if the user leaves that parameter empty, the function will default to the parameter you have chosen.  This can be used to create optional parameters.

```
// in this example, if the user leaves "step" blank, the function will default to 1.
function roundTo(n,step=1){
  let remainder = n%step;
  return n-remainder+(remainder<step.2 ? 0:step);
}
```

Closure is a confusing topic that I'm sure I will need to go back to, but for now, all that really means is that it allows you to nest functions.
```
function multiplier(factor){ return number => number*factor;}
let twice = multiplier(2);
console.log(twice(5));//->10
```

Recursion is OK, so long as you don't overflow the stack
```
function power(base, exponent){
  if (exponent == 0){
    return 1;
  } else {
    return base*power(base,exponent-1);
  }
}
```

---

## Chapter 5: Data Structures, Objects and Arrays

An array stores a sequence of values. You denote an array using square brackets and commas.  You can call on a specific value in the array with square brackets as well.
```
let listOfNumbers = [2,3,5,7,11];
console.log(listOfNumbers[2]; //-> 5)
```

Arrays can have properties (in fact all JavaScript values have properties).  Some examples are things like `.length` as it is found in string.length.
```
console.log(listOfNumbers.length); //-> 5
```

Properties can be accessed in one of two syntaxes, both slightly different:
```
value.x
/* and */
value[x]
```
when using the dot, x is the literal name of the property.  When using square brackets, x is the evaluation of the property.  So `value.x` is fetching a property named "x" and `value[x]` is fetching the value of the variable named "x" and spitting that out as the property name.

Some properties like `toUpperCase` actually contain functions.  `value.toUpperCase` returns the string capitalized. Properties that contain functions are called *methods* .

```
//some examples of methods
let word = "TesT";
let sequence = [1,2,3];
console.log(word.toUpperCase); //->TEST
console.log(word.toLowerCase); //->test
sequence.push(4);
sequence.push(5);
console.log(sequence); //-> [1,2,3,4,5]
console.log(sequence.pop()); //->5
console.log(sequence); //-> [1,2,3,4]
// push adds an element to the array, pop removes an element
```

**Objects**
Values of the type *object* are an arbitrary collection of properties. Here is an example of how to create an object:
```
let day1 = {
  squirrel : false,
  events: ["work","touched tree","pizza"]
};
```
Inside the curly brackets you write a list of properties separated by commas.  After each property you use a colon to write out it's values.

```
//operators for objects
let anObject = {left: 1, right: 2};
delete anObject.left; //delete removes the property from the object. this is different from setting the property to undefined, in that it completely removes it.

console.log("left" in anObject); //-> false
console.log("right" in anObject); //-> true

//Object.keys tells you what properties an object has
console.log(Object.keys(anObject)); //-> ['left', 'right']

//Object.assign copies properties from one object to another
let anObject2 = {up:3, down:4};
Object.assign(anObject, anObject2);
console.log(anObject); //-> { left: 1, right: 2, up: 3, down: 4 }
```

A way to create a function that adds to an object:
```
let journal = [];

function addEntry(events,squirrel){
  journal.push({events,squirrel});
}

addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);
```

**Further Arrayology**
`push` and `pop` work for adding and removing elements at the *end* of an array.  `unshift` and `shift` add and remove elements at the *beginning* of an array.  

To search for a specific value in an array from the beginning towards the end, use `indexOf`.  To search from the end towards the beginning us `lastIndexOf`.

```
let arr=[1,2,3,2,1];
console.log(arr.indexOf(2)); //-> 1
console.log(arr.lastIndexOf(2)); //-> 3
```

`slice` takes the start and end parameters and returns the elements between them.  If one of the parameters is not given, it will take the upper or lower bound as the start or end of the array.

```
let arr=[0,1,2,3,4];
arr.slice(2,4); //-> [2,3]
arr.slice(2); //-> [2,3,4]
arr.slice(,2); //-> [0,1,2]
```
`concat` is used to concatenate two arrays.  Much like the `+` operators with strings.


**string properties**

```
string.slice(x,y); //slice of string 
string.indexOf("x"); //returns the index of the character
string.trim(); // returns string without white spaces
string.padStart(x,"y"); // pads the string with x number of "y"s at the beggining of the string
string.split("x"); //splits string at the point where "x" is found. removes "x".
string.join("x"); //joins strings with "x" in the middle, in this example, string is an array of strings, and join makes it into a single string.
string.repeat(x); //repeats string x amount of times
string.length; // returns length of string
string[x]; //returns element in x index of string
```


**The Math Object**

```
Math.cos() //cosine
Math.sin() //sine
Math.tan() //tangent
Math.acos() //inverse cosine
Math.asin() //inverse sine
Math.atan() //inverse tangent
Math.PI //the value Pi
Math.random() //random number between 0 (inclusive) and 1 (exclusive)
Math.floor() //round down to nearest whole number
Math.ceil() //round up to nearest whole number
Math.abs() //absolute value
Math.sqrt() //square root
```

---


