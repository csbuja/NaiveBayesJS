var _ = require("underscore");

//requires that y.length is equal to binDattaArray.length 
function Fitter(X,y,numClasses) {
	if(!numClasses){
		numClasses = 0;
		classesSeen = {};
		for( var i = 0; i<X.length; ++i){
			if (!classesSeen[y[i]]) {
				classesSeen[y[i]] = true;
				++numClasses;
			}
		}
	}

	//initialize counts to 0 for each class and features for each class
	classCount = _.extend(classesSeen);
	featuresByClass = _.extend(classesSeen);
	_.each(classCount, function(v,i){
		classCount[i] = 0;
		featuresByClass[i] = Array.apply(null, Array(X[0].length)).map(Number.prototype.valueOf,0);
	});
	
	var fitter = {
		"numClasses": numClasses,
		"classCount" : classCount,
		"featuresByClass" : featuresByClass,
		"X" : X,
		"y" : y,
		"fit": function() {
			_.each(binDattaArray, function(v,i) {
				var classLabel = y[i];

			}
		}
	}
	return fitter;
}
