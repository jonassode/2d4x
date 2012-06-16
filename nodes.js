
var nodes = {

	WATER: "blue",
	GROUND: "green",
	AIR: "lightblue",	

	background: function(type){
		var object = {};
		object.color = type;

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

