var _ = require("underscore");

function Predictor(fitter, X) {
	if (!X.length || !fitter.X.length || X[0].length!==fitter.X[0].length) {
		throw new Error("Invalid X or fitter due to size.");
	}

	var predictor = {
		"fitter" : fitter,
		"X" : X,
		"calcMax" : function(obj){ //debugged
			var i = 0;
			var maxClass=0;
			var maxNumber=0;

			_.each(obj,function(v,k){
				if (!i) {
					maxNumber=v;
					maxClass=k;
				}
				if (v>maxNumber) {
					maxClass = k;
					maxNumber = v;
				}
				++i;
			})
			return maxClass;
		},
		"predict" : function(cb) {
			var self = this;
			y = [];
			//initialize L and run the predictor
			_.each(self.X,function(v,i){ // look through each row in X
				var rowPosteriorByClass = {};

				// make a object that maps a classname to a value proportional to the posterior
				_.each(self.fitter.piClass,function(val,classname){ 
					var prior = Math.log(val);
					var j = 0;
					var likelihood = Math.log(_.reduce(self.fitter.featuresByClass[classname],function(memo,v){
						var xFeatureValue = self.X[i][j];
						++j;
						return memo * v.pdf(xFeatureValue);
					},1)); //start at 1 because the reduction is a product

					//from log rules
					//this is not the actual posterior but is proportional to the posterior
					 var posterior = prior + likelihood; 
					 rowPosteriorByClass[classname] = posterior;
				});
				y.push(self.calcMax(rowPosteriorByClass)); // predicts the class with the maximum postestior
			});

			return cb(y);
		}
	};

	return predictor;

}

module.exports = Predictor;