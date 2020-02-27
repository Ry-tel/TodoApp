const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb+srv://troip:troip12345678@cluster0-kmbbc.mongodb.net/test?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('connected to the AtlasMongoDB');
}).catch( err => {
	console.log('Error', err.message);
});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
