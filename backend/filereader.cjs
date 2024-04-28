const fs = require('node:fs');
const csv = require('csv-parser');
const database = require('./dbConfig.cjs')
const mongoose = require('mongoose')

function getMongooseModelByItem(data,fileName) {
    const schemaFields = {};
    //adding keys into schema 
    Object.keys(data).forEach(key => {
        schemaFields[key] = String;
    });
    const dataSchema = new mongoose.Schema(schemaFields);
    return mongoose.model(fileName, dataSchema);
}

function saveResults(results,Model){
    results.forEach((result)=>{
        const modelInstance = new Model(result);
        modelInstance.save();
    })
}

function readNxtwaveFile(){
    const results = [];
    fs.createReadStream('./NxtWave_FirstRound_CodeFiles/NxtWave_Raw')
    .pipe(csv({
      separator: '|' // Specify the separator here.
    }))
    .on('data', (data) => {
       
        //removing empty key values
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
              delete data[key];
            }
          });
      results.push(data);
    })
    .on('end', () => {
        console.log(results[0])
        const Model = getMongooseModelByItem(results[0],'NxtWave_Raw');
        saveResults(results,Model);
    });
}

function readRawDataFile(){
    const results = [];
    fs.createReadStream('./NxtWave_FirstRound_CodeFiles/Raw_Data')
    .pipe(csv({
      separator: '|' // Specify the separator here, e.g., '\' for tab-separated files
    }))
    .on('data', (data) => {
        //removing empty key values
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
              delete data[key];
            }
          });
      results.push(data);
    })
    .on('end', () => {
        console.log(results[0])
        const Model = getMongooseModelByItem(results[0],'Raw_Data');
        saveResults(results,Model);
    });
}

function readRawData1File(){
    const results = [];
    fs.createReadStream('./NxtWave_FirstRound_CodeFiles/Raw_data_1')
    .pipe(csv({
      separator: '|' // Specify the separator here, e.g., '\t' for tab-separated files
    }))
    .on('data', (data) => {
        //removing empty key values
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
              delete data[key];
            }
          });
      results.push(data);
    })
    .on('end', () => {
        console.log(results[0])
        const Model = getMongooseModelByItem(results[0],'Raw_Data_1');
        saveResults(results,Model);
    });
}



function readFiles(){
    readNxtwaveFile();
    readRawData1File();
    readRawDataFile();
}

module.exports = readFiles
