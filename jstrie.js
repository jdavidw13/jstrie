(function(){
var createTrie = exports.buildTrie = function(wordList, trie) {
    trie = trie || {};
    wordList.forEach(function(word) {
        var letters = word.split('');
        var trieNode = trie;
        for (var i = 0; i < letters.length; i++) {
            if (trieNode[letters[i]])
                trieNode = trieNode[letters[i]];
            else {
                trieNode[letters[i]] = {};
                trieNode = trieNode[letters[i]];
            }
        }
        trieNode._$ = true;
    });
    return trie;
};

var getWords = exports.getWords = function(trie, prefix) {
    if (!trie)
        return [];

    prefix = prefix || '';

    var letters = prefix.split('');
    var ret = [];

    var trieNode = trie;
    for (var i = 0; i < letters.length; i++) {
        var letter = letters[i];
        if (!trieNode[letter]) {
            trieNode = null;
            break;
        }
        trieNode = trieNode[letter];
    }

    if (trieNode) {
        var word = prefix;
        var walkTrie = function(word, trieNode) {
            for (var i in trieNode) {
                if (i != '_$')
                    walkTrie(word+i, trieNode[i]); 
                else
                    ret.push(word);
            }
        };
        walkTrie(word, trieNode);
    }

    return ret;
};
})();
