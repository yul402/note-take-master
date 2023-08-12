// Import
const util = require('util');
const fs = require('fs');
const uuid = require('../helpers/uuid');

//  Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Write to file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Read and Append new notes
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

// Delete note from file
const deleteFromFile = (file,id)=>{
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // data.filter(data.id !== id)
            const filteredData = JSON.parse(data).filter((data) => data.id !== id);
            writeToFile(file, filteredData);
        }
    })
};

    
    //  return retrieveNotes()
    //     .then(notes => notes.filter(note => note.id !== id))
    //     .then(filteredNotes => write(filteredNotes));
  

// const write = (note)=> {
//     return writeNote('db/db.json', JSON.stringify(note));
// }

// const read =() => {
//     return readNote('db/db.json', 'utf8');
// }

// const retrieveNotes =()=>{
//     return read().then(notes => {
//         let parsedNotes;
//         try {
//             parsedNotes = [].concat(JSON.parse(notes));
//         } catch (err) {
//             parsedNotes = [];
//         }
//         return parsedNotes;
//     });
// }

// const addNote =(note)=> {
//     const { title, text } = note;
//         if (!title || !text) {
//             throw new Error('Both title and text can not be blank');
//         }
//         // Add unique IDs for each recod
//         const newNote = {
//             title, 
//             text, 
//             id: uuid()};

    // Retrieve Notes, add the new note, update notes
    // return retrieveNotes()
    //     .then(notes => [...notes, newNote])
    //     .then(updatedNotes => write(updatedNotes))
    //     .then(() => newNote);
    
    
    // return retrieveNotes()
    //     .then(notes => [...notes, newNote])
    //     .then(updatedNotes => write(updatedNotes))
    //     .then(() => newNote);
// }


    // Delete Note function
// const deleteNote =(id)=>{
//     return retrieveNotes()
//         .then(notes => notes.filter(note => note.id !== id))
//         .then(filteredNotes => write(filteredNotes));
//     }

module.exports = { writeToFile, readFromFile, readAndAppend, deleteFromFile};