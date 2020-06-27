const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    type: {type: String, required: true},
    description: {type: String, required: true },
    distance: {type: Number},
    unit: { type: String },
    pace: { type: Number },
    shoe: { type: String },
    path: { type: Array },
    duration_sec: { type: Number},
    duration_min: { type: Number },
    duration_hours: { type: Number },
    date: { type: Date, required: true } 
    }, {
       timestamps: true,
   });

   const Exercise = mongoose.model('Exercise', exerciseSchema); 

   module.exports = Exercise;