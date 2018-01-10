const express = require('express')
const app = express()

var path = require('path');


app.use(express.static(path.join(__dirname, './public')));

app.get('*', function( req, res ) {
	res.sendFile(__dirname + '/public/index.html');
} );

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ', port);
})