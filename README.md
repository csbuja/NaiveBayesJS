# Naive Bayes Classifier  
Classifies continuous or binary data using a naive bayes strategy.  

None of this is vectorized, so it's not very fast.  

#API
dataType can be 'binary' or 'continouous_value'  
X is a 2-d array  
y is a 1-d array  

#Example
```javascript
var trainingX2 = [[1,0],[0,1],[1,0],[0,1],[1,1],[0,1]];
var trainingY2 = ['Sydney','Paris','Sydney','Paris','Sydney','Paris'];
var testX2 =[[1,0],[0,1],[1,1]];
var dataType = 'binary'

var fitter = Fitter(trainingX2,trainingY2,dataType);

fitter.fit(function(fitter){
	var predictor = Predictor(fitter,testX2);
	predictor.predict(function(y){
		console.log(y);
	});
});
```
