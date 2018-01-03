// Test cases:
// Royal Flush : Ts Js Qs Ks As
// Straight Flush : 2s 3s 4s 5s 6s
// Four of a Kind: 2s 2h 2d 2c 6s
// Full House: 2s 2h 2d 6c 6s
// Flush : 2s 4s 6s 8s Ts
// Straight : 2s 3s 4c 5h 6d
// Three of a Kind: 2s 2h 2d 4c 6s
// Two Pairs: 2s 2h 4d 4c 6s
// Pair: 2s 2h 5d 4c 6s
// High Card: 2s 8h 5d 4c 6s

// Stores high card values in array, temp solution until everything is fully tested
var highCardValue = []

function PokerHand (hand) {
  this.hand = hand
}

PokerHand.prototype.compareWith = function (secondHand) {
  var result = 0
  // Array that will contain the results to display to the user.
  var decision ;
  highCardValue.length = 0;
  var firstHandDecision = getHandDecision(this.hand)
  var secondHandDecision = getHandDecision(secondHand)
  if (firstHandDecision != null && secondHandDecision != null) {
    if (highCardValue.length == 2) {
      // If we're dealing with 2 high cards, we need to determine which high card is stronger first
      result = highCardResult(result)
      highCardValue.length = 0
      decision = [firstHandDecision, secondHandDecision, result]
      return decision
    } else {
      result = winningHandResult(firstHandDecision, secondHandDecision, result)
      decision = [firstHandDecision, secondHandDecision, result]
      return decision
    }
  }
}

function checkHand (firstHand, secondHand) {
  var pokerHand = new PokerHand(firstHand)
  if (validateHand(firstHand) && validateHand(secondHand)) {
    var decision = pokerHand.compareWith(secondHand)
    // alert("return value in check hand is " + JSON.stringify( pokerHand.compareWith(secondHand)))
    // Strings containing the hand
    var firstHandDecision = decision[0];
    var secondHandDecision = decision[1];
    // Integer containing the result (3, 2 or 1)
    var result = decision[2];
    if (result == 1) {
      sweetAlert('First Hand wins', "The first hand's " + firstHandDecision + " is stronger than the second hand's " + secondHandDecision, 'success')
    } else if (result == 2) {
      sweetAlert('First Hand loses', "The second hand's " + secondHandDecision + " is stronger than the first hand's " + firstHandDecision, 'error')
    } else if (result == 3) {
      sweetAlert('Draw!', 'The first hand and second hand are equal with ' + firstHandDecision + ' and ' + secondHandDecision, 'info')
    }
  }
}

function validateHand (hand) {
  // Returns count of number of spaces
  var isValidated = false
  var spaces = count(hand, ' ')
  if (spaces == 4) {
    // Splits cards accordingly by the space, stores the 5 seperate cards.
    var pairOfCards = hand.split(' ')
    // Now checks if 5 cards have been entered correctly, using two characters for each card.
    if (hand.length - 4 == 10) {
      var validCardsCount = 0
      var validSuitCount = 0
      for (var i = 0; i < pairOfCards.length; i++) {
        // Checks if any duplicates are present within the code.
        if (countApperances(hand, pairOfCards[i]) > 1) {
          sweetAlert('Oops...', 'Please remove any duplicate cards', 'warning')
          return false
        }
        // Scenario where someone types in just 1 or 3 characters for a card (e.g. 2 SAH 6CD)
        if(pairOfCards[i].length > 2 || pairOfCards[i].length < 2){
          sweetAlert('Oops...', "Each card must be comprised of only 2 characters (e.g. 2S AH 6D)", 'warning')
          return false;
        }
        // The final hurdle now is just to see if the user has entered in a valid value/suit.
        validCardsCount = validCardsCount + count('23456789TJQKA', pairOfCards[i][0].toString())
        validSuitCount = validSuitCount + count('SHDC', pairOfCards[i][1].toString())
        // Forces user to type the correct values in for each card


        if (validCardsCount == 5 && validSuitCount == 5) {
          isValidated = true
        } else if (i == pairOfCards.length - 1) {
          // On the last loop, show the error message for the case when at least one character is not valid.
          sweetAlert('Oops...', "One or more of your cards doesn't exist. Please ensure the combination is possible first", 'warning')
          isValidated = false
        }
      }
    } else {
      sweetAlert('Oops...', 'Please use two characters for each of the 5 cards entered (e.g. 2S, 8D, JH..) ', 'warning')
      isValidated = false
    }
  } else {
    sweetAlert('Oops...', 'Please enter 5 cards separated by a space', 'warning')
    isValidated = false
  }
  return isValidated
}

// Returns count of the number of occurances of a suit/denomination.
// Won't work, no way of knowing which character
// IF(count("2S 4H 6D QC", pass in "C") == 1
function count (string, char) {
  var re = new RegExp(char, 'gi')
  var occurances
  if (string.match(re) == null) {
    occurances = 0
  } else {
    //  alert("string normal occur " + string.match(re))
    occurances = string.match(re).length
  }
  return occurances
}

// Returns count of the number of occurances of a card to check for duplicates.
function countApperances (string, string2) {
  var re = new RegExp(string2, 'gi')
  var occurances
  if (string.match(re) == null) {
    occurances = 0
  } else {
    occurances = string.match(re).length
  }
  return occurances
}

// Compares both hands and determines whether the first hand has won or lost
function winningHandResult (firstHandDecision, secondHandDecision, result) {
  var firstHandAsInt = handToInteger(firstHandDecision)
  var secondHandAsInt = handToInteger(secondHandDecision)
  // alert("first hand as int " + firstHandDecision + " " + secondHandDecision + " " + firstHandAsInt + " " + secondHandAsInt)
  if (firstHandAsInt > secondHandAsInt) {
    result = 1
  } else if (firstHandAsInt < secondHandAsInt) {
    result = 2
  } else if (firstHandAsInt == secondHandAsInt) {
    result = 3
  }
  return result;
}

// Determines which hand with a high card is the winner.
function highCardResult (result) {
  // alert('high card values is ' + highCardValue[0] + ' ' + highCardValue[1])
  var firstHandAsInt = denomToInteger(highCardValue[0])
  var secondHandAsInt = denomToInteger(highCardValue[1])
  if (firstHandAsInt > secondHandAsInt) {
    result = 1
    // alert('The first hand is stronger with ' + firstHandAsInt + ' than ' + secondHandAsInt)
  } else if (firstHandAsInt < secondHandAsInt) {
    result = 2
    // alert('The second hand is stronger with ' + secondHandAsInt + ' than ' + firstHandAsInt)
  } else if (firstHandAsInt == secondHandAsInt) {
    result = 3
    // alert('The first hand and second hand are equal with ' + firstHandAsInt + ' and ' + secondHandAsInt)
  }
  return result
}

function getHandDecision (hand) {
  // Splits cards into pairs in the form of 2 characters. 
  var pairOfCards = hand.split(' ')
  var cardsObject = getCardObject()
  var handDecision
  for (var i = 0; i < pairOfCards.length; i++) {
    // Gets the denomination for that individual character of that pair - pairOfCards[i][0]
    var getDenomination = cardsObject.cards.filter(function (obj) {
      return obj.name === pairOfCards[i][0]
    })

    // Gets the suit for that individual character of that pair - pairOfCards[i][1]
    var getSuit = cardsObject.suits.filter(function (obj) {
      return obj.name === pairOfCards[i][1]
    })

    // Overwrite key with count (REPEAT THIS PROCESS 5X, WHY?). Maybe bcos we're doing for this for both suits and denoms. Consider separating it
    // Now that we know the denomination, update it's appearance count.
    getDenomination[0].count = count(hand, pairOfCards[i][0])

    // Now that we know what suit it is, update it's appearance count.
    getSuit[0].count = count(hand, pairOfCards[i][1])
  }

  handDecision = determineHand(cardsObject)
  
  return handDecision
}

// Implementation taken from here: https://stackoverflow.com/a/28191966/8033866
function getKeyByValue (object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

function sequenceCheck (denomArray) {
  // denomArray.sort(function(a, b){return a - b})
  var inSequence = []
  // Don't need to worry about how they are orgnaised.
  // The object is already in order, our job is to check whether the ones equal to 1 have a diff of 1 or not.
  for (var i = 0; i < denomArray.length - 1; ++i) {
    var nextValue
    var currentValue
    denomArray[i + 1].name - denomArray[i].name
    // Add case here for T, Q, K, J, A
    if (count('TJQKA', denomArray[i].name) == 1 && count('TQKJA', denomArray[i + 1].name) == 1) {
      nextValue = denomToInteger(denomArray[i + 1].name)
      currentValue = denomToInteger(denomArray[i].name)
    } else if (count('TJQKA', denomArray[i + 1].name) == 1) {
      nextValue = denomToInteger(denomArray[i + 1].name)
      currentValue = denomArray[i].name
    } else {
      nextValue = denomArray[i + 1].name
      currentValue = denomArray[i].name
    }
    var diff = nextValue - currentValue
    if (diff == 1) {
      // We'll then check the length of this
      inSequence.push(denomArray[i])
    }
  }
  return inSequence.length
}

function denomToInteger (denomination) {
  // Case where denomination is already a integer
  var denomAsInt = denomination
  switch (denomination) {
    case 'T':
      denomAsInt = 10
      break
    case 'J':
      denomAsInt = 11
      break
    case 'Q':
      denomAsInt = 12
      break
    case 'K':
      denomAsInt = 13
      break
    case 'A':
      denomAsInt = 14
      break
  }
  return denomAsInt
}

function determineHand (cardsObject) {
  var handDecision
  // Returns the suit that appears 5 times, if there is one.
  var suitFlush = cardsObject.suits.filter(function (obj) {
    return obj.count === 5
  })

  // Selectively stores only the royal denominations
  var highestHand = cardsObject.cards.filter(function (obj) {
    return (obj.name === 'T') && (obj.count === 1) ||
      (obj.name === 'J') && (obj.count === 1) ||
      (obj.name === 'Q') && (obj.count === 1) ||
      (obj.name === 'K') && (obj.count === 1) ||
      (obj.name === 'A') && (obj.count === 1)
  })

  // Returns all denominations that have appeared at least once.
  var denominationAppearanceCount = cardsObject.cards.filter(function (obj) {
    return obj.count >= 1
  })

  // Returns denominations that have appeared four times (e.g. 2s 3h 3s 3c 3d)
  var fourOfAKind = cardsObject.cards.filter(function (obj) {
    return obj.count === 4
  })

  // Returns one denominations that has appeared more than 4 times, which should never be the case  (e.g. AS, AD, AH, AC, A?)
  var denom4 = cardsObject.cards.filter(function (obj) {
    return (obj.count > 4)
  })

  // Returns one denominations that has appeared 3 times 
  var denomEquals3 = cardsObject.cards.filter(function (obj) {
    return (obj.count === 3)
  })

  // Returns one denominations that has appeared twice
  var denomEquals2 = cardsObject.cards.filter(function (obj) {
    return (obj.count === 2)
  })

  // Returns denominations that have only appeared once
  var denomEquals1 = cardsObject.cards.filter(function (obj) {
    return (obj.count === 1)
  })

  // // Returns one denominations that has appeared 3 times, and another twice (e.g. 2s 2h 3s 3c 3d)
  var fullHouse = denomEquals3.length == 1 && denomEquals2.length == 1
  // Returns denominations that has appeared 3 times, and two others that have appeared once (e.g. 4s 2h 3s 3c 3d)
  var threeOfAKind = denomEquals3.length == 1 && denomEquals1.length == 2
  // Returns denominations that has appeared twice for 2 pairs. once (e.g. 2s 2h 3s 3c 5d)
  var twoPairs = denomEquals2.length == 2
  // Returns denominations that has appeared twice for a single pair. once (e.g. 2s 2h 3s 4c 8d)
  var pair = denomEquals2.length == 1
  // Checks if the 5 highest denominations are present, and that they're of the same suit (e.g. Ts Js Qs Ks As)
  var royalFlush = highestHand.length == 5 && suitFlush.length == 1

  // alert('denomination is ' + JSON.stringify(denominationAppearanceCount))
  var sequenceCount = sequenceCheck(denominationAppearanceCount)
  // That one result should be that single suit.
  var inSameSuit = suitFlush.length === 1
  // flushDecision(sequenceCount, inSameSuit, royalFlush)
  // alert('denomination in sequence is ' + JSON.stringify(sequenceCount))

  if (sequenceCount == 4) {
    if (inSameSuit) {
      if (royalFlush) {
        // Royal Flush (e.g. Ts Js Qs Ks As)
        handDecision = 'Royal Flush'
        // alert('The result is a Royal flush ' + JSON.stringify(highestHand) + '<br/>' + JSON.stringify(suitFlush))
      } else {
        // Straight Flush (e.g. 2s 3s 4s 5s 6s)
        handDecision = 'Straight Flush'
        // alert('The result is a Straight Flush ')
      }
    } else {
      // Straight (e.g. 2s 3d 4h 5c 6d)
      handDecision = 'Straight'
      // alert('The result is a Straight!')
    }
  } else {
    // Flush (e.g. Ks 5s 9s 2s 3s)
    if (inSameSuit) {
      handDecision = 'Flush'
      // alert('The result is a Flush with ' + suitFlush[0].name)
    } else {
      // Returns denominations that have only appeared once, but in reverse order so highest card starts first.
      if (denomEquals1.length != 0 && !inSameSuit && fourOfAKind.length == 0 && !threeOfAKind && !twoPairs && !pair) {
        // Needs a bit more work
        var reverseDenom = denomEquals1.reverse()
        // Take the first result which is the highest denomination
        var highCard = reverseDenom[0].count == 1
        highCardValue.push(reverseDenom[0].name)
      }
    }
  }

  if (fourOfAKind != null && fourOfAKind.length != 0) {
    handDecision = 'Four of a Kind'
    // alert('The result is a Four Of a Kind with ' + fourOfAKind[0].name)
  } else if (fullHouse != null && fullHouse) {
    handDecision = 'Full House'
    // alert('The result is a Full House with ' + denomEquals3[0].name + ' and ' + denomEquals2[0].name)
  } else if (threeOfAKind != null && threeOfAKind) {
    handDecision = 'Three of a Kind'
    // alert('The result is a threeOfAKind with ' + denomEquals3[0].name + ' and ' + denomEquals1[0].name + ' and ' + denomEquals1[1].name)
  } else if (twoPairs != null && twoPairs) {
    handDecision = 'Two Pairs'
    // alert('The result is a Two Pairs with ' + denomEquals2[0].name + ' and ' + denomEquals2[1].name)
  } else if (pair != null && pair) {
    handDecision = 'Pair'
    // alert('The result is a Pair with ' + denomEquals2[0].name)
  } else if (highCard != null && highCard) {
    handDecision = 'High Card'
    // alert('The result is a High Card with ' + reverseDenom[0].name)
  }
  return handDecision
}

// Here is where we assign each hand an integer to weigh which hand is the best
function handToInteger (hand) {
  var handAsInteger = 0
  switch (hand) {
    case 'Royal Flush':
      handAsInteger = 10
      break
    case 'Straight Flush':
      handAsInteger = 9
      break
    case 'Four of a Kind':
      handAsInteger = 8
      break
    case 'Full House':
      handAsInteger = 7
      break
    case 'Flush':
      handAsInteger = 6
      break
    case 'Straight':
      handAsInteger = 5
      break
    case 'Three of a Kind':
      handAsInteger = 4
      break
    case 'Two Pairs':
      handAsInteger = 3
      break
    case 'Pair':
      handAsInteger = 2
      break
    case 'High Card':
      handAsInteger = 1
      break
  }
  return handAsInteger
}

function getCardObject () {
  return {
    cards: [
      {
        'name': '2',
        'count': 0
      },
      {
        'name': '3',
        'count': 0
      },
      {
        'name': '4',
        'count': 0
      },
      {
        'name': '5',
        'count': 0
      },
      {
        'name': '6',
        'count': 0
      },
      {
        'name': '7',
        'count': 0
      },
      {
        'name': '8',
        'count': 0
      },
      {
        'name': '9',
        'count': 0
      },
      {
        'name': 'T',
        'count': 0
      },
      {
        'name': 'J',
        'count': 0
      },
      {
        'name': 'Q',
        'count': 0
      },
      {
        'name': 'K',
        'count': 0
      },
      {
        'name': 'A',
        'count': 0
      }
    ],
    suits: [
      {
        'name': 'S',
        'count': 0
      },
      {
        'name': 'D',
        'count': 0
      },
      {
        'name': 'H',
        'count': 0
      },
      {
        'name': 'C',
        'count': 0
      }
    ]
  }
}

// function checkHand () {
// Check the number of spaces is equal to 4
// Split between spaces and store in array
// Check the number of letters in array is equal to 10
// For loop on that split
// Check if first value is any of these denominations then continue: 
// `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce) 
// Do the same but with the suits : `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)
// At any point if it fails, show message that the format of the hand is incorrect.
// Validation complete.

// Check if denom is a number then add to Array, re-order integers. Check if diff is 1 or -1, then you gots a sequence. //Store count of the number of denoms that are in a sequence
// If denom is a symbol other than T or Ace(?), store integer count for that denom.
// integer for counts of suits.
