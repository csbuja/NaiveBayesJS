var Fitter = require('./fitter');
var Predictor = require('./predictor');
var promise = require('promise')

var trainingX = [[1,1],[60,60]]
var trainingY = [['ugly'],['pretty']];

var testX = [[1,1],[2,2],[60,60]];


var fitter = Fitter(trainingX,trainingY);

fitter.fit(function(fitter){
	var predictor = Predictor(fitter,testY);
	predictor.predict(function(y){
		console.log(y);
	});
});