(function () {
  const input = document.getElementById('search-input');
  const countEl = document.getElementById('result-count');
  const cards = Array.from(document.querySelectorAll('.recipe-card'));

  if (!input || cards.length === 0) return;

  const baseurl = document.documentElement.dataset.baseurl || '';
  let idx = null;

  function updateCount(n) {
    if (n === cards.length) {
      countEl.textContent = n + ' recipes';
    } else {
      countEl.textContent = n + ' of ' + cards.length + ' recipes';
    }
  }

  function filterCards(query) {
    const q = query.trim();

    if (!q) {
      cards.forEach(function (c) { c.classList.remove('hidden'); });
      updateCount(cards.length);
      return;
    }

    if (!idx) return;

    // Search with each term required and trailing wildcard for partial matches
    var results;
    try {
      results = idx.query(function (lunrQuery) {
        q.split(/\s+/).forEach(function (term) {
          if (!term) return;
          lunrQuery.term(term.toLowerCase(), {
            boost: 10
          });
          lunrQuery.term(term.toLowerCase(), {
            boost: 1,
            wildcard: lunr.Query.wildcard.TRAILING
          });
        });
      });
    } catch (e) {
      results = [];
    }

    var matched = new Set(results.map(function (r) { return r.ref; }));

    var visible = 0;
    cards.forEach(function (card) {
      if (matched.has(card.dataset.url)) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    updateCount(visible);
  }

  // Load Lunr index
  fetch(baseurl + '/search.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      idx = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        var self = this;
        data.forEach(function (doc) { self.add(doc); });
      });

      updateCount(cards.length);

      // Run any pre-filled query (e.g. browser autocomplete)
      if (input.value) filterCards(input.value);
    })
    .catch(function () {
      // Search index failed to load, show all cards
      updateCount(cards.length);
    });

  // Debounced real-time search
  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    var val = this.value;
    timer = setTimeout(function () { filterCards(val); }, 150);
  });

  // Focus on load
  input.focus();
})();
