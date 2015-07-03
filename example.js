var Fitter = require('./fitter');
var Predictor = require('./predictor');
var promise = require('promise');
var _ = require('underscore');

var trainingX = [[1.0,1.0],[1.11,1.1],[1000.0,1000.0]]
var trainingY = ['ugly','ugly','pretty'];

var testX = [[1.0,1.0],[2.0,2.0],[1000.0,1000.0]];


var fitter = Fitter(trainingX,trainingY);

fitter.fit(function(fitter){
	var predictor = Predictor(fitter,testX);
	predictor.predict(function(y){
		console.log(y);
	});
});