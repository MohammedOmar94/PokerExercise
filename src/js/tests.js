// Werid error shows up without this, supposed cause is coming from Sweetalert.min.js
var previousActiveElement;


var royalFlush = new PokerHand("TS JS QS KS AS")
var straightFlush = new PokerHand("2S 3S 4S 5S 6S")
var fourOfAKind = new PokerHand("2S 2H 2D 2C 6S")
var fullHouse = new PokerHand("2S 2H 2D 6C 6S");
var flush = new PokerHand("2S 4S 6S 8S TS")
var straight = new PokerHand("2S 3S 4C 5H 6D")
var threeOfAKind = new PokerHand("2S 2H 2D 4C 6S")
var twoPairs = new PokerHand("2S 2H 4D 4C 6S")
var pair = new PokerHand("2S 2H 5D 4C 6S")
var highCard = new PokerHand("2S 8H 5D 4C 6S")
var lowerHighCard = new PokerHand("2S 7H 5D 4C 6S")

QUnit.test("Validating Hands", function (assert) {
    assert.ok(validateHand("2S 3S 4S 5S 6S"), "Hands in the correct format return true");
    assert.notOk(validateHand("2S 2S 2S 2S 2S"), "Duplicate cards return false");
    assert.notOk(validateHand("2S 2S 3S 4S 5S"), "A single duplicate card returns false");
    assert.notOk(validateHand("2S 3S 4S 5S6 S"), "Cards with only 1 or 3 characters returns false");
    assert.notOk(validateHand("2S 3S 4S 5S "), "Missing cards returns false");
    assert.notOk(validateHand("2S3S4S5S6S"), "Hands with no spaces at all returns false");
    assert.notOk(validateHand("2S3S 4S5S 6S"), "Multiple cards missing a space return false");
    assert.notOk(validateHand("2S3S 4S 5S 6S"), "Two cards missing a space return false");
    assert.notOk(validateHand("2S 3S 4S 5X 6S"), "Typing in suits that don't exist returns false");
    assert.notOk(validateHand("1SS 2S 3S 4S 5S"), "Typing in denominations that don't exist returns false");
});

QUnit.test("Determine Royal Flush", function (assert) {
    assert.equal(getHandDecision("TS JS QS KS AS"), "Royal Flush", "TS JS QS KS AS is a Royal Flush")
    assert.notEqual(getHandDecision("TD JC QS KH AS"), "Royal Flush", "TD JC QS KH AS is not a Royal Flush")
});

QUnit.test("Determine Straight Flush", function (assert) {
    assert.equal(getHandDecision("2S 3S 4S 5S 6S"), "Straight Flush", "2S 3S 4S 5S 6S is a Straight Flush")
    assert.equal(getHandDecision("6S 7S 8S 9S TS"), "Straight Flush", "6S 7S 8S 9S TS is a Straight Flush")
    assert.equal(getHandDecision("7S 8S 9S TS JS"), "Straight Flush", "7S 8S 9S TS JS is a Straight Flush")
    assert.equal(getHandDecision("9S TS JS QS KS"), "Straight Flush", "9S TS JS QS KS is a Straight Flush")
    assert.notEqual(getHandDecision("9S TC JS QS KS"), "Straight Flush", "9S TC JS QS KS is a not Straight Flush")
    assert.notEqual(getHandDecision("9S 9C JS QS KS"), "Straight Flush", "9S 9C JS QS KS is a not Straight Flush")
});

QUnit.test("Determine Four of a Kind", function (assert) {
    assert.equal(getHandDecision("2S 2H 2D 2C 6S"), "Four of a Kind", "2S 2H 2D 2C 6S is a Four of a Kind")
    assert.equal(getHandDecision("TS TH TD TC JS"), "Four of a Kind", "TS TH TD TC JS is a Four of a Kind")
    assert.equal(getHandDecision("JS JH JD JC QS"), "Four of a Kind", "JS JH JD JC QS is a Four of a Kind")
    assert.equal(getHandDecision("QS QH QD QC KS"), "Four of a Kind", "QS QH QD QC KS is a Four of a Kind")
    assert.equal(getHandDecision("KS KH KD KC AS"), "Four of a Kind", "KS KH KD KC AS is a Four of a Kind")
    assert.equal(getHandDecision("AS AH AD AC TS"), "Four of a Kind", "AS AH AD AC TS is a Four of a Kind")
    assert.notEqual(getHandDecision("2S 2H 2D AC 6S"), "Four of a Kind", "2S 2H 2D AC 6S is not a Four of a Kind")
    assert.notEqual(getHandDecision("2S 2H 2D AC AS"), "Four of a Kind", "2S 2H 2D AC AS is not a Four of a Kind")
});

QUnit.test("Determine Full House", function (assert) {
    assert.equal(getHandDecision("2S 2H 2D 6C 6S"), "Full House", "2S 2H 2D 6C 6S is a Full House")
    assert.equal(getHandDecision("TS TH TD JC JS"), "Full House", "TS TH TD JC JS is a Full House")
    assert.equal(getHandDecision("JS JH JD QC QS"), "Full House", "JS JH JD QC QS is a Full House")
    assert.equal(getHandDecision("QS QH QD KC KS"), "Full House", "QS QH QD KC KS is a Full House")
    assert.equal(getHandDecision("KS KH KD AC AS"), "Full House", "KS KH KD AC AS is a Full House")
    assert.equal(getHandDecision("AS AH AD TC TS"), "Full House", "AS AH AD TC TS is a Full House")
    assert.notEqual(getHandDecision("2S 2H 2D AC 6S"), "Full House", "2S 2H 2D AC 6S is not a Full House")
    assert.notEqual(getHandDecision("2S 2H 2D 2C AS"), "Full House", "2S 2H 2D AC AS is not a Full House")
});

QUnit.test("Determine Flush", function (assert) {
    assert.equal(getHandDecision("2S 4S 6S 8S TS"), "Flush", "2S 4S 6S 8S TS is a Flush")
    assert.equal(getHandDecision("6S 8S TS QS AS"), "Flush", "6S 8S TS QS AS is a Flush")
    assert.equal(getHandDecision("3S 5S 7S 9S JS"), "Flush", "3S 5S 7S 9S JS is a Flush")
    assert.notEqual(getHandDecision("2S 4S 6S 8D TS"), "Flush", "2S 4S 6S 8D TS is a not Flush")
    assert.notEqual(getHandDecision("2S 4S 6S 8D TD"), "Flush", "2S 4S 6S 8D TD is a not Flush")
});

QUnit.test("Determine Straight", function (assert) {
    assert.equal(getHandDecision("2S 3C 4D 5H 6S"), "Straight", "2S 3C 4D 5H 6S is a Straight")
    assert.equal(getHandDecision("6S 7C 8D 9H TS"), "Straight", "6S 7C 8D 9H TS is a Straight")
    assert.equal(getHandDecision("7S 8C 9D TH JS"), "Straight", "7S 8C 9D TH JS is a Straight")
    assert.equal(getHandDecision("9S TC JD QH KS"), "Straight", "9S TC JD QH KS is a Straight")
    assert.equal(getHandDecision("TC JD QH KS AS"), "Straight", "TC JD QH KS AS is a Straight")
    assert.notEqual(getHandDecision("9S TS JS QS KS"), "Straight", "9S TS JS QS KS is a not Straight")
    assert.notEqual(getHandDecision("9S 9C JS QS KS"), "Straight", "9S 9C JS QS KS is a not Straight")
});

QUnit.test("Denomination to Integer", function (assert) {
    assert.equal(denomToInteger("T"), 10, "T as an integer is 10");
    assert.equal(denomToInteger("J"), 11, "J as an integer is 11");
    assert.equal(denomToInteger("Q"), 12, "Q as an integer is 12");
    assert.equal(denomToInteger("K"), 13, "K as an integer is 13");
    assert.equal(denomToInteger("A"), 14, "A as an integer is 14");
    assert.equal(denomToInteger("9"), 9, "9 as an integer is 9");
});

QUnit.test("First Hand Wins", function (assert) {
    compareWithTest(royalFlush, straightFlush)
    compareWithTest(royalFlush, fourOfAKind)

    compareWithTest(straightFlush, fourOfAKind)
    compareWithTest(straightFlush, fullHouse)

    compareWithTest(fourOfAKind, fullHouse)
    compareWithTest(fourOfAKind, flush)

    compareWithTest(fullHouse, flush)
    compareWithTest(fullHouse, straight)

    compareWithTest(straight, threeOfAKind)
    compareWithTest(straight, twoPairs)

    compareWithTest(threeOfAKind, twoPairs)
    compareWithTest(threeOfAKind, pair)

    compareWithTest(twoPairs, pair)
    compareWithTest(twoPairs, highCard)

    compareWithTest(pair, highCard)

    compareWithTest(highCard, lowerHighCard)

    // Similar and opposite hands
    compareWithTest(royalFlush, flush)
    compareWithTest(royalFlush, straight)
    compareWithTest(straightFlush, flush)
    compareWithTest(straightFlush, straight)
    compareWithTest(fourOfAKind, threeOfAKind)
    compareWithTest(fourOfAKind, highCard)

    function compareWithTest(firstHand, secondHand) {
        var decision = firstHand.compareWith(secondHand.hand)
        assert.equal(decision[2], 1, "First Hand wins with " + decision[0] + " over the second hand's " + decision[1]);
    }

});

QUnit.test("First Hand Loses", function (assert) {
    compareWithTest(royalFlush, straightFlush)
    compareWithTest(royalFlush, fourOfAKind)

    compareWithTest(straightFlush, fourOfAKind)
    compareWithTest(straightFlush, fullHouse)

    compareWithTest(fourOfAKind, fullHouse)
    compareWithTest(fourOfAKind, flush)

    compareWithTest(fullHouse, flush)
    compareWithTest(fullHouse, straight)

    compareWithTest(straight, threeOfAKind)
    compareWithTest(straight, twoPairs)

    compareWithTest(threeOfAKind, twoPairs)
    compareWithTest(threeOfAKind, pair)

    compareWithTest(twoPairs, pair)
    compareWithTest(twoPairs, highCard)

    compareWithTest(pair, highCard)

    // Compares 2 high cards
    compareWithTest(highCard, lowerHighCard)

    // Similar and opposite hands
    compareWithTest(royalFlush, flush)
    compareWithTest(royalFlush, straight)
    compareWithTest(straightFlush, flush)
    compareWithTest(straightFlush, straight)
    compareWithTest(fourOfAKind, threeOfAKind)
    compareWithTest(fourOfAKind, highCard)


    function compareWithTest(firstHand, secondHand) {
        var decision = secondHand.compareWith(firstHand.hand)
        assert.equal(decision[2], 2, "First Hand loses with " + decision[0] + " over the second hand's " + decision[1]);
    }

});

QUnit.test("Draw", function (assert) {

    compareWithTest(royalFlush, royalFlush)

    compareWithTest(straightFlush, new PokerHand("9S TS JS QS KS"))

    compareWithTest(fourOfAKind, new PokerHand("AS AH AD AC TS"))

    compareWithTest(fullHouse, new PokerHand("AS AH AD TC TS"))

    compareWithTest(flush, new PokerHand("3S 5S 7S 9S JS"))

    compareWithTest(straight, new PokerHand("7S 8C 9D TH JS"))

    compareWithTest(threeOfAKind, new PokerHand("TS TH TC 9D 6S"))

    compareWithTest(twoPairs, new PokerHand("9S 9H 3C 3D KH"))

    compareWithTest(pair, new PokerHand("6S 6H 4C 2S 7D"))

    compareWithTest(highCard, new PokerHand("7D 8S 3C 2H 6S"))
    highCardValue.length = 0; // Clears global variable


    function compareWithTest(firstHand, secondHand) {
        var decision = firstHand.compareWith(secondHand.hand)
        assert.equal(decision[2], 3, "First Hand ties with " + decision[0] + " the second hand's " + decision[1]);
    }

});

