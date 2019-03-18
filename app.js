const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
			describe: 'Title of note',
			demand: true,
			alias: 't'
		};

const bodyOptions = {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		};

//fs.appendFile('greetings.txt', 'Hello Wordl !');

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username} ! You are ${notes.age}`, function (err) {

//       if(err){
//       	console.log('Unable to write to file.');
//       } 
// 	});

// var res = notes.addNote();
// console.log(res);
// console.log('Result: ' + notes.add(9, -7));

// console.log(_.isString(true));
// console.log(_.isString('Sumit'));
// console.log(_.uniq([1,2,3, 2, 'Sumit', 4, 'Mike']));

const argv = yargs
	.command('add', 'Add and new Note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read the Note', {
		title: titleOptions
	})
	.command('remove', 'Remove the Note', {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0];

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note == undefined) {
  	console.log('Note already exists');
  } else {
    console.log('Note added');
    notes.logNote(note);
  }
} else if (command === 'list') {
   var allNotes = notes.getAll();
   console.log(`Printing ${allNotes.length} note(s).`);
   allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
   var note = notes.get(argv.title);
   if (note == undefined) {
  	console.log('Note not found');
  } else {
    console.log('Note found');
    notes.logNote(note);
  }
} else if (command === 'remove') {
   var noteRemoved = notes.remove(argv.title);
   var message = noteRemoved ? 'Note removed ' : 'Note not found';
   console.log(message);
} 
else {
	console.log('Command not recognized');
}

