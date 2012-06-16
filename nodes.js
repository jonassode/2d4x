
var nodes = {

	// Landscape types
	WATER: { color: "blue", type: "water", },
	GROUND: { color: "green", type: "ground" },
	AIR: { color: "lightblue", type: "air" },

	background: function(landscape){
		var object = {};
		object.color = landscape.color;
		object.type = landscape.type;

		return object;
	},

	// Unit Base Class
	unit: function(type, image){
		var object = {};
		object.type = type;
		object.image = image;
		return object;
	},

	// Units
	settler: function(){
		return this.unit('settler','settler.png');
	},

	soldier: function(){
		return this.unit('soldier','soldier.png');
	},

	engineer: function(){
		return this.unit('engineer','engineer.png');
	},

}

