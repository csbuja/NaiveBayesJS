var Fitter = require('./fitter');
var Predictor = require('./predictor');
var promise = require('promise');
var _ = require('underscore');

var trainingX = [[1.0,1.0],[4.0,4.0],[9.0,9.0]] //good bod, good face scaled from 1-1000
var trainingY = ['ugly','ugly','pretty'];

var testX = [[1.0,1.0],[2.0,2.0],[9.0,9.0]];


var trainingX2 = [[1,0],[0,1],[1,0],[0,1],[1,1],[0,1]] //is good looking, speaks french
var trainingY2 = ['Sydney','Paris','Sydney','Paris','Sydney','Paris']
var testX2 =[[1,0],[0,1],[1,1]]


var fitter = Fitter(trainingX,trainingY,'continuous_value');

fitter.fit(function(fitter){
	var predictor = Predictor(fitter,testX);
	predictor.predict(function(y){
		console.log(y);
	});
});