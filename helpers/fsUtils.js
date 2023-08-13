// Import libraries
const util = require('util');
const fs = require('fs');

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
            const filteredData = JSON.parse(data).filter((data) => data.id !== id);
            writeToFile(file, filteredData);
        }
    })
};

module.exports = { writeToFile, readFromFile, readAndAppend, deleteFromFile};