var restricted = [
  // Corp
  'Bio-Ethics Association',
  'Estelle Moon',
  'Excalibur',
  'Obokata Protocol',
  'Zealous Judge',
  'Scarcity of Resources',
  'Team Sponsorship',
  'Museum of History',
  'Hunter Seeker',
  'SIU',
  // Runner
  'Caldera',
  'Feedback Filter',
  'Film Critic',
  'Hippo',
  'Hyperdriver',
  'Jarogniew Mercs',
  'Stargate'
];

var banned = [
  // Corp
  'Border Control',
  'Brain Rewiring',
  'Bryan Stinson',
  'Cerebral Imaging: Infinite Frontiers',
  'Clone Suffrage Movement',
  'Friends in High Places',
  'Global Food Initiative',
  'Hired Help',
  'Jinteki: Potential Unleashed',
  'Mother Goddess',
  'Mti Mwekundu: Life Improved',
  'Mumbad City Hall',
  'Sensie Actors Union',
  'Skorpios: Defense Systems',
  'Whampoa Reclamation',
  // Runner
  '419: Amoral Scammer',
  'Aaron Marron',
  'Au Revoir',
  'Bloo Moose',
  'Crowdfunding',
  'Dean Lister',
  'Engolo',
  'Employee Strike',
  'Falsified Credentials',
  'Faust',
  'GPI Net Tap',
  'Laamb',
  'Labor Rights',
  'Levy AR Lab Access',
  'Misdirection',
  'Paperclip',
  'Salvaged Vanadis Armory',
  'Şifr',
  'Tapwrm',
  'Temüjin Contract',
  'Watch The World Burn',
  'Zer0'
];

function CTZ_VALIDATE_DECK() {
  var jnetDecklist = document.getElementsByTagName('textarea');
  var nrdbDecklist = document.getElementsByClassName('card');

  var restrictedCardsInDeck = [];
  var bannedCardsInDeck = [];

  if (jnetDecklist.length != 0) {
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
  } else {
    for (let card of nrdbDecklist) {
      if (
        card.attributes.getNamedItem('data-index') != null &&
        card.parentElement.localName != 'td'
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
      'Too many restricted cards: ' + restrictedCardsInDeck.toString()
    );
  }
  if (bannedCardsInDeck.length > 0) {
    messages.push('Too many banned cards: ' + bannedCardsInDeck.toString());
  }

  if (messages.length == 1) {
    messages.push('💯');
  }
  alert(messages.join('\n'));
}

CTZ_VALIDATE_DECK();
