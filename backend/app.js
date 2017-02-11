var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb'}));
app.set('port', (process.env.PORT || 5000));

var indexFile = express.static(path.join(__dirname, '../app/modal'), {'index': ['index.html']});
app.use(indexFile);

app.get('/keys', function(req, res, next){
	var keys = require('./keys.json');
	res.json(keys);
});

app.delete('/keys/:index', function(req, res, next){
	var index = req.params.index;
	var keys = require('./keys.json');
	//throw new Error();

	try{
		//throw new Error();
		keys.splice(index,1);
		fs.writeFile('./backend/keys.json', JSON.stringify(keys), function(err){
			if(err)
				throw err;
			else
				res.send('success')
		});
	}catch(e){
		res.send('error');
	}
});

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});




app.listen(app.get('port'), function () {
	console.log("app started",__dirname);
});