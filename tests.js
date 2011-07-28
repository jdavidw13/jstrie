(function() {
var jstrie = require('./jstrie');
var trie = jstrie.buildTrie(['hi']);

try {
    if (!trie.h.i._$)
        throw 'trie does not have correct structure for "hi"';
}
catch(err) {
    console.log('Failed trie structure test: '+err);
    return;
}

jstrie.buildTrie(['bye'], trie);
try {
    if (!trie.b.y.e._$)
        throw 'Failed to add to existing trie structure';
}
catch(err) {
    console.log(err);
    return;
}

trie = jstrie.buildTrie(['ab', 'ac']);
var size = 0;
for (var i in trie.a) {
    size++;
}
if (size != 2) {
    console.log('Failed trie structure test 2: incorrect number of children for ["ab", "ac"]');
    return;
}

size = 0;
for (var i in trie) {
    size++;
}
if (size != 1) {
    console.log('Failed trie structure test 3: incorrect number of parent(s) for ["ab", "ac"]');
    return;
}

var words = jstrie.getWords(trie);
if (words.indexOf('ab') < 0 || words.indexOf('ac') < 0) {
    console.log('Failed test to retrieve all words in trie');
    return;
}

words = jstrie.getWords(trie, 'a');
if (words.indexOf('ab') < 0 || words.indexOf('ac') < 0) {
    console.log('Failed test to retrieve all words starting with "a" for ["ab", "ac"]');
    return;
}

words = jstrie.getWords(trie, 'ab');
if (words.length != 1 && words.indexOf('ab') == -1) {
    console.log('Failed to retrieve single word "ab" for ["ab", "ac"]');
    return;
}

words = jstrie.getWords();
if (words.length != 0) {
    console.log('Failed to return empy array for null input of getWords()');
    return;
}

console.log('All Tests Passed');
})();
