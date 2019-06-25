var CTZ_MWL_GIST_URL =
  'https://api.github.com/gists/64e075133f19d433445a5b2165d9a910';

function CTZ_VALIDATE_DECK(mwl) {
  if (
    // fail fast if we're not on nrdb or jnet
    !['https://www.jinteki.net', 'https://netrunnerdb.com'].includes(
      window.location.origin
    )
  ) {
    return;
  }

  var mwl_cards = JSON.parse(mwl.files.CTZ_MWL_3.content);
  var banned = mwl_cards['banned'];
  var restricted = mwl_cards['restricted'];
  var last_updated = mwl.updated_at;

  var restrictedCardsInDeck = [];
  var bannedCardsInDeck = [];

  if (window.location.origin == 'https://www.jinteki.net') {
    // There is one <textarea> on the decklist edit page.
    var jnetDecklist = document.getElementsByTagName('textarea');
    var cards = jnetDecklist[0].innerHTML.split('\n');
    for (let card of cards) {
      var cardName = card
        .split(' ')
        .slice(1)
        .join(' ');
      if (restricted.includes(cardName)) {
        restrictedCardsInDeck.push(cardName);
      } else if (banned.includes(cardName)) {
        bannedCardsInDeck.push(cardName);
      }
    }

    var identity = document
      .querySelector('div.header img')
      .attributes.getNamedItem('alt').value;
    if (restricted.includes(identity)) {
      restrictedCardsInDeck.push(identity);
    } else if (banned.includes(identity)) {
      bannedCardsInDeck.push(identity);
    }
  } else if (window.location.origin == 'https://netrunnerdb.com') {
    // This matches more cards than the decklist, so it will be filtered below.
    var nrdbDecklist = document.getElementsByClassName('card');
    for (let card of nrdbDecklist) {
      if (
        card.attributes.getNamedItem('data-index') != null &&
        (card.parentElement.localName != 'td' ||
          card.previousElementSibling == null)
      ) {
        var cardName = card.innerText;
        if (restricted.includes(cardName)) {
          restrictedCardsInDeck.push(cardName);
        } else if (banned.includes(cardName)) {
          bannedCardsInDeck.push(cardName);
        }
      }
    }
  }

  var messages = ['CTZ MWL Validator report:\n'];

  if (restrictedCardsInDeck.length > 1) {
    messages.push(
      'Too many restricted cards: ' + restrictedCardsInDeck.join(', ')
    );
  }
  if (bannedCardsInDeck.length > 0) {
    messages.push('\nToo many banned cards: ' + bannedCardsInDeck.join(', '));
  }

  if (messages.length == 1) {
    messages.push('💯');
  }
  messages.push('\nLast updated: ' + last_updated);
  alert(messages.join('\n'));
}

fetch('https://api.github.com/gists/64e075133f19d433445a5b2165d9a910')
  .then(response => response.json())
  .then(mwl => {
    CTZ_VALIDATE_DECK(mwl);
  });
