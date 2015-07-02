var _ = require("underscore");
var stats = require("stats-lite");
var gaussian = require('gaussian');

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
		var classCount = _.extend(classesSeen);
		var featuresByClass = _.extend(classesSeen);
		var counter = 0;
		f = 0
		_.each(classCount, function(v,i){
			classCount[i] = 0;
			featuresByClass[i] = Array.apply(null, Array(X[0].length)).map(Array.prototype.valueOf,[]);
			counter++;
			if (counter === _.keys(classCount).length) {
				f = cb(classesSeen,classCount,numClasses,featuresByClass,X,y);
				
			}
		});
		return f;
	})(function(classesSeen,classCount,numClasses,featuresByClass,X,y){
		var fitter = {
		"classesSeen" : classesSeen,
		"numClasses": numClasses,
		"classCount" : classCount,
		"piClass" : _.extend(classCount),
		"featuresByClass" : featuresByClass,
		"X" : X,
		"y" : y,
		"calcStatisticsForFeatureOfClass" : function(){
			var self = this;
			_.each(self.featuresByClass, function(v,k){
				_.each(v,function(val,i){
					var mean = stats.mean(val);

					// THIS MAY NEED TO BE FIXED BECAUSE CANT COMPUTE GAUSSIAN WITH 0 VARIANCE
					var variance =  stats.variance(val);
					self.featuresByClass[k][i] = gaussian(mean,variance);
				})
			});
		},
		"calcPiClass" : function() {
			var self = this;
			_.each(self.piClass,function(v,k){
				self.piClass[k] = self.classCount[k]/self.X.length
			});
		},
		"fit": function(cb) {
			var self = this;

			_.each(self.X, function(v,i) {
				var classLabel = y[i];
				self.classCount[y[i]] +=1;
				_.each(self.X[i], function(va,j){
					console.log(self.featuresByClass)
					self.featuresByClass[classLabel][j].push(self.X[i][j]); 
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

