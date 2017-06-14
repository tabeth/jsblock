jsblock
============
Runnable JavaScript code snippets, in your browser. Powered by Ace Editor. 

## Usage
Say you want to allow users to test out some JavaScript that you've written, and you have some simple HTML that looks like this:

```html
<html>
  <head>
   <script src="lib/jsblock.js"></script>
   <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js"></script>
   <link type="text/css" rel="stylesheet" href="lib/jsblock.css">
  </head>

  <body>
    <pre id="code">
      var message = "Hello World";
      console.log(message);
    </pre>
  </body>
</html>
```

Readers won't be able to test anything out that way. You want to enrich this experience, but how? One way is through the creation of a `jsblock`. 

How to create a jsblock:

1. Include the [JavaScript](https://github.com/tabeth/jsblock/blob/master/lib/jsblock.js) and [CSS](https://github.com/tabeth/jsblock/blob/master/lib/jsblock.css) as well as [Ace Editor](https://ace.c9.io/) in the web page.

2. Convert the code into a code snippet into a jsblock with the easy API. One example might be:
```javascript
new jsblock(document.getElementById('code'))
```

3. Viola!

## Acknowledgements:
This was inspired by [codeblock.js](http://ink.github.io/codeblock.js/)
