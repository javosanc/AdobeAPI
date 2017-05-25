var AEUtils = (function (){
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

	function assignKeyframes(property, times, values){

		property.setValuesAtTimes(times, values)
	}

	function deleteAllKeys(property){
		while(property.numKeys > 0){
			property.removeKey(1);
		}
	}

	function deleteKeysBetween(property, startTime, endTime){
		for (var i = property.numKeys; i > 0; i--){
			if(property.keyTime(i) >= startTime && property.keyTime(i) <= endTime){
				property.removeKey(i);
			}
		}
	}

	function scaleKeys(timesArray, valuesArray, scale, timeOffset, valueOffset){
		for (var i = 0; i < timesArray.length; i++){
	    	timesArray[i] = timesArray[i] + timeOffset;
	    	valuesArray[i] = valuesArray[i] * scale + valueOffset;
		}

	}

	function repeatLayerWithRhythm (comp, AVItem, triggers, timeOffset){
		for(var i = 0; i < triggers.length; i++){
			var layer = comp.layers.add(AVItem);
			layer.startTime = triggers[i] + timeOffset;
		}
	}

	function advanceTime(comp, timeOffset){
		comp.time += timeOffset;
	}

	function placeCompMarkers(comp, times, timeOffset){
		timeGrid = comp.layers.byName("timeGrid") || createTimeGridLayer(comp);

		for(var i = 0 ; i < times.length; i++){
			timeGrid.marker.setValueAtTime(times[i] + timeOffset, new MarkerValue(i.toString()))
		}
	}

	function createTimeGridLayer(comp){
		timeGrid = comp.layers.addNull();
		timeGrid.name = "timeGrid";

		return timeGrid;
	}

	return {
		getMarkerValues: getMarkerValues,
		assignKeyframes: assignKeyframes,
		deleteAllKeys: deleteAllKeys,
		deleteKeysBetween: deleteKeysBetween,
		scaleKeys: scaleKeys,
		repeatLayerWithRhythm: repeatLayerWithRhythm,
		advanceTime: advanceTime,
		placeCompMarkers: placeCompMarkers
	}

})();
