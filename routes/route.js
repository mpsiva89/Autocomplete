var indexer = require('../controller/indexer')();

module.exports = function(app){
    //router renders index.jade on request
    app.get('/', function(req, res){
        res.render('index', { title: 'AutoComplete Task'});    
    });
    
    //gets the search string and resposes with the matching strings
    app.post('/getMatch', function(req, res){
        var userSearch = JSON.parse(JSON.stringify(req.body));
        var matchString = indexer.getSearchResults(userSearch.word);
        res.send({ result: matchString });
    });

}