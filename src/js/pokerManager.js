var highCardValue = [];

function PokerHand(hand) {
    this.hand = hand;
}

PokerHand.prototype.compareWith = function (secondHand) {
    alert(this.hand);
    alert(secondHand);
    var result = 0;
    var firstHandDecision = WinAndSplit(this.hand);
    var secondHandDecision = WinAndSplit(secondHand);
    if (firstHandDecision != null && secondHandDecision != null) {
        alert("Decision is " + firstHandDecision);
        alert("Decision is " + secondHandDecision);
        if (highCardValue.length == 2) {
            alert(JSON.stringify("Before, high card is " + highCardValue));
            // What happens when it's below T? W
            var firstHandAsInt = denomToInteger(highCardValue[0]);
            var secondHandAsInt = denomToInteger(highCardValue[1]);
            if (firstHandAsInt > secondHandAsInt) {
                result = 1;
                alert("The first hand is stronger with " + firstHandAsInt + " than " + secondHandAsInt);
            } else if (firstHandAsInt < secondHandAsInt) {
                result = 2;
                alert("The second hand is stronger with " + secondHandAsInt + " than " + firstHandAsInt);
            } else if (firstHandAsInt == secondHandAsInt) {
                result = 3;
                alert("The first hand and second hand are equal with " + firstHandAsInt + " and " + secondHandAsInt);
            }
            // Clear array
            highCardValue.length = 0;
            alert(JSON.stringify("After, high card is " + highCardValue));
            return;
        } else if (highCardValue.length == 1) {
            highCardValue.length = 0;
            alert(JSON.stringify("After length is 1, high card is " + highCardValue));

        }
        var firstHandAsInt = handToInteger(firstHandDecision);
        var secondHandAsInt = handToInteger(secondHandDecision);
        alert("Decision as int is " + firstHandAsInt);
        alert("Decision as int is " + secondHandAsInt);
        if (firstHandAsInt > secondHandAsInt) {
            result = 1;
            alert("The first hand is stronger with " + firstHandDecision + " than " + secondHandDecision);
        } else if (firstHandAsInt < secondHandAsInt) {
            result = 2;
            alert("The second hand is stronger with " + secondHandDecision + " than " + firstHandDecision);
        } else if (firstHandAsInt == secondHandAsInt) {
            result = 3;
            alert("The first hand and second hand are equal with " + firstHandDecision + " and " + secondHandDecision);
        }
    }
    // if (secondHandDecision != null) {
    //     alert("Decision is " + secondHandDecision);
    // }
};

function checkHand(firstHand, secondHand) {
    var pokerHand = new PokerHand(firstHand);
    // pokerHand.compareWith(secondHand);
    if (validateHand(firstHand) && validateHand(secondHand)) {
        alert("Card is valid!");
        pokerHand.compareWith(secondHand);
    }
    var neighbor = /neighbou?r/;
    console.log(neighbor.test("neighbour"));
    // → true
    console.log(neighbor.test("neighbor"));
    // → true
}

function validateHand(hand) {
    // Returns count of number of spaces
    var isValidated = false;
    var spaces = count(hand, " ");
    if (spaces == 4) {
        // Splits cards accordingly by the space, stores the 5 seperate cards.
        var pairOfCards = hand.split(" ");
        // Now checks if 5 cards have been entered correctly, using two characters for each card.
        if (hand.length - 4 == 10) {
            var validCardsCount = 0;
            var validSuitCount = 0;
            for (var i = 0; i < pairOfCards.length; i++) {
                // The final hurdle now is just to see if the user has entered in a valid value/suit.
                validCardsCount = validCardsCount + count("23456789TJQKA", pairOfCards[i][0].toString());
                validSuitCount = validSuitCount + count("SHDC", pairOfCards[i][1].toString());
                // alert("Valid cards count " + validCardsCount);
                // alert("Valid suit count " + validSuitCount);
                // Forces user to type the correct values in for each card
                if (validCardsCount == 5 && validSuitCount == 5) {
                    // alert("Valid cards count " + validCardsCount);
                    // alert("Valid suit count " + validSuitCount);
                    isValidated = true;
                    // On the last loop, show the error message
                } else if (i == pairOfCards.length - 1) {
                    // alert("Loop iteration is  " + i);
                    sweetAlert("Oops...", "One or more of your cards doesn't exist. Please ensure the combination is possible first", "error");
                    isValidated = false;
                }
            }
        } else {
            sweetAlert("Oops...", "Please use two characters for each of the 5 cards entered (e.g. 2S, 8D, JH..) ", "error");
            isValidated = false;
        }
    } else {
        sweetAlert("Oops...", "Please enter 5 cards separated by a space", "error");
        isValidated = false;
    }
    return isValidated;
}

