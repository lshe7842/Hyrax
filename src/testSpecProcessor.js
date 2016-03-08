
module.exports = function(specObj){
	var spec = specObj,
		actions = spec.actions;

	if(actions){
		for(var i = 0; i < actions.length; i++){

			if(actions[i].type && actions[i].type.indexOf('select') == 0){
				// Change type to Casperjs method 'fillSelectors'
				// &&
				// Construct selector argument needed by 'fillSelectors'
				actions[i]._selector = "{ '" + actions[i].target + "': " + "'" + actions[i].type.substring(7, actions[i].type.length - 1) + "' }";
				actions[i].type = 'fillSelectors';
				actions[i].target = actions[i].form;
				delete actions[i].form;
			}

			if(actions[i].wait && actions[i].wait > 0){
				actions[i]._waitForPrevious = actions[i].wait * 1000;
				delete actions[i].wait;
			}
		}
	}

	return spec;
};