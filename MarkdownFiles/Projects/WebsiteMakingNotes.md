
[Go Back To Projects](/HTML/Projects/index.html)

---

# Learning to make a website

#### Disclaimer:

This is a walk through of my process for how I made this site.  I am not a professional web developer, and learned all of this in one dedicated week of research. I am not programmer, or at the very least not a very good one, so what you see here worked for me, but you might find some ineficiencies in it.  

Particularly if you are experienced in this field, and find something offensive about my process, I am open to constructive feedback.  email me at jmarcosavin@gmail.com!

I learned all of this out of order, I will try to place it in an order that makes sense for you to follow along. For example, I did not consider the importance of a file structure until the end of the process, meaning I had to spend several hours changing files and directories so that I could future proof the site.  Here I have placed it at the beggining so you don't commit the same mistake as me.

---

## File Structures

The first thing one should consider when deciding to build a website is the file structure that the website project will live in. 

See, the website itself will be a collection of html files, one for each page.  For each html file, you will have a data file attached to it, for most it's a json file, for me they happen to be markdown files.  And then you will have script files, typically in javascript, and style files, those ones in css, that will all accomplish different things. 

This results in a bunch of files in a single directory.  This may not be so bad, but once you start to have pages within pages, things start to get messy.  And organizing the files after you have created them becomes a hastle because each file is calling to each other with a "location code".  Once the location of a file is changed, you have to go to all the other files that are calling it and make sure that that location code is updated.  This becomes unwieldly really fast.

```
[Data]->[MarkdownFile]->[Javascript]->[HTML]-[Website]
                           [Style.CSS]--^ 
```
Above is the typical structure of the relationship between all the kinds of files you will see in my particular code.
1. the data is typed out in a markdown format.
2. A javascript script converts markdown into html
3. the HTML file proper calls upon that javascript script to get the data for that page in a format it will understand.
4. the css file is used to dictate the style of the page itself (the margins, the fonts, the colors, etc...)
5. Finally, the html file taking the data from the javascript and the style from css is able to put it all together and present it to the browser as a proper website.


So all that being said, here is how I am structuring my file system, as well as some notable files:
```
[Root]
	[Assets]
		[Fonts]
		[Images]
		[Scripts]
			loadcontent.js
		[Styles]
			style.css
	[MarkdownFiles]
		[Mixtapes]
			MixtapeIndex.md
			Mixtape1.md
			Mixtape2.md
			etc...
		[Portfolio]
			PortfolioIndex.md
			Portoflio1.md
			Protfolio2.md
		[Projects]
			ProjectIndex.md
			Project1.md
			Project2.md
		AboutMe.md
		HomePage.md
	[HTML]
		[Mixtapes]
			index.html
			mixtapes1.html
			mixtapes2.html
		[Portfolio]
			index.html
			portfolio1.html
			portfolio2.html
		[Projects]
			index.html
			projects1.html
			projects2.html
	index.html
	AboutMe.html
	header.html
```
Some quick notes about this structure, I have the index, Aboutme, and header pages on root, simply because that seemed easy enough, since they are very simple and very important pages.

Something I did not realize was that for some reason, you need an index.html at the root in order for git to pull up the website.  

On a similar note, each directory that will pull up websites, for some reason also needs index.html files.  Don't ask my why, but it's important enough that I just have them.

---

## HTML

html files are the beating hear of the website.  They are the skeleton that takes in all the data and formatting from other files and present it to you as a finished product.  So, let's look at them.

Now the world of html can be pretty deep, and I am only just dipping my toes into it.

Here is a template of a barebones html file:

```
<!DOCTYPE html>
<html>
	<head></head>
	<body></body>
</html?>
```
HTML files work through these weird carrot things that tell the compiler what it is looking at.  For example anything between the `<html></html>` carrots, the compiler will understand is html code.  Anything between the `<body></body>` carrots will be understood as the main body of the website. The text and buttons inside. And finally, anything inside the `head` will be the meta data for the site, like what character set to use, or a link to the css style sheet.

