/**
 * Created by ff on 15/9/6.
 */
var mongoose = require('mongoose');

var ExcelSchema = new mongoose.Schema({
    ClassName: String,
    Number: String,
    Name: String,
    Data: Array
});

mongoose.model('Excel', ExcelSchema);