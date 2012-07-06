		// Stolen from Snipplier
		// POSTED BY the_coder on 09/16/09
		// http://snipplr.com/view/19838/get-url-parameters/
		function getUrlVars() {
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		    });
		    return vars;
		}

		function getIntOrDefault(name, default_value){
			return vars[name] != undefined ? parseInt( vars[name] ) : default_value;
		}

		function getStringOrDefault(name, default_value){
			return vars[name] != undefined ? vars[name] : default_value;
		}

		function getBooleanOrDefault(name, default_value){
			return vars[name] != undefined ? Boolean( vars[name] ) : default_value;
		}

		// Load Vars
		var vars = getUrlVars();
