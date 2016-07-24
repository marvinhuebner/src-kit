'use strict';

$(document).ready(function () {
	/**
  * Call Foundation JS
  */
	$(document).foundation();

	/**
  * Call Fastclick JS
  */
	FastClick.attach(document.body);

	/**
  * Get the MediaQueries which are used in foundation
  * @type {string} get current MediaQuery
  */

	var currentBreakpoint = Foundation.MediaQuery.current;

	if (currentBreakpoint == 'small') {
		// your code
	}

	if (currentBreakpoint == 'medium') {
		// your code
	}

	if (currentBreakpoint == 'large') {
		// your code
	}

	if (currentBreakpoint == 'xlarge') {
		// your code
	}

	if (currentBreakpoint == 'xxlarge') {
		// your code
	}
});

var myName = 'Marvin';

console.log('hallo wie geht dir ' + myName);

var test = function test() {
	console.log('das ist ein test');
};
//# sourceMappingURL=app.js.map