You can have text directly hardcoded in here for a very simple website, just put it in between `<p></p>` (the "p" stands for paragraph), and find several guides online for how to format that text.  But for my specific site, all the text is written out in a markdown file that is linked into the html page.  This means that all the html files look essentially the same for me.  Let me show you what a typical file looks like:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>[INSERT TITLE]</title>  <!--- insert title --->
    <link rel='stylesheet' href="/Assets/Styles/style.css">
</head>
```
This first bit is the head of the html file.  In it, I am telling the site that I am using UTF-8 character set (look it up).  I am telling the site the title of the page itself.  
And finally, I am linking the site to the css file i have elsewhere with the style information. (the file is located in the folder: /Assets/Styles/style.css)

Now let's look at the body:
```
<body>
    <div class="layout">
      <div id="header"></div>
      <div class="content">
      	<div id="[INSERT ID FOR PAGE]"></div> <!--- insert ID --->
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="/Assets/Scripts/loadcontent.js"></script>

</body>
</html>
```
 In this second half, we are doing more interesting things.
 the first thing to understand is `div`.  As far as I understand it, `div` in html is just an empty space that you can designate as whatever you need.  So for example here, with `div class="layout"` I am designating an empty space here and calling it the "layout".  My understanding of it is not dissimilar to setting a classic variable in any other programming language. 
 after that within the layout, we are setting another variable, this one called the "header" and it exists within the layout.  
 
 This is the part of the code that allows me to have a "menu" on the top of the screen with the different places to click. the ID "header" is needed because later when we talk about the javascript script that is loading files into this html file, we will see that we gave the file with the header information the id of "header".  So here, html is seeing that file and attaching it at this point in the code.
 
 for the next div, content, we see that once again, we are looking for an ID.  this time the ID is not coded into this example because that ID changes.  In that javascript file, we may designate the ID of the About Me page to "AboutMe", so then we put that ID into this field to call that page.
 
 This is how I am able to have the same template for all my html files for mostly everything, and the only thing I have to edit is the markdown files for each page. 
 
 the last two notable lines are the ones that are calling up on that javascript script.
 
```
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```
 this is a library we need to call forth, because markdown cannot be natively converted to html without it.
 and finally : 
 ```
 <script src="/Assets/Scripts/loadcontent.js"></script>
 ```
In this last line, we are loading our javascript document called "loadcontent.js" into here so we can load the rest of the "content" we made. (By that I mean specifically load the header.html file and the markdownContent.md file).

---

## loadcontent.js

This is a pretty important file, so let's talk about it.
As the title suggests, it is the script we wrote that load the markdown files into html.  

Javascript is not my strong suit , so bare with with me, as I attempt to explain it.  

The big picture understanding of the code below is that this script is split into two parts. 
1. (a) the function that loads markdowns into html. (b) also the function that loads other html files into html
2. the calling of the function for all the pages we need to create.

This first one is the function to load markdown files:
```
function loadMarkdown(filePath, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return; // <- stop if the element doesn't exist

  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error('HTTP error ' + response.status);
      return response.text();
    })
    .then(md => {
      el.innerHTML = marked.parse(md);
    })
    .catch(error => console.error('Error loading markdown:', error));
}
```

Let me try to explain this function.

the first line is pretty simple, we are creating a function, calling it 'loadMarkdown' and getting two inputs for the function, one called the filePath and one called the elementID

Because this one script services all of the pages, if you call for the "AboutMe" page, it is also going to call for all the other pages, like the "Projects" and the "Mixtape" pages.  this doesn't break anything, but it causes unecessary work for the computer, and also spits some errors on the backend that give me anxiety.  So the next line of code deals with that.

`const el = document.getElementByID(elementID);` and so on will check what page we are looking for, and if we are looking for "AboutMe" it will only run the rest of the code if the elementId is "AboutMe".

The rest of the function is basically just fetching the markdown file from the filepath provided, converting it to pure text, then converting the text to html.  Along the way, if there are any errors, it spits out error messages to help troubleshoot.

Here is the other function to load html files:
```
function loadHTML(filePath, elementId) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => console.error('Error loading HTML:', error));
}
```
It's basically the same as the function above, except since it's already in html, we don't have to worry about converting to text or anything.  
  
Also, my only html call here is for the header. and since every single page will call for the header, there is no error of this function being called when the id for it is not being called, like above.  SO FAR, I have not needed to fix this function with that first two lines of code from the markdown function, but If you are calling several html files and not all on every page, then consider this might be an issue.

The next step, once we have those functions is to call them to create our key word connections:

```
/* ---- Calls for Main pages ---- */
loadMarkdown('/MarkdownFiles/HomePage.md', 'HomePage');
loadMarkdown('/MarkdownFiles/AboutMe.md', 'AboutMe');

