
var path;

exports = module.exports = function(ref) {
	if (!path) {
		path = search(ref, 'bytes_sent');
		if (!path) {
			throw new Error('Could not find Firebase stats property');
		}
	}

	var res = ref;
	for (var i = 0; i < path.length; i++) {
		res = res[path[i]];
	}
	return res;
};

function search(obj, key) {

	var stack = [], path = [];

	if (look(obj)) return path;

	function look(o) {
		for (var k in o) {
			if (k == key) return true;
			if (typeof o[k] == 'object' && stack.indexOf(o[k]) == -1) {
				stack.push(o[k]);
				path.push(k);
				if (look(o[k])) return true;
				stack.pop();
				path.pop();
			}
		}
	}

}
