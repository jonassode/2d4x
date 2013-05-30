
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
	unit: function(type, image,movement, vision){
		var object = {};
		object.type = type;
		object.image = 'images/units/' + image;
		object.movement = movement;
		object.vision = vision;

		object.calculate_move = function(map){
			alert(map.rows);

		}

		return object;
	},

	// Units
	settler: function(){
		return this.unit('settler','settler.png', 1, 20);
	},

	soldier: function(){
		return this.unit('soldier','soldier.png', 2, 20);
	},

	engineer: function(){
		return this.unit('engineer','engineer.png', 1, 20);
	},

}

