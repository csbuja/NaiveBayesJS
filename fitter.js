var _ = require("underscore");
var stats = require("stats-lite");
var gaussian = require('gaussian');

//a class needed when the gaussian becomes a dirac function in the limit
function FakeGaussianDiracInLimit(mean,variance){
	var fakeGaussian = {
		"mean" : mean,
		"variance" : variance,
		"pdf" : function(x) {
			return (x===this.mean) ? 1 : 0;
		}
	}

	return fakeGaussian;
}

function newObjectExtend(obj){ //this is tested and working
	x = {}
	_.each(obj,function(val,key){
		x[key] = val;
	});

	return x;
}

//requires that y.length is equal to X.length 
//requires that there is at least 1 row
function Fitter(X,y) {
	var x = (function(cb){
		if (X.length === 0 || X.length !== y.length) {
			throw new Error("y.length is equal to X.length and there should be at least one row");
			return {};
		}

		var numClasses = 0;
		var classesSeen = {};
		for( var i = 0; i<X.length; ++i){
			if (!classesSeen[y[i]]) {
				classesSeen[y[i]] = true;
				++numClasses;
			}
		}

		//initialize counts to 0 for each class and features for each class
		var classCount = newObjectExtend(classesSeen);
		var featuresByClass = newObjectExtend(classesSeen);
		var counter = 0;
		var f = 0

		_.each(classCount, function(v,classname){
			//initialize the class counts to 0
			classCount[classname] = 0.0;
			//each class mapping in featuresByClass is an array of length of first row in training data
			featuresByClass[classname] = Array.apply(null, []);

			counter++;
			if (counter === _.keys(classCount).length) { // this happens once.
				f = cb(classesSeen,classCount,numClasses,featuresByClass,X,y);
				
			}
		});
		return f;
	})(function(classesSeen,classCount,numClasses,featuresByClass,X,y){
		var fitter = {
		"classesSeen" : classesSeen,
		"numClasses": numClasses,
		"classCount" : classCount,
		"piClass" : newObjectExtend(classCount),
		"featuresByClass" : featuresByClass,
		"X" : X,
		"y" : y,
		"calcStatisticsForFeatureOfClass" : function(){
			var self = this;
			_.each(self.featuresByClass, function(val,classname){

				_.each(self.X,function(v,j){
					var mean = stats.mean(val);
					var variance =  stats.variance(val);
					console.log(val);
					console.log(mean);
					console.log(variance);
					// Can't create a gaussian with 0 variance

					if (variance!==0.0) self.featuresByClass[classname][j] = gaussian(mean,variance);
					else self.featuresByClass[classname][j] = FakeGaussianDiracInLimit(mean,variance);
				});
			});
		},
		"calcPiClass" : function() {
			var self = this;
			_.each(self.piClass,function(v,classname){
				self.piClass[classname] = self.classCount[classname]/self.X.length
			});
		},
		"fit": function(cb) {
			var self = this;

			_.each(self.X, function(v,i) {
				var classLabel = self.y[i];
				self.classCount[self.y[i]] +=1;
				_.each(self.X[i], function(val,j){
					self.featuresByClass[classLabel].push(val); 
				});
			});
			self.calcPiClass();
			self.calcStatisticsForFeatureOfClass();
			cb(self);
		}
	}
	return fitter;
	});
	return x
	}

module.exports = Fitter;

