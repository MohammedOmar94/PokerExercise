
QUnit.test( "Validating Hands", function( assert ) {
    assert.ok(validateHand("2S 3S 4S 5S 6S"), "Hands in the correct format return true" );
    assert.notOk(validateHand("2S 2S 2S 2S 2S"), "Duplicate cards return false" );
    assert.notOk(validateHand("2S 2S 3S 4S 5S"), "A single duplicate card returns false" );
    assert.notOk(validateHand("2S 3S 4S 5S6 S"), "Cards with only 1 or 3 characters returns false" );
    assert.notOk(validateHand("2S 3S 4S 5S "), "Missing cards returns false" );
    assert.notOk(validateHand("2S3S4S5S6S"), "Hands with no spaces at all returns false" );
    assert.notOk(validateHand("2S3S 4S5S 6S"), "Multiple cards missing a space return false" );
    assert.notOk(validateHand("2S3S 4S 5S 6S"), "Two cards missing a space return false" );
    assert.notOk(validateHand("2S 3S 4S 5X 6S"), "Typing in suits that don't exist returns false" );
    assert.notOk(validateHand("1SS 2S 3S 4S 5S"), "Typing in denominations that don't exist returns false" );
  });