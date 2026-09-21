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

## 2.  Wiring Diagram, PCB, and Housing

Here is a schematic for the circuit.  You can find the Gerber files for a PCB you can order in the GitHub page.  If you have access to one of the preprinted PCB's, and that PCB says "ArduDeck V3" then you will need to wire in a menu button by adding wires to pin A4 and setting it up to a button with a pull down resistor as described in the schematic below.

![](/Assets/Images/projects/ArduDeck/Schematic_ArduDeck3.0_2026-09-19.webp)

Let's go over each sub-circuit.
- **Power Circuit**: This is just two open slots for you to put in your own wires into your own power circuit as you see fit.  I have a 3.7v LiPo battery hooked up to a battery charger and a voltage regulator.  This ensures that the battery is providing the right voltage and can be charged without having to unplug everything.  Notably though, my charger will not allow me to turn on the ArduDeck, as having it powered on AND charging could result in harm to the battery.  Regardless, that circuit is not pictured here, as the intention is for you to use whatever resources you have to power the device yourself.  If you really wanted to, you could just use a USB chord to power the Arduino directly.  
- **Menu Button**: An earlier version of this program had a double click on the rotary encoder button functioning as a "menu button".  Anytime you double clicked, that action would exclusively exist to take you to the menu.  After much tinkering I simply could not get the feel of that double click to be good enough for me.  So instead, version 3.1 of the circuit has been created where I add a dedicated menu button.  This button is tied to a pin that was previously unused (A4) and is wired using a simple pull-down resistor.  As mentioned above, if you are trying to build the PCB version 3.0 then you will need to add this button yourself.  In version 3.1 I do not have a specific slot for the button, instead, much like the power circuit, I just leave two through-hole connectors for you to wire in your own button.
- **Rotary Encoder**: This is just a run-of the mill [rotary encoder](https://arduinogetstarted.com/tutorials/arduino-rotary-encoder).  Looking up "Rotary Encoder" on any online store and picking the default one that shows up should suffice, but If you need more direction, look for something like this: [(non-affiliate link, I'm not saying buy this one,I'm saying look for something like this)](https://www.amazon.com/HiLetgo-Degrees-Rotary-Encoder-Arduino/dp/B07WZF1TXX?crid=3J7R0QHTUTDPM&dib=eyJ2IjoiMSJ9.DXj00Da7o69UiffMrM5wQZCx0D-pUblfv5db3goK_8sK0V5kLGd9Z8qtF886pzcqngH-IvSEc1yQ4uu1gUlkodUWikTHl-plU_IrE9eWDs6UdAd6ichNSsD07ZBkjUHifB4-ARNC16fqxo4Qhk0J6AHY6AcdxaVsx3jld6aKqTf1rlsOpKdubpyKD-48fZ48K-Kl7E-lXOMaZ-IWAQoi_9bZ7hRzr5Z1qyCz2MWbgJs.ZOH4GbOSr0V-ainogHKae7ZN6PhYhvwoaExwQYELvlE&dib_tag=se&keywords=rotary+encoder&qid=1789955302&sprefix=rotary+encode%2Caps%2C355&sr=8-7)  We did not worry about [debouncing](https://en.wikipedia.org/wiki/Switch#Contact_bounce) the menu button because a debounce in that scenario would have little to no consequences to the functionality and feel of the device.  The rotary encoder on the other hand will be the main way in which we interface with the device, so setting up proper debouncing methods is vital here.  There are three things we need to debounce.  We need to debounce the clockwise and counterclockwise rotation, and we need to debounce the push button.  The rotational debounce is handled through code with a time delay.  It took some messing around with different times, I found that 100ms felt the best as far as removing debouncing issues all together while maintaining a snappy feel.  More importantly the push button needs to be debounced, and depending on the use case, you might need to push the button several times in a short amount of time.  Deboucning with a time delay would make that feel clunky, and debouncing with a simple capacitor did not fully eliminate the bouncing problem.  
- **555 Timer Debounce**: To solve this debounce problem, instead in my trusty [Mims](https://www.thriftbooks.com/w/timer-op-amp-and-optoelectronic-circuits-amp-projects_forrest-m-mims-iii/409055/?resultid=5371c437-613a-4a3d-9084-be4b9129da1e#isbn=0945053290&edition=5921053) I found a debouncing circuit using a 555 timer.  I had a bunch of 556 timers lying around, which is basically two 555 timers glued together.  Upon testing I found that this handy circuit completely fixes any debouncing issues.  So the SW pin from the rotary encoder is fed into this debouncing circuit.  Since I only have 556 timers, the schematic features a 556, but all the extra functionality of the 556 is neglected here, and a 555 timer should be more than enough.  I guess if you really wanted to debounce the menu button, you could use this same 556 to debounce it as well.  I should note, that the rotational debounce could not work with this circuit due to the logic that is used to identify the nature of the rotation.  You can find the the debouncing circuit in the Mims book, but if you are unlucky enough to not have this legendary little radio-shack book, then I have it pictured it below.

![](/Assets/Images/projects/ArduDeck/555BounceFreeSwitch.webp)

- **Pin Headers**: Lots of pins of the Arduino ended up being free, so In the schematic and in the PCB I have routed those pins to a pin header, so as to keep the possibility of using those pins.  If you are trying to preserve space, and don't expect to need any other sensors or modules, then feel free to ignore these.
- **LCD Screen**: This is wired in accordance to this guide: [1602 LCD Display](https://docs.arduino.cc/learn/electronics/lcd-displays/)
- **Micro-controller**: I am using a knockoff Arduino Nano.  this being a knockoff means that some pins are not quite working in the same capacity. I wrote the original code in such a way that I was using some analog pins to take digital readings.  This seemed to work just fine on an official Arduino Nano, but on the knockoff nano I found that the analog pins were simply just not able to do this.  Instead of redesigning the whole circuit, I decided to manually implement a function in the code for those particular pins that take a reading and manually decide if an analog read is above a certain threshold to return HIGH and return LOW if it is below that threshold.  It's a little jank, but it works,and now any knock off Arduino you put in this thing should work just fine.

As far as Housing goes, I using a little plastic box I found lying around that happened to fit the device.  The PCB for version 3.0 was made to fit inside an Altoids tin, though getting everything up and running in that tin would lead to a very very crowded housing.  Version 3.1 and forward has given up on this notion.  If you are good at 3D printing or some other manufacturing, feel free to come up with your own housing solution. Though, with all the plastic waste that is created, I would be surprised if you don't already have an appropriate box hiding somewhere in your house.  I found an old empty plastic box for a first aid kit is pretty close to the correct size.  Be creative, you'll figure it out!

---

## 3. How to Program a Menu