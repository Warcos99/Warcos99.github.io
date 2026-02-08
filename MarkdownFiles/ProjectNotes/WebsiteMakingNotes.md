# Project Notes for first web project


## Here we will put the information we have learned 

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

