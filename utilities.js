//retorna objeto con los tiempos y los valores de los markers
function getMarkerValues(layer){
	var markers = {
		times:[],
		values:[]
	};

	for (var i = 0; i < layer.marker.numKeys; i++) {
		markers.times.push(layer.marker.keyTime(i+1));
		markers.values.push(layer.marker.keyValue(i+1).comment);
	}

	return markers;
}

function assignKeyframes(property, markers, values){

	property.setValuesAtTimes(markers.times, values)
}

function deleteAllKeys(property){
	while(property.numKeys > 0){
		property.removeKey(1);
	}
}

function deleteKeysBetween(property, startTime, endTime){
	for(var i = property.numKeys; i > 0; i--){
		if(property.keyTime(i) >= startTime && property.keyTime(i) <= endTime){
			property.removeKey(i);
		}
	}
}

function scaleKeys(times, values, scale, offset){
	for (var i = 0; i < times.length; i++){
    	times[i] = times[i] + comp.time;
    	values[i] = values[i] * scale + offset;
	}

}