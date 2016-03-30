
module.exports = function(specObj){
	var spec = specObj,
		actions = spec.actions;

	if(actions){
		for(var i = 0; i < actions.length; i++){

			if(actions[i].type && actions[i].type.indexOf('select') != -1){
				// Change type to Casperjs method 'fillSelectors'
				// &&
				// Construct selector argument needed by 'fillSelectors'
				actions[i]._selector = "fillSelectors('" + actions[i].form + "', { \"" + actions[i].target + "\": " + "'" + actions[i].type.substring(7, actions[i].type.length - 1) + "' })";
			}

			if(actions[i].type && actions[i].type.indexOf('input') != -1){
				// Change type to Casperjs method 'sendKeys'
				// &&
				// Construct selector argument needed by 'sendKeys'
				actions[i]._selector = "sendKeys(\"" + actions[i].target + "\", \"" + actions[i].type.substring(6, actions[i].type.length - 1) + "\"";

				if(actions[i].focus){
					actions[i]._selector += ", {keepFocus: true}";
				}

				actions[i]._selector += ")";
			}

			if(actions[i].type && actions[i].type.indexOf('click') != -1){
				actions[i]._selector = "click(\"" + actions[i].target + "\")";
			}

			if(actions[i].after && actions[i].after.signalOkWith){
				if(actions[i].after.signalOkWith.indexOf('select') != -1){
					// An option in select element
					var val = actions[i].after.signalOkWith.substring(7, actions[i].after.signalOkWith.length - 1);
					actions[i].after._signalOkWith = ".selectedOptions[0].innerHTML == '" + val + "'";
				}else if(actions[i].after.signalOkWith.indexOf('value') != -1){
					// Value
					actions[i].after._signalOkWith = ".value == '" + actions[i].after.signalOkWith.substring(6, actions[i].after.signalOkWith.length - 1) + "'";
				}else{
					// Hardcoded
					actions[i].after._signalOkWith = "." + actions[i].after.signalOkWith;
				}

				delete actions[i].after.signalOkWith;
			}

			if(actions[i].wait && actions[i].wait > 0){
				actions[i]._waitForPrevious = actions[i].wait * 1000;
				delete actions[i].wait;
			}

			if(actions[i].timeout && actions[i].timeout > 0){
				actions[i]._timeout = actions[i].timeout * 1000;
				delete actions[i].timeout;
			}

			if(actions[i].after && actions[i].after.timeout && actions[i].after.timeout > 0){
				actions[i].after._timeout = actions[i].after.timeout * 1000;
				delete actions[i].after.timeout;
			}

			if(actions[i].after && actions[i].after.prints && actions[i].after.prints.length > 0){
				// Process prints
				actions[i].after._prints = [];

				for(var j = 0; j < actions[i].after.prints.length; j++){
					if(typeof actions[i].after.prints[j] === 'string'){
						// String type print
						actions[i].after._prints.push("\"" + actions[i].after.prints[j] + "\"");

					}else if(typeof actions[i].after.prints[j] === 'object'){
						// Object
						// Use query and placeholders
						if(actions[i].after.prints[j].query && actions[i].after.prints[j].string){
							if(actions[i].after.prints[j].string.indexOf('{0}') != -1){
								// Found placeholder

							}else{
								// No placeholder
								actions[i].after._prints.push("\"" + actions[i].after.prints[j].string + "\" + this.getHTML('" + actions[i].after.prints[j].query + "')");
							}
						}
												
					}
				}
			}
		}
	}



	return spec;
};