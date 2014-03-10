function getRandom(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
}

function log(msg){
	if ( !jQuery.migrateMute && window.console && console.log ) {
		console.log(msg);
	}
}

function plus() {
	var args = arguments;
	if (args) {
		if (args.length > 1) {
			var first = parseInt(args[0], 10);
			for ( var i = 1; i < args.length; i++) {
				var next = parseInt(args[i], 10);
				first += next;
			}
			return first;
		} else {
			return args;
		}
	} else {
		return null;
	}
}