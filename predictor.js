var _ = require("underscore");

function Predictor(fitter, X) {
	if (!X.length || fitter.X.length || X.length !== fitter.X.length || X.length[0]!==fitter.X.length) {
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
			_.each(self.X,function(v,i){
				var currentExample = {};
				_.each(self.fitter.piClass,function(val,k){
					var prior = Math.log(val);
					var j = 0;
					var likelihood = Math.log(_.reduce(self.fitter.featuresByClass[k],function(memo,v){
						var xFeatureValue = self.X[i][j];
						++j;
						return memo * v.pdf(xFeatureValue);
					},1));
					currentExample[k] = prior + likelihood; //from log rules
				});

				y.push(self.calcMax(currentExample));
			});
			return cb(y);
		}
	};

	return predictor;

}

module.exports = Predictor;