// Returns count of the number of occurances of a suit/denomination.
// Won't work, no way of knowing which character
// IF(count("2S 4H 6D QC", pass in "C") == 1
function count(string, char) {
    var re = new RegExp(char, "gi");
    var occurances;
    if (string.match(re) == null) {
        occurances = 0;
    } else {
        //  alert("string normal occur " + string.match(re))
        occurances = string.match(re).length;
    }
    return occurances;
}

// Returns count of the number of occurances of a card to check for duplicates.
function countApperances(string, string2) {
    var re = new RegExp(string2, "gi");
    var occurances;
    if (string.match(re) == null) {
        occurances = 0;
    } else {
        occurances = string.match(re).length;
    }
    return occurances;
}


function WinAndSplit(hand) {
    //Splits cards into pairs in the form of 2 characters. 
    var pairOfCards = hand.split(" ");
    var duplicatesPresent = false;
    var cardsObject = getCardObject();
    var handDecision;
    for (var i = 0; i < pairOfCards.length; i++) {
        //  
        // if a card is duplicated in a hand, raise flag
        if (countApperances(hand, pairOfCards[i]) > 1) {
            duplicatesPresent = true;
        }
        // Gets the denomination for that individual character of that pair - pairOfCards[i][0];
        var getDenomination = cardsObject.cards.filter(function (obj) {
            return obj.name === pairOfCards[i][0];
        });

        // Gets the suit for that individual character of that pair - pairOfCards[i][1];
        var getSuit = cardsObject.suits.filter(function (obj) {
            return obj.name === pairOfCards[i][1];
        });



        // Overwrite key with count (REPEAT THIS PROCESS 5X, WHY?). Maybe bcos we're doing for this for both suits and denoms. Consider separating it
        // Now that we know the denomination, update it's appearance count.
        getDenomination[0].count = count(hand, pairOfCards[i][0]);

        // Now that we know what suit it is, update it's appearance count.
        getSuit[0].count = count(hand, pairOfCards[i][1]);

    }

    // alert("DUPLICATE PRESENT " + duplicatesPresent);
    if (!duplicatesPresent) {
        handDecision = determineHand(cardsObject);
        // Here we can determine the type of hand we now have, for an example let's try and find our Flush


    } else {
        sweetAlert("Oops...", "Please remove any duplicate cards", "error");
    }
    return handDecision;
}


// Implementation taken from here: https://stackoverflow.com/a/28191966/8033866
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function sequenceCheck(denomArray) {
    // denomArray.sort(function(a, b){return a - b});
    var inSequence = []
    // Don't need to worry about how they are orgnaised.
    // The object is already in order, our job is to check whether the ones equal to 1 have a diff of 1 or not.
    for (var i = 0; i < denomArray.length - 1; ++i) {
        var nextValue;
        var currentValue;
        denomArray[i + 1].name - denomArray[i].name;
        // Add case here for T, Q, K, J, A
        if (count("TJQKA", denomArray[i].name) == 1 && count("TQKJA", denomArray[i + 1].name) == 1) {
            nextValue = denomToInteger(denomArray[i + 1].name);
            currentValue = denomToInteger(denomArray[i].name);
        } else if (count("TJQKA", denomArray[i + 1].name) == 1) {
            nextValue = denomToInteger(denomArray[i + 1].name);
            currentValue = denomArray[i].name;
        } else {
            nextValue = denomArray[i + 1].name;
            currentValue = denomArray[i].name;
        }
        var diff = nextValue - currentValue;
        if (diff == 1) {
            // We'll then check the length of this
            inSequence.push(denomArray[i]);
        }
        // alert(" next value " + nextValue + " current value " + currentValue + " diff " + diff);
    }
    // alert("Sequence length " + inSequence.length);
    // return inSequence;
    return inSequence.length;
}

function flushDecision(sequenceCount, inSameSuit, royalFlush) {
    // All cards have to be in sequence

}

function denomToInteger(denomination) {
    // Case where denomination is already a integer
    var denomAsInt = denomination;
    switch (denomination) {
        case "T":
            denomAsInt = 10;
            break;
        case "J":
            denomAsInt = 11;
            break;
        case "Q":
            denomAsInt = 12;
            break;
        case "K":
            denomAsInt = 13;
            break;
        case "A":
            denomAsInt = 14;
            break;
    }
    return denomAsInt;
}

function determineHand(cardsObject) {
    var handDecision;
    // Returns the suit that appears 5 times, if there is one.
    var suitFlush = cardsObject.suits.filter(function (obj) {
        return obj.count === 5;
    });

// Selectively stores only the royal denominations
    var highestHand = cardsObject.cards.filter(function (obj) {
        // alert("case is " + obj.name + " " + 
        // (obj.name === "T") && (obj.count === 1) || (obj.name === "J") && (obj.count === 1) || (obj.name === "Q") && (obj.count === 1) || 
        // (obj.name === "K") && (obj.count === 1) || (obj.name === "A") && (obj.count === 1) + " "
        // );
        return (obj.name === "T") && (obj.count === 1) ||
                (obj.name === "J") && (obj.count === 1) ||
                (obj.name === "Q") && (obj.count === 1) ||
                (obj.name === "K") && (obj.count === 1) ||
                (obj.name === "A") && (obj.count === 1);
    });



// Returns all denominations that have appeared at least once.
    var denominationAppearanceCount = cardsObject.cards.filter(function (obj) {
        return obj.count >= 1;
    });

// Returns denominations that have appeared four times (e.g. 2s 3h 3s 3c 3d)
    var fourOfAKind = cardsObject.cards.filter(function (obj) {
        return obj.count === 4;
    });

// Returns one denominations that has appeared more than 4 times, which should never be the case  (e.g. AS, AD, AH, AC, A?)
    var denom4 = cardsObject.cards.filter(function (obj) {
        return (obj.count > 4);
    });



// Returns one denominations that has appeared 3 times 
    var denomEquals3 = cardsObject.cards.filter(function (obj) {
        return (obj.count === 3);
    });

// Returns one denominations that has appeared twice
    var denomEquals2 = cardsObject.cards.filter(function (obj) {
        return (obj.count === 2);
    });

// Returns denominations that have only appeared once
    var denomEquals1 = cardsObject.cards.filter(function (obj) {
        return (obj.count === 1);
    });




// // Returns one denominations that has appeared 3 times, and another twice (e.g. 2s 2h 3s 3c 3d)
    var fullHouse = denomEquals3.length == 1 && denomEquals2.length == 1;
// Returns denominations that has appeared 3 times, and two others that have appeared once (e.g. 4s 2h 3s 3c 3d)
    var threeOfAKind = denomEquals3.length == 1 && denomEquals1.length == 2;
// Returns denominations that has appeared twice for 2 pairs. once (e.g. 2s 2h 3s 3c 5d)
    var twoPairs = denomEquals2.length == 2;
// Returns denominations that has appeared twice for a single pair. once (e.g. 2s 2h 3s 4c 8d)
    var pair = denomEquals2.length == 1;
// Checks if the 5 highest denominations are present, and that they're of the same suit (e.g. Ts Js Qs Ks As)
    var royalFlush = highestHand.length == 5 && suitFlush.length == 1;


    alert("denomination is " + JSON.stringify(denominationAppearanceCount));
    var sequenceCount = sequenceCheck(denominationAppearanceCount);
// That one result should be that single suit.
    var inSameSuit = suitFlush.length === 1;
    // flushDecision(sequenceCount, inSameSuit, royalFlush);
    alert("denomination in sequence is " + JSON.stringify(sequenceCount));

    if (sequenceCount == 4) {
        if (inSameSuit) {
            if (royalFlush) {
                // Royal Flush (e.g. Ts Js Qs Ks As)
                handDecision = "Royal Flush";
                alert("The result is a Royal flush " + JSON.stringify(highestHand) + "<br/>" + JSON.stringify(suitFlush));
            } else {
                // Straight Flush (e.g. 2s 3s 4s 5s 6s)
                handDecision = "Straight Flush";
                alert("The result is a Straight Flush ");

            }
        } else {
            // Straight (e.g. 2s 3d 4h 5c 6d)
            handDecision = "Straight";
            alert("The result is a Straight!");
        }
    } else {
        // Flush (e.g. Ks 5s 9s 2s 3s)
        if (inSameSuit) {
            handDecision = "Flush";
            alert("The result is a Flush with " + suitFlush[0].name);
        } else {
            // Returns denominations that have only appeared once, but in reverse order so highest card starts first.
            if (denomEquals1.length != 0) {
                var reverseDenom = denomEquals1.reverse();
            // Take the first result which is the highest denomination
                var highCard = reverseDenom[0].count == 1;
                highCardValue.push(reverseDenom[0].name);
            }
        }
    }

// if (suitFlush != null && suitFlush.length != 0) {
//   handDecision = "Flush";
//     alert("The result is a Flush with " + suitFlush[0].name);
    if (fourOfAKind != null && fourOfAKind.length != 0) {
        handDecision = "Four of a Kind";
        alert("The result is a Four Of a Kind with " + fourOfAKind[0].name);
    } else if (fullHouse != null && fullHouse) {
        handDecision = "Full House";
        alert("The result is a Full House with " + denomEquals3[0].name + " and " + denomEquals2[0].name);
    } else if (threeOfAKind != null && threeOfAKind) {
        handDecision = "Three of a Kind";
        alert("The result is a threeOfAKind with " + denomEquals3[0].name + " and " + denomEquals1[0].name + " and " + denomEquals1[1].name);
    } else if (twoPairs != null && twoPairs) {
        handDecision = "Two Pairs";
        alert("The result is a Two Pairs with " + denomEquals2[0].name + " and " + denomEquals2[1].name);
    } else if (pair != null && pair) {
        handDecision = "Pair";
        alert("The result is a Pair with " + denomEquals2[0].name);
    } else if (highCard != null && highCard) {
        handDecision = "High Card";
        alert("The result is a High Card with " + reverseDenom[0].name);
    }
    return handDecision;
}

// Here is where we assign each hand an integer to weigh which hand is the best
function handToInteger(hand) {
    var handAsInteger = 0;
    switch (hand) {
        case "Royal Flush":
            handAsInteger = 10;
            break;
        case "Straight Flush":
            handAsInteger = 9;
            break;
        case "Four of a Kind":
            handAsInteger = 8;
            break;
        case "Full House":
            handAsInteger = 7;
            break;
        case "Flush":
            handAsInteger = 6;
            break;
        case "Straight":
            handAsInteger = 5;
            break;
        case "Three of a Kind":
            handAsInteger = 4;
            break;
        case "Two Pairs":
            handAsInteger = 3;
            break;
        case "Pair":
            handAsInteger = 2;
            break;
        case "High Card":
            handAsInteger = 1;
            break;
    }
    return handAsInteger;
}

function getCardObject() {
    return {
        cards:
                [
                    {
                        "name": "2",
                        "count": 0
                    },
                    {
                        "name": "3",
                        "count": 0
                    },
                    {
                        "name": "4",
                        "count": 0
                    },
                    {
                        "name": "5",
                        "count": 0
                    },
                    {
                        "name": "6",
                        "count": 0
                    },
                    {
                        "name": "7",
                        "count": 0
                    },
                    {
                        "name": "8",
                        "count": 0
                    },
                    {
                        "name": "9",
                        "count": 0
                    },
                    {
                        "name": "T",
                        "count": 0
                    },
                    {
                        "name": "J",
                        "count": 0
                    },
                    {
                        "name": "Q",
                        "count": 0
                    },
                    {
                        "name": "K",
                        "count": 0
                    },
                    {
                        "name": "A",
                        "count": 0
                    },
                ],
        suits:
                [
                    {
                        "name": "S",
                        "count": 0
                    },
                    {
                        "name": "D",
                        "count": 0
                    },
                    {
                        "name": "H",
                        "count": 0
                    },
                    {
                        "name": "C",
                        "count": 0
                    },
                ]
    };
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

//BASICALLY, every value has it's own integer count e.g. int countFor7, int countFor4
// Same is true for J, Q and A(?)


//Here is the final part.
// We now check if what type of hand they have
// if(str.includes(TS) & str.includes(KS) & str.includes(QS) & str.includes(AS)) = Royal Flush
// if(numbersInSequence = 5) 
// ..if(spadesCount = 5 || heartsCount = 5 || diamondsCount = 5 || clubsCount = 5) = Straight Flush 
// ..else = Straight
// if(countFor10 = 4 || countFor2 = 4 || countFor3 = 4....) = Four of a Kind
// if(countsFor4 = 3 || countsFor3 = 3 || countsFor2 = 3)
// .. if(countsFor4 = 2 || countsFor3 = 2 || countsFor 2 = 2) = Full House
// .. else = Three Of a Kind

//If (getDenom[0].count == 1 && getDenom[1].count = 1 && getDenom[2].count = 1 && getDenom[3].count = 1 && getDenom[4].count = 1)
//else If (getDenom[1].count == 1 && getDenom[2].count = 1 && getDenom[3].count = 1 && getDenom[4].count = 1 && getDenom[5].count = 1)
//else If (getDenom[2].count == 1 && getDenom[3].count = 1 && getDenom[4].count = 1 && getDenom[5].count = 1 && getDenom[6].count = 1)
//else If (getDenom[3].count == 1 && getDenom[4].count = 1 && getDenom[5].count = 1 && getDenom[6].count = 1 && getDenom[7].count = 1)
//else If (getDenom[4].count == 1 && getDenom[5].count = 1 && getDenom[6].count = 1 && getDenom[7].count = 1 && getDenom[8].count = 1)
//else If (getDenom[5].count == 1 && getDenom[6].count = 1 && getDenom[7].count = 1 && getDenom[8].count = 1 && getDenom[9].count = 1)
//else If (getDenom[6].count == 1 && getDenom[7].count = 1 && getDenom[8].count = 1 && getDenom[9].count = 1 && getDenom[10].count = 1)

// Sequence stuff:
// var filteredDenom = filter(getDenom.count, 1)
// if filteredDenom has stored 5 denoms equal to 1, do :
//  for (var i = 0; i < getDenom.length; i++) {
//    cugetDenom[i].name =
//  }
//}
// }