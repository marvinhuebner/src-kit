const config = {
	pathToSrc: '../src/',
	pathToDist: '../public/',
	pathToBower: 'bower_components/',
	minify: false,
	localhost: ''
};

const files = {
	jsFilesLibUtility: [
		//config.pathToBower + 'jquery/dist/jquery.min.js'
	],

	jsFilesLibBabel: [
		//config.pathToBower + 'foundation-sites/js/foundation.core.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.box.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.keyboard.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.mediaQuery.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.motion.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.nest.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.timerAndImageLoader.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.touch.js',
		//config.pathToBower + 'foundation-sites/js/foundation.util.triggers.js',
		//config.pathToBower + 'foundation-sites/js/foundation.abide.js',
		//config.pathToBower + 'foundation-sites/js/foundation.accordion.js',
		//config.pathToBower + 'foundation-sites/js/foundation.accordionMenu.js',
		//config.pathToBower + 'foundation-sites/js/foundation.drilldown.js',
		//config.pathToBower + 'foundation-sites/js/foundation.dropdown.js',
		//config.pathToBower + 'foundation-sites/js/foundation.dropdownMenu.js',
		//config.pathToBower + 'foundation-sites/js/foundation.equalizer.js',
		//config.pathToBower + 'foundation-sites/js/foundation.interchange.js',
		//config.pathToBower + 'foundation-sites/js/foundation.magellan.js',
		//config.pathToBower + 'foundation-sites/js/foundation.offcanvas.js',
		//config.pathToBower + 'foundation-sites/js/foundation.orbit.js',
		//config.pathToBower + 'foundation-sites/js/foundation.responsiveMenu.js',
		//config.pathToBower + 'foundation-sites/js/foundation.responsiveToggle.js',
		config.pathToBower + 'foundation-sites/js/foundation.reveal.js'
		//config.pathToBower + 'foundation-sites/js/foundation.slider.js',
		//config.pathToBower + 'foundation-sites/js/foundation.sticky.js',
		//config.pathToBower + 'foundation-sites/js/foundation.tabs.js',
		//config.pathToBower + 'foundation-sites/js/foundation.toggler.js',
		//config.pathToBower + 'foundation-sites/js/foundation.tooltip.js'
	],

	jsFilesLibNormal: [
		//config.pathToBower + 'fastclick/lib/fastclick.js'
	],

	jsFilesOwn: [
		config.pathToSrc + 'js/**/*.js'
	],

	test: `Pfad zum Source: ${config.pathToSrc}`
};

module.exports.config = config;
module.exports.files = files;


