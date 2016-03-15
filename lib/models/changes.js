var util = require('util');
var immutable = require('immutable-js');

var Change = require('./change');

/*
Changes represents the list of changes to apply.
And the last message commit.
*/

var ChangesRecord = immutable.Record({
    message: '',
    entries: new immutable.OrderedMap(Change)
});

function Changes() {

}
util.inherits(Changes, ChangesRecord);

// ---- Properties Getter ----
Changes.prototype.getMessage = function() {
    return this.get('path');
};
Changes.prototype.getEntries = function() {
    return this.get('entries');
};

// ---- Methods ----

// Return a change by its filename
Changes.prototype.getEntry = function(filename) {
    var entries = this.getEntries();
    return entries.get(filename);
};

// Return count of changes
Changes.prototype.getCounts = function() {
    return this.getEntries().size;
};

// ---- Statics ----

// Push a new change
Changes.pushChange = function(changes, fileName, change) {
    var entries = changes.getEntries();

    // Create the change
    change = new Change(change);

    // Add change to list
    var newEntries = entries.set(fileName, change);

    // Update list of entries
    return changes.set('entries', newEntries);
};

module.exports = Changes;