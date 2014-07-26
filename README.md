Autocomplete
============

Autocomplete functionality in Node js

To run:
  1. Navigate to the folder in command prompt.
  2. type 'npm install'
  3. type 'node app.js'
  4. Hit 'http://localhost:3000/' in browser.

Server Side:


 1. app.js:
     Initial file called.
     
 2. routes/route.js:
     Routing based on the url are implemented in this JavaScript file.
     
 3. controller/indexer.js:
     generateIndex() - generates the index on data obtained from file words.txt
     getSearchResults(word) - returns the array of strings which matches the search text.
     mergeObjectsToString(word, currentObj) - Merges the object into string and inserts into the array.
     
Server side templating: Implemented using Jade
  - Inside folder views
  - index.jade and layout.jade
  
Client Side:
 1. custom.js:
    Handles the search-keyup event in search textbox. 
    Ajax call on search. Sends the search text to server.
    Uses Jquery-Autocomplete for UI look.
    Also binding the resultant data in a container. Commented out this part. Please uncomment and check.
    
Unit Testing:
 1. test/test.js - Contains unit test cases
 
