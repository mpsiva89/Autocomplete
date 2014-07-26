var fs = require('fs');
var indexedWords = {};

module.exports = function(app){
    var matchString = [];
    var indexer = {
        //Initialzed on server start. Reads the words.txt file and passes data to generateIndex function
        initialize : function() {
            var self = this;
            fs.readFile('./words.txt', 'utf8', function (err, data) {
                if (err) 
                  throw err;
                var words = data.toString().split("\r\n");
                self.generateIndex(words, indexedWords);
            });
        },

        //takes parameter as searched text and passes it to mergeObjectsToString function along with sliced object
        //ex: word - "te". Function converts {t:{e:{n:0, s:{t:0}}}} to {n:0, s:{t:0}} and passes to mergeObjectsToString function
        //returns the final array of matching string
        getSearchResults : function(word) {
            matchString = [];
            var characters = word.split(""), obj = indexedWords;
            for(var i=0; i < characters.length; i++) {
                if(obj[characters[i]] && obj[characters[i]] == 0)
                    return matchString.push(word);
                obj = typeof(obj[characters[i]]) === "object" ? obj[characters[i]] : null;
            }
            if(!obj)
                return matchString;
            return this.mergeObjectsToString(word, obj);
        },

        //gets the word and sliced object as parameter and returns array of concatenated string
        //ex: word - 'te', currentObj - {n:0, s:{t:0}}. Returns ['ten', 'test']
        //uses recursive loop for concatenating nested object values
        mergeObjectsToString : function(word, currentObj) {
            for(var i in currentObj) {
                if(typeof(currentObj[i]) === "object") {
                    var tempWord = word;
                    tempWord += i;
                    if(currentObj[i].hasOwnProperty('$'))
                        matchString.push(tempWord);
                    this.mergeObjectsToString(tempWord, currentObj[i]);
                } else if(currentObj[i] === 0) {
                    var tempWord = word;
                    tempWord += i != '$' ? i : "";
                    matchString.push(tempWord);
                }
            }
            return matchString;
        },
        
        //generates the index and stores in indexedWords object
        generateIndex : function(words, indexedWords) {
            for(var wordIndex = 0; wordIndex < words.length; wordIndex++) {
                //Splits the word into characters
                var characters = words[wordIndex].split("");
                //generates tree for the character, if object doesn't exists
                characters.reduce(function(indexedObj, character, index) {
                    var currentObj = indexedObj[character];
                    if(typeof(currentObj) === "undefined") {
                        //assigns the value of object as 0, if word ends with the character
                        //else assigns empty object
                        indexedObj = indexedObj[character] = (index === characters.length - 1) ? 0 : {};
                    } else if ( currentObj === 0 ) {
                        //converts 0 to $:0, if object has the continuation words
                        indexedObj = indexedObj[character] = { $: 0 };
                    } else {
                        //assigns the character to the object
                        indexedObj = indexedObj[character];
                    }
                    return indexedObj;

                }, indexedWords);
            }
            return indexedWords;
        }
    };
    return indexer;
};