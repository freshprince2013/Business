/**
 *	Developer: Satish Sekar
 *  Writing unit tests using qunit
 */
 
QUnit.test("the ellipsis function unit test", function(assert) { 
	var text = "Hello World! This is Satish singing a song of six pens. Hello World! This is Satish singing a song of six pens. Hello World! This is Satish singing a song of six pens.";
	var result = bbyc.util.ellipsis(text, 20, false);
	
	var a = assert.equal(result, "Hello World! This...", "text is successfully ellipsized to 20 characters");
	
	text = "aa aaaaaa aaa aaaa";
	result = bbyc.util.ellipsis(text, 10, false);
	
	var b = assert.equal(result, "aa aaaa...", "text is successfully ellipsized to 10 characters");
	
	text = "ba baaaaaaaaa ba";
	result = bbyc.util.ellipsis(text, 8, false);
	
	var c = assert.equal(result, "ba ba...", "text is successfully ellipsized to 8 characters");
 });