firebase-stats
==============

[![Build Status](https://travis-ci.org/casetext/firebase-stats.svg)](https://travis-ci.org/casetext/firebase-stats)

The Firebase client hides bytes sent and received stats behind minified properties that change with every release.  You can call `Firebase.INTERNAL.stats(ref)`, which has a stable name, but simply spits out the stats to the console -- largely useless if you want those values programmatically.

This module searches a Firebase ref for the stats object and returns it to you.  It does this by looking for an object with a property called `bytes_sent`.  This *should* continue to work across releases, but we're obviously well in to undocumented internal territory, so this comes with absolutely no warranty; use at your own risk.  This module will throw if it can't find the stats object.

The search is only performed the first time you use this module; it caches the path to the stats object so that future calls will be very quick.

Example
-------

    var firebaseStats = require('firebase-stats'),
        Firebase = require('firebase'),
        ref = new Firebase('https://docs-examples.firebaseio.com');

    firebaseStats(ref); // -> { bytes_received: 287, bytes_sent: 58 }
