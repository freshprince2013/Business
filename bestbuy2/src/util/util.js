/**
 * Developer: Satish Sekar
 * Class definition for the utility container
 */

(function() { 
	bbyc.util = $.extend(true, bbyc, { 
		ellipsis: function (inputStr, length, word) {
			word = word === undefined ? true : word;
			var outStr = inputStr;
			if (inputStr && length < inputStr.length - 3) {

				if (word) {
					for (var i = length - 3; i > 0; i--) {
						if (inputStr.substr(i, 1) === ' ') {
							outStr = $.trim(inputStr.substr(0, i)) + '...';
							break;
						}
					}
				}
				else {
					outStr = inputStr.substr(0, length - 3) + '...';
				}
			}
			return outStr;
		}
	});
})();