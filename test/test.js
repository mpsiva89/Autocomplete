var assert = require('assert');
var app = require('../app');
var indexer = require('../controller/indexer')(app.app);

describe("Index", function() {
  it("Should be equal to the mentioned object", function() {
    var obj = indexer.generateIndex(["test", "temp"], {});
    var obj1 = {t:{e:{s:{t:0}, m:{p:0}}}};
    assert.deepEqual(obj1, obj);
  });

 it("Should be equal to the mentioned array", function() {
    var stringArray1 = indexer.mergeObjectsToString("te", {s:{t:0}, m:{p:0}});
    var stringArray2 = ["test", "temp"];
    assert.deepEqual(stringArray1, stringArray2);
  });

  it("Should return array same as mentioned", function() {
    var stringArray1 = indexer.getSearchResults("testi");
    var stringArray2 = ["testing", "testimony", "testify"];
    assert.deepEqual(stringArray1, stringArray2);
  });
});