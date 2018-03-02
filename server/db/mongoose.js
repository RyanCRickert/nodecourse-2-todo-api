var mongoose = require('mongoose');

mongoose.promise = global.promise;
mongoose.connect("mongodb://ryancrickert:Timbob11@ds253918.mlab.com:53918/rcrdatabase1"|| 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};