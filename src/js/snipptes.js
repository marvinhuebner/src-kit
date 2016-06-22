$(document).ready(function () {

});

function setAnchorActive() {
	var getPath = window.location.pathname;
	var path = getPath.replace('/', '');

	$('nav a').each(function () {
		var anchor = $(this);

		var getHref = anchor.attr('href');

		if (path == getHref) {
			anchor.addClass('active');
		}
	})
}
