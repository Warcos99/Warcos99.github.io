# ArduDeck

ArduDeck is an *Arduino cyber-deck* or something like it.  It is a printable PCB and code base that allows for a quick integration of an Arduino, screen, buttons, and menu.  This in theory should allow anyone using this infrastructure to make whatever apps they wish for their Arduino based cyber-deck.

You can find the GitHub page here with the code and a very simple readme file: [GitHub](https://github.com/Warcos99/ArduDeck)

This particular page is devoted to a detailed exploration of how to make this damn thing, and some interesting realizations regarding the code.  Below is a list of all the points we will be discussing.


**1.  How Arduino Code Works**

**2.  Wiring Diagram, PCB, and Housing**

**3.  How to Program a Menu**

**4.  How to make a persistent Button System**

**5.  Powering the device**

**6.  Applet Files, basics**

**7.  PROGMEM for storing lots of text**

**8.  using the pinout** 



---

## 1.  How Arduino Code Works

When working with a simple Arduino project, you can mostly get away with having a single sketch file.  If your project is called "Blink" you might end up with a single *blink.ino* file.  In this *-.ino* file all the code needed to have the micro-controller act the way you need it too will be present.  However, if you are undertaking a larger project, one that might end up sizing up to thousands of lines of codes, it might behoove you to organize your code in several sketch files.

Arduino has a dead simple way of doing this.  All files in the sketch folder are read in alphabetical order, the only exception being the file that is titled the same name as the folder name.  Once all these files are read, they are concatenated by Arduino into a singular giant `.ino` program.  For example, let's say you have the following file structure:
```
[blink]
  alpha.ino
  alpha2.ino
  blink.ino
  charlie.ino
  delta.ino
```
In this scenario, Arduino will compile this as a giant `.ino` program that will have the contents of `blink.ino` at the top, and the contents of the rest of the files below it in alphabetical order.

Let's say you have a program that is a menu where you can select on a varying number of applets.  You might think to organize your files something like this:
```
[applets]
  applets.ino
  menu.ino
  app1.ino
  app2.ino
```

The `applets.ino` file would contain all the basic code, like importing libraries and running the void setup() and void loop() function.  The `menu.ino` file would contain all the logic that dictates how the menu works.  Then `app1.ino` and the other app files would each contain the logic only for that specific app.  Organizing the files like this would make it really easy to know where to find any particular part of the code.  There is a small issue with this though.

Because the files are read in alphabetical order, all the functions and variables are created and read in that same order.  In the file structure above, if `app1.ino` is using a function that is not declared until `app2.ino`, Arduino will not see `app2.ino` yet, and will just see an undeclared function in `app1.ino`.  Seeing this undeclared function, it will spit out an error and refuse to compile.  The solution to this is to add a file called `ForwardDeclarations.h` and declare all functions that will need to be declared in advance here.  You do not need to define the logic of these functions, you just need to declare them.  Another way I might phrase is this that you need to tell Arduino to make space in it's program for a function, and just re-assure it that in the near future, that space will be filled in with a proper function.

In my code you will find another interesting file titled `functions.ino`.  There are a couple functions (mostly the buttons being recorded as pressed) that need to apply to every other sketch file.  I could put these in the main `.ino` file, but I felt it was cleaner to just make a specific sketch file just for these functions.

You will also find a file titled `sketch.yaml`.  This file has nothing to do with the program itself, and just exists as a shortcut for compiling and uploading the code to a micro-controller.  If you use Arduino-CLI then you should update the contents of this file to fit your specific port and board.  If are using the Arduino-IDE then this file can be omitted.  If you are not sure what you are using, you are probably using Arduino-IDE, and should remove this file from your directory.

Finally you will see two markdown files in the directory on GitHub.  One titled `README.md` that just exists as a description on the GitHub page.  The other is titled `staticAppletTemplate.md` and this one contains a template for what a standard static applet should look like.  The contents of this template is meant to be copied into a `.ino` file where you can customize it to create your own applet.  The reason this is in markdown and not in `.ino` is simply that if I were to make this a `template.ino` file, Arduino would confuse it as part of the program and throw a fit and refuse to compile.

This does bring a final point though, all these other files that are not officially recognized by the Arduino compiler will just be ignored, and will not be uploaded to your micro-controller.

---

## 2. Wiring Diagram, PCB, and Housing

Here is a schematic for the circuit. You can find the Gerber files for a PCB you can order in the GitHub page.

![](/Assets/Images/projects/ArduDeck/Schematic_ArduDeck3.0_2026-09-19.webp)

