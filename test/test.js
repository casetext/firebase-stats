var expect = require('chai').expect,
	firebaseStats = require('../firebase-stats');

describe('firebase-stats', function() {
	it('finds the stats object', function() {
		var ref = {
			foo: 1,
			bar: {
				baz: 2
			},
			stats: {
				bytes_sent: 42,
				bytes_received: 513
			}
		};

		var result = firebaseStats(ref);

		expect(result.bytes_sent).to.equal(42);
		expect(result.bytes_received).to.equal(513);
	});

	it('deals with circular references', function() {
		var b = {
			c: {
				d: 1
			}
		};
		b.circ = b;

		var o = {
			a: {
				b: b,
				bb: b,
				e: {
					f: 1
				}
			},
			stats: {
				bytes_sent: 42,
				bytes_received: 513
			}
		};

		var result = firebaseStats(o);

		expect(result.bytes_sent).to.equal(42);
		expect(result.bytes_received).to.equal(513);
	});
});