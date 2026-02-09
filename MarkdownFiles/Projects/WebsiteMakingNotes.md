# Project Notes for first web project


## Here we will put the information we have learned 

---

[Go Back To Projects](/HTML/Projects/index.html)

---
The structure of how the website works is pretty intuitive, it can be broken down into three parts.

- the html file
- the css file
- the data (JSON or markdown)

essentially it will look like this:

[Data] -> [Markdown File] -> [loadcontent.js] -> [html]

- the data will be in the form of a markdown file.  
- the loadcontent.js will be a script that runs inside the html that will load the markdown file into the html itself.

---

### Loading content from Markdown into HTML

The following code is the loadcontent.js

```
fetch('file.md')
	.then(response =>{
		if(!response.ok) throw new Error('HTTP error' + response.status);
		return response.text();
	})
```
This first line fetches the file.md that we have with all the data.
If there is some sort of error, it will display the error code, and if the response works ok, it will proceed.
That last line of text `return response.text()` returns the file as just pure text.

```
  .then(md => {
        document.getElementById('journal').innerHTML = marked.parse(md);
  })
```
This next line of code coverts the text into HTML correct syntax
The element id here is 'journal' but that can change.

```
  .catch(error => console.error('Error loading markdown:', error));
```
Finally this last line of code is a final fail safe in case there is an error. It will spit out an error code.


On the HTML file itself we also need code to help us load the script we just wrote here.

in the `<body>` of the html file, you will need to put this code:

```
    <div id="journal"></div>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

    <script src="loadcontent.js"></script>
```


The ID is what we set in the script, we called it journal, so here we have it as well. `<div>` is just an empty container in html, so we have the body of the markdown file here.

the next line is a library we need to install that converts markdown into hhtml. 

the third line is us actually loading the script we wrote titled `loadcontent.js`

---

### The basics of CSS -> HTML

the next part of the code we need to talk about is the css file.  this one will be pretty quick.

If the HTML file is the skeleton that the website is built on, the CSS file is the aesthetic that makes it look nicer than just a bunch of text on a white screen.

first, we need to load the css file into the html page, to do so, let's look at this code:

```
<head>
	<link rel="stylesheet" href="style.css">
</head>
```

`<link>` does what you think it does here, it links the css file to the html one.

`rel` means "relationship" and tells the browser that the linked file will be a style sheet.

`href="style.css"` tells the browser which file is the one with the style sheet.

the CSS file itself is also very simple... for now. Though I imagine it can get really complicated.

```
body{
  background-color: beige;
  font-family: Times New Roman, sans-serif;
}

h1{
  color: darkblue;
  text-align: center;
}

p{
  color: black;
  font-size: 18px;
}
```

This essentially just tells you what fonts and colors to use for different sections.  (`p{}` is paragraphs, `h1{}` is for first headings, etc...)

---

### Self Hosting through python for quick tests

on Arch Linux Terminal, run: 
```
python -m http.server 8000
```

then on the browser, go to:
```
http://localhost:8000/yourfile.html
```

---

### Quick Github workflow

Work on your files like normal, but when you are done,   

Add the files to the update, either the whole thing or specific files
```
git add .
git add index.html style.css loadcontent.js
```

add comments to the update. Very important
```
git commit -m "Update HomePage markdown and styling"
```

push update to be live, either the whole thing, or a specific branch
```
git push
git push -u origin main
```

---

### Steps for adding a new page

1. Make the Markdown file for the page you want.  Put it in the appropriate folder.
2. On the `loadcontent.js` file in `main`, Add a new call for the markdown file you just made. Keep track of the ID you use.

3. Make an html page for the new page.  It can be whatever you need it to be, but here is a template of what I am using.

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>[INSERT TITLE]</title>  <!--- insert title --->
    <link rel='stylesheet' href="/Assets/Styles/style.css">
</head>
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

```
```

---

### File structure

Let's look at how to structure your files, so things don't get confusing as scope increases.

#### Root 
  - index.html
  - AboutMe.html
  - Assets
    - Fonts
    - Images
    - Scripts
    - Styles
  - HTML
    - Mixtapes
      - index.html
      - mixtapes1.html
      - mixtapes2.html
    - Portfolio
      - index.html
      - portfolio1.html
      - portfolio2.html 
    - Projects
      - index.html
      - Projects1.html
      - Projects2.html 
    -template.html 
  - MarkdownFiles
    - AboutMe.md 
    - HomePage.md 
    - Mixtapes 
      - MixtapesIndex.md 
      - Mixtapes1.md 
      - Mixtapes2.md 
    - Portfolio 
      - PortfolioIndex.md 
      - Portfolio1.md 
      - Portfolio2.md 
    - Projects 
      - ProjectsIndex.md 
      - Projects1.md 
      - Projects2.md 

---




