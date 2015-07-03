var Fitter = require('./fitter');
var Predictor = require('./predictor');
var promise = require('promise');
var _ = require('underscore');

var trainingX = [[1,1],[1000,1000]]
var trainingY = ['ugly','pretty'];

var testX = [[1,1],[2,2],[1000,1000]];


var fitter = Fitter(trainingX,trainingY);

fitter.fit(function(fitter){
	var predictor = Predictor(fitter,testX);
	predictor.predict(function(y){
		console.log(y);
	});
});