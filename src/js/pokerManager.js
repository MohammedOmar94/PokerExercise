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

// Stores high card values in array, temp solution until everything is fully tested.
var highCardValue = []

function PokerHand(hand) {
    this.hand = hand
}

PokerHand.prototype.compareWith = function (secondHand) {
    var result = 0
    // Array that will contain the results to display to the user.
    var decision;
    // Clears global variable.
    highCardValue.length = 0;
    // Stores the results for each hand.
    var firstHandDecision = getHandDecision(this.hand)
    var secondHandDecision = getHandDecision(secondHand)
    if (firstHandDecision != null && secondHandDecision != null) {
        // If we're dealing with 2 high cards, we need to determine which high card is stronger first.
        if (highCardValue.length == 2) {
            result = highCardResult(result)
            highCardValue.length = 0
            decision = [firstHandDecision, secondHandDecision, result]
            return decision
        } else {
            // Stores 1 (Win), 2 (Loss) or 3 (Draw) depending on the type of hands used.
            result = winningHandResult(firstHandDecision, secondHandDecision, result)
            decision = [firstHandDecision, secondHandDecision, result]
            // Returns array with all result info to display to user.
            return decision
        }
    }
}

// Starting point once the user has entered in 2 hands and has clicked check.
function checkHand(firstHand, secondHand) {
    // Makes sure both hands are valid before proceeding.
    if (validateHand(firstHand) && validateHand(secondHand)) {
        // Creates PokerHand object with the first hand.
        var pokerHand = new PokerHand(firstHand)
        // Retrieves the results information to display to the user.
        // This includes what poker hand each user gave, and the overall result.
        var decision = pokerHand.compareWith(secondHand)
        // Strings containing the name of the poker hand.
        var firstHandDecision = decision[0];
        var secondHandDecision = decision[1];
        // Integer containing the overall result. 1 (Win), 2 (Loss), or 3 (Draw).
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

// Validates user's input for a number of scenarios, returns a boolean.
function validateHand(hand) {
    var isValid = false
    // Returns count of number of spaces
    var spaces = count(hand, ' ')
    // Each card should be separated by a space, making the total no. of spaces equal to 4.
    if (spaces == 4) {
        // Splits cards accordingly by space, then stores the 5 seperate cards into an array.
        var pairOfCards = hand.split(' ')
        // Now checks if the hand meets the total character count, ignoring the 4 spaces. 
        if (hand.length - spaces == 10) {
            var validDenomCount = 0
            var validSuitCount = 0
            // Loops through each card to validate further.
            for (var i = 0; i < pairOfCards.length; i++) {
                // Checks if any duplicate cards are present within the hand.
                if (countApperances(hand, pairOfCards[i]) > 1) {
                    sweetAlert('Oops...', 'Please remove any duplicate cards', 'warning')
                    return false
                }
                // Scenario where someone types in just 1 or 3 characters for a card (e.g. 2 SAH 6D).
                if (pairOfCards[i].length > 2 || pairOfCards[i].length < 2) {
                    sweetAlert('Oops...', "Each card must be comprised of only 2 characters (e.g. 2S AH 6D)", 'warning')
                    return false;
                }
                // The final hurdle now is just to see if the user has entered in a valid denomination/suit using a regexp.
                // pairOfCards[i][0] is the denomination of the card.
                validDenomCount = validDenomCount + count('23456789TJQKA', pairOfCards[i][0].toString())
                // pairOfCards[i][i] is the suit of the card.
                validSuitCount = validSuitCount + count('SHDC', pairOfCards[i][1].toString())


                if (validDenomCount == 5 && validSuitCount == 5) {
                    isValid = true
                } else if (i == pairOfCards.length - 1) {
                    // On the last loop, show the error message for the case when at least one character is not valid.
                    sweetAlert('Oops...', "One or more of your cards doesn't exist. Please ensure the combination is possible first", 'warning')
                    isValid = false
                }
            }
        }
    } else {
        sweetAlert('Oops...', 'Please enter 5 cards separated by a space', 'warning')
        isValid = false
    }
    return isValid
}

// Returns count of the number of occurances of a suit/denomination.
function count(string, char) {
    var re = new RegExp(char, 'gi')
    var occurances
    if (string.match(re) == null) {
        occurances = 0
    } else {
        occurances = string.match(re).length
    }
    return occurances
}

// Returns count of the number of occurances of a card to check for duplicates.
function countApperances(hand, card) {
    var re = new RegExp(card, 'gi')
    var occurances
    if (hand.match(re) == null) {
        occurances = 0
    } else {
        occurances = hand.match(re).length
    }
    return occurances
}

// Compares poker hands and determines whether the first hand has won or lost.
function winningHandResult(firstHandDecision, secondHandDecision, result) {
    // In order to compare each poker hand, assign and return an integer to each hand.
    var firstHandAsInt = handToInteger(firstHandDecision)
    var secondHandAsInt = handToInteger(secondHandDecision)
    if (firstHandAsInt > secondHandAsInt) {
        result = 1
    } else if (firstHandAsInt < secondHandAsInt) {
        result = 2
    } else if (firstHandAsInt == secondHandAsInt) {
        result = 3
    }
    return result;
}

// Determines which high card is stronger.
function highCardResult(result) {
    // In order to compare each high card, assign and return an integer to each hand.
    // This is done in the instance where the denom is a T(en), J(ack), Q(ueen), K(ing) and A(ce).
    var firstHandAsInt = denomToInteger(highCardValue[0])
    var secondHandAsInt = denomToInteger(highCardValue[1])
    if (firstHandAsInt > secondHandAsInt) {
        result = 1
    } else if (firstHandAsInt < secondHandAsInt) {
        result = 2
    } else if (firstHandAsInt == secondHandAsInt) {
        result = 3
    }
    return result
}

function getHandDecision(hand) {
    // Splits cards accordingly by space, then stores the 5 seperate cards into an array.
    var pairOfCards = hand.split(' ')
    // Gets object containing the names and appearances count for each denomination and suit.
    var cardsObject = getCardObject()
    var handDecision
    for (var i = 0; i < pairOfCards.length; i++) {
        // pairOfCards[i][0] - Gets the denomination of current card.
        var getDenomination = cardsObject.denominations.filter(function (obj) {
            return obj.name === pairOfCards[i][0]
        })

        // pairOfCards[i][1] - Gets suit of current card.
        var getSuit = cardsObject.suits.filter(function (obj) {
            return obj.name === pairOfCards[i][1]
        })

        // Now that we know the denomination, update it's appearance count.
        getDenomination[0].count = count(hand, pairOfCards[i][0])

        // Now that we know the suit, update it's appearance count.
        getSuit[0].count = count(hand, pairOfCards[i][1])
    }
    // Stores string result of what poker hand was given.
    handDecision = determineHand(cardsObject)

    return handDecision
}

// Checks if the denomination follows a sequence.
function sequenceCheck(denomArray) {
    var inSequence = []
    // As we have already created the card object, we don't need to worry about how they are orgnaised.
    // The object is already in order by default (yay!), so our job is just to check whether the cards that have
    // appeared (where the count is equal to 1) has a difference of 1 or not (which means a sequence is happening!).
    for (var i = 0; i < denomArray.length - 1; ++i) {
        var nextValue
        var currentValue
        // If the current or next denomination is a T(en), J(ack), Q(ueen), K(ing), or A(ce)...
        if (count('TJQKA', denomArray[i].name) == 1 && count('TJQKA', denomArray[i + 1].name) == 1) {
            // Convert denominations to an integer.
            nextValue = denomToInteger(denomArray[i + 1].name)
            currentValue = denomToInteger(denomArray[i].name)
            // If only the next denomination is T(en)...
        } else if (count('TJQKA', denomArray[i + 1].name) == 1) {
            // Convert it to an integer.
            nextValue = denomToInteger(denomArray[i + 1].name)
            currentValue = denomArray[i].name
            // Else for other denominations below T(en), just store the name as is.
        } else {
            // Here we don't need to worry about converting anything since below T(en), denominations are already integers.
            nextValue = denomArray[i + 1].name
            currentValue = denomArray[i].name
        }
        // Calculate difference between the two denominations.
        var diff = nextValue - currentValue
        // If it's equal to 1, it counts as a sequence
        if (diff == 1) {
            // Add it to the array to keep track of it.
            inSequence.push(denomArray[i])
        }
    }
    // Returning the length of the array, we know how many denominations followed a sequence.
    // We also know which denominations followed a sequence, so we can return the array itself if needed in the future!
    return inSequence.length
}

// Converts denominations such as T(en), J(ack), Q(ueen), K(ing) and A(ce) to integers.
function denomToInteger(denomination) {
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

// Here is the final step for finding out what the poker hand is.
function determineHand(cardsObject) {
    var handDecision
    // Returns suit that appears 5 times, if there is one.
    var suitFlush = cardsObject.suits.filter(function (obj) {
        return obj.count === 5
    })

    // Selectively stores only the royal denominations.
    var highestHand = cardsObject.denominations.filter(function (obj) {
        return (obj.name === 'T') && (obj.count === 1) ||
                (obj.name === 'J') && (obj.count === 1) ||
                (obj.name === 'Q') && (obj.count === 1) ||
                (obj.name === 'K') && (obj.count === 1) ||
                (obj.name === 'A') && (obj.count === 1)
    })

    // Returns all denominations that have appeared at least once.
    var denominationAppearanceCount = cardsObject.denominations.filter(function (obj) {
        return obj.count >= 1
    })

    // Returns a single denomination that has appeared four times (e.g. 2s 3h 3s 3c 3d).
    var fourOfAKind = cardsObject.denominations.filter(function (obj) {
        return obj.count === 4
    })

    // Returns a single denomination that has appeared 3 times.
    var denomCountEquals3 = cardsObject.denominations.filter(function (obj) {
        return (obj.count === 3)
    })

    // Returns a single denomination that has appeared twice.
    var denomCountEquals2 = cardsObject.denominations.filter(function (obj) {
        return (obj.count === 2)
    })

    // Returns a single denomination that have only appeared once.
    var denomCountEquals1 = cardsObject.denominations.filter(function (obj) {
        return (obj.count === 1)
    })

    // // Returns one denominations that has appeared 3 times, and another twice (e.g. 2s 2h 3s 3c 3d)
    var fullHouse = denomCountEquals3.length == 1 && denomCountEquals2.length == 1
    // Returns denominations that have appeared 3 times, and two others that have appeared once (e.g. 4s 2h 3s 3c 3d).
    var threeOfAKind = denomCountEquals3.length == 1 && denomCountEquals1.length == 2
    // Returns denominations that have appeared twice for 2 pairs. once (e.g. 2s 2h 3s 3c 5d).
    var twoPairs = denomCountEquals2.length == 2
    // Returns denominations that have appeared twice for a single pair  (e.g. 2s 2h 3s 4c 8d).
    var pair = denomCountEquals2.length == 1
    // Checks if the 5 highest denominations are present, and that they're of the same suit (e.g. Ts Js Qs Ks As)
    var royalFlush = highestHand.length == 5 && suitFlush.length == 1

    // Retrieves the total count of sequences.
    var sequenceCount = sequenceCheck(denominationAppearanceCount)
    // If a hand has a single suit, appearing 5 times.
    var inSameSuit = suitFlush.length === 1

    // If all numbers are in a sequence...
    if (sequenceCount == 4) {
        if (inSameSuit) {
            if (royalFlush) {
                // Royal Flush (e.g. Ts Js Qs Ks As)
                handDecision = 'Royal Flush'
            } else {
                // Straight Flush (e.g. 2s 3s 4s 5s 6s)
                handDecision = 'Straight Flush'
            }
        } else {
            // Straight (e.g. 2s 3d 4h 5c 6d)
            handDecision = 'Straight'
        }
    } else {
        if (inSameSuit) {
            // Flush (e.g. Ks 5s 9s 2s 3s)
            handDecision = 'Flush'
        } else {
            // Returns denominations that have only appeared once, but in reverse order so highest card starts first.
            if (denomCountEquals1.length != 0 && !inSameSuit && fourOfAKind.length == 0 && !threeOfAKind && !twoPairs && !pair) {
                var reverseDenom = denomCountEquals1.reverse()
                // Take the first result which is the highest denomination.
                var highCard = reverseDenom[0].count == 1
                // Store in global variable, used when comparing high cards.
                highCardValue.push(reverseDenom[0].name)
            }
        }
    }

    // Depending on what denominations it had earlier, one of the following conditions will be true.
    if (fourOfAKind != null && fourOfAKind.length != 0) {
        handDecision = 'Four of a Kind'
    } else if (fullHouse != null && fullHouse) {
        handDecision = 'Full House'
    } else if (threeOfAKind != null && threeOfAKind) {
        handDecision = 'Three of a Kind'
    } else if (twoPairs != null && twoPairs) {
        handDecision = 'Two Pairs'
    } else if (pair != null && pair) {
        handDecision = 'Pair'
    } else if (highCard != null && highCard) {
        handDecision = 'High Card'
    }
    return handDecision
}

// Here is where we assign each hand an integer to weigh which hand is the best
function handToInteger(hand) {
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

function getCardObject() {
    return {
        denominations: [
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
