//console.log(module);

//module.exports.age = 25;

const fs = require('fs');

var fetchNotes = () => {
try {
    	var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);	
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
	 fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

    var duplicateNotes = notes.filter((note) => note.title === title);
   
    if(duplicateNotes.length === 0) {
    	notes.push(note);
	    saveNotes(notes);
	    return note;
    } 
	
};

// module.exports.add =  function(a, b) {
//   return a+b;
// }

var getAll = () => {
	return fetchNotes();
}

var get = (title) => {
	var notes = fetchNotes();
	var newNotes = notes.filter((note) => note.title === title);
	return newNotes[0];
}

var remove = (title) => {
	var notes = fetchNotes();
	 
	var newNotes = notes.filter((note) => note.title !== title);
	 
    saveNotes(newNotes);

    return notes.length != newNotes.length;
}

var logNote = (note) => {
	debugger;
	console.log('---------------');
    console.log('Title :',note.title);
    console.log('Body: ',note.body);
}

module.exports = {
	addNote,
	getAll,
	get,
	remove,
	logNote
};