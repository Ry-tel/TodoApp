const 	express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
	  	mongoose = require('mongoose');


const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


const TestSchema = new mongoose.Schema({
	title: String,
	description: String,
});

const TestPost = mongoose.model('TestPost', TestSchema);

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(9000, () =>{
	console.log("server listening on port 9000");
});

