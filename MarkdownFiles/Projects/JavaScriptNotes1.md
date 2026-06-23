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