/* ---- Calls for Projects page ---- */
loadMarkdown('/MarkdownFiles/Projects/ProjectsIndex.md', 'Projects');
loadMarkdown('/MarkdownFiles/Projects/WebsiteMakingNotes.md', 'WebsiteNotes');

/* ---- Calls for Portfolio page ---- */
loadMarkdown('/MarkdownFiles/Portfolio/PortfolioIndex.md', 'Portfolio');

/* ---- Calls for Mixtapes page ---- */
loadMarkdown('/MarkdownFiles/Mixtapes/MixtapesIndex.md', 'Mixtapes');

/* ---- Calls for other files ---- */
loadHTML('/Assets/header.html', 'header');
```
As you can see this process is pretty straight forward, you just run your function `loadMarkdown('fileDestination','ID');` and it generates that connection for you.  This is the ID that is used in the html file to connect things together.

When you are putting in the file address, start with a `/`.  I learned that putting in the file address as `MarkdownFiles/Mixtapes/Portfolio` without the slash at the beggining will make the file start looking for a "markdownfiles" folder in the scripts current directory.  Since this script lives in `Assets/Scripts` there is not Markdown folder in here, and it will spit out an error.

Adding the slash at the beggining of the address tells the code to start looking for these directories in the root folder of the website.  This is distinction is what is called relative vs absolute pathing.  Using the slash at the beggining tells the program to use the absolute path, without it, it looks for the relative path.  

In general anytime you path to a specific file, I found it good practice to keep to absolute paths, since it will consistently always work.


---
## CSS

I will post my own style.css file here, so you can see how one would look like. Just know that as far as style goes, my website is more minimal, and as such you can get much much much more creative with yours.

```
body {
    background-color: beige;
    font-family: "Times New Roman", Times, serif;
    margin: 20px;
}

div {
    padding: 20px;
}

pre { /* for code blocks */
    border: 2px solid black;
    padding: 20px;
    background-color: #f5f0e6; /* light background, close to beige*/
    overflow-x: auto; /* prevents long lines from breaking layout */
}

code { /* for text in code blocks */
    font-family: "Courier New", monospace;
    font-size: 12px;
}
```

As you can see a css file is organized pretty intuitivly, and you can find much better examples of them online elsewhere.  this simple one just works for me.

A quick note, if you want to quickly exeriment with changing style option and seeing changes on the file, analyzing your website on a browser will often let you mess the css file there directly and see those changes happen instanteniously.

Want to see what a black background looks like? or a different font? just make the change on the browser included analyzer!  The only thing is that changes here won't  save, make sure to make those changes officially on the proper file.

---

## Next Steps
At this point each individual file has been sorted out.  The only file type I have not talked about is the markdown files.  But Markdown files are pretty intuitive.  The only notable thing to mention here is that if you include a link to a different page on the markdown file itself, you have to make sure you are linking to an html file, not another markdown file.

But from this point onward, I will assume you have a good file structure and completed scripts, html's, styles, and data that are all in contact with each other.  So let's talk about the next step, viewing the website itself.

---

## Self hosting with python

on your terminal, run:
```
python -m http.server 8000
```

then on the browser, go to:
```
http://localhost:8000
```

---

## Hosting through Github

Check out github sites [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

---

## Quick Github workflow

Once the site is hosted on github, it becomes really easy to itterate ad change.  
To make a new page, 
1. create the html page corresponding to it.
2. create the link and ID in the loadcontent.js
3. create the markdown file associate with the page
4. Edit the markdown file to your desired state
5. Quick test using a python server
6. when finished, push the update to github.
7. You are done.

To push a git upate run the following code:
```
git add .
git commit -m "Put your comments on the changes here"
git push
```


If you want to add a single file instead of the whole directory, use 
```
git add 'directory'
```

When you run git push, you will need to be in the root directory of the site. otherwise it will only push the update to whatever directory you ran the code under.




