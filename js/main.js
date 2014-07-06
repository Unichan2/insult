// Generated by CoffeeScript 1.7.1
(function() {
  var CUSTOM_CHANCE, PRESET_CHANCE, fixArticles, genPhrase, getCombo, getCustom, setNewPhrase, setupWords, showPrevious, template;

  template = ['intro', 'you', 'adjective', 'compound_adjective', 'expletive', 'noun'];

  this.phraseHistory = [];

  PRESET_CHANCE = 0.02;

  CUSTOM_CHANCE = 0.30;

  Array.prototype.compact = function() {
    var elem, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elem = this[_i];
      if (elem != null) {
        _results.push(elem);
      }
    }
    return _results;
  };

  Array.prototype.choose = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  setupWords = function() {
    var k, v, w, _ref;
    _ref = this.words;
    for (k in _ref) {
      v = _ref[k];
      this.words[k] = v.replace(/(.+?)\[(\d+)\](\n|$)/g, function(s, m1, m2) {
        return Array(parseInt(m2) + 1).join(m1 + '\n');
      }).trim().replace(/#/g, '\n').split(/\n/);
    }
    return this.words.intro = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = this.words.intro;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        w = _ref1[_i];
        _results.push(!!w ? "" + w + "," : w);
      }
      return _results;
    }).call(this);
  };

  getCustom = function() {
    return this.words.custom.choose().replace(/\{(.+?)\}/g, function(s, m1) {
      if (m1 === 'phrase') {
        return getCombo();
      } else {
        return this.words[m1].choose();
      }
    });
  };

  getCombo = function() {
    return template.map(function(type) {
      return this.words[type].choose();
    }).compact().join(' ');
  };

  genPhrase = function() {
    var roll;
    roll = Math.random();
    if (roll < PRESET_CHANCE) {
      return this.words.preset.choose();
    } else if (roll < CUSTOM_CHANCE) {
      return getCustom();
    } else {
      return getCombo();
    }
  };

  fixArticles = function(s) {
    return s.replace(/\ {2,}/, ' ').trim().replace(/\ba\b ([aeiou])/g, 'an $1');
  };

  setNewPhrase = function() {
    this.index = 0;
    this.previous = this.phrase;
    this.phrase = fixArticles(genPhrase()).toUpperCase();
    $('#sentence').text(this.phrase);
    return this.phraseHistory.unshift(this.phrase);
  };

  showPrevious = function() {
    return $('#sentence').text(this.phraseHistory[++this.index]);
  };

  $(function() {
    setupWords();
    setNewPhrase();
    $('#new').click(function() {
      return setNewPhrase();
    });
    $('#previous-link').click(function() {
      return showPrevious();
    });
    return $('#time').text(lastUpdated);
  });

}).call(this);
