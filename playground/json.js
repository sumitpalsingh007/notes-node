const fs = require('fs');

var originalNote = {
	title: 'Pappu',
	body: 'Cant dance'
};

originalNoteString = JSON.stringify(originalNote);

console.log(originalNoteString);

fs.writeFileSync('notes.json', originalNoteString);	

var noteString = fs.readFileSync('notes.json');
note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);