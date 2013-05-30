
generate = {

	START_LEVEL: undefined,
	WATER_LEVEL: undefined,

	set_start_level: function(level){
		this.START_LEVEL = level;
	},

	set_water_level: function(level){
		this.WATER_LEVEL = level;
	},

	cal_next_square: function(parent1, parent2){
		var next = Math.floor((parent1+parent2)/2);
		
		if ( next === parent1 || next === parent2 ){
			next = undefined;
		}

		return next;
	},

	cal_max: function(arr, parent1, parent2, next, height){
		var lower = parent1;
		if ( arr[parent2] < arr[parent1] ){
			lower = parent2;
		}

		var distans = Math.abs(lower-next);
		var max = arr[lower] + distans * 2;
		if ( max > height ){
			max = height;
		}
		return max;
	},

	random: function(min, max){
		return Math.floor((Math.random()*(max-min+1))+min);
	},

	cal_min: function(arr, parent1, parent2, next){
		var higher = parent1;
		if ( arr[parent2] > arr[parent1] ){
			higher = parent2;
		}

		var distans = Math.abs(higher-next);
		var min = arr[higher] - distans * 2;
		if ( min < 1 ){
			min = 1;
		}
		return min;
	},

	cal_sub_square: function(arr, parent1, parent2, height){

		var next = this.cal_next_square(parent1, parent2);
		if ( next != undefined ) {
			var max = this.cal_max(arr, parent1,parent2, next, height);
			var min = this.cal_min(arr, parent1,parent2, next);
			// Random Value
			// Set Value
			arr[next] = this.random(min,max);
			this.cal_sub_square(arr, parent1, next, height);
			this.cal_sub_square(arr, next, parent2, height);
		}

	},



	world: function(height, width){
		var arr = new Array(width);

		for (var i=0;i < width; i++){
			arr[i] = " ";
		}

		// Set the first and last row
		arr[0] = this.START_LEVEL;
		arr[width-1] = this.START_LEVEL;

		// World Generateion
		this.cal_sub_square(arr, 0, width-1, height);

		var world = jsmatrix.matrix2d(height, width);

		for (var i=0;i<world.rows;i++){
			for (var j=0;j<world.cols;j++){

				var height_index = ( height - i );
				var type = nodes.AIR;

				if ( arr[j] >= height_index ) {
					type = nodes.GROUND;
				} else if ( height_index <= this.WATER_LEVEL ) {
					type = nodes.WATER;
				}

				var background = nodes.background(type);

				var cell = world.get_cell(i,j);
				cell.set_item('background', background);	
	
			}
		}

		this.analyse_map(world);
		return world;
	},

	// Features
	SURFACE: "Surface",
	ATMOSPHERE: "Atmosphere",
	CRUST: "Crust",
	WATERSURFACE: "Water surface",
	WATERCRUST: "Water level",
	EARTH: "Earth",
	DEEPWATER: "Deep water",

	analyse_map: function(map){

		for(var i = 0; i < map.rows; i++){
			for(var j = 0; j < map.cols; j++){
				var cell = map.get_cell(i, j);
				// landscape
				var bg = cell.get_item('background');
				var cell_below = cell.down();
				var type_below;
				var cell_above = cell.up();
				var type_above;

				if ( cell_below != undefined ) {
					type_below = cell_below.get_item('background').type;
				}
				if ( cell_above != undefined ) {
					type_above = cell_above.get_item('background').type;
				}

				if ( bg.type === nodes.AIR.type ) {

					if ( type_below === nodes.GROUND.type ) {
						bg.feature = this.SURFACE;
					} else if ( type_below === nodes.WATER.type)  {
						bg.feature = this.WATERSURFACE;
					} else {
						bg.feature = this.ATMOSPHERE;
					}

				} else if ( bg.type === nodes.GROUND.type ) {
					if ( type_above === nodes.AIR.type)  {
						bg.feature = this.CRUST;
					} else {
						bg.feature = this.EARTH;
					}

				} else if ( bg.type === nodes.WATER.type ) {
					if ( type_above === nodes.AIR.type)  {
						bg.feature = this.WATERCRUST;
					} else {
						bg.feature = this.DEEPWATER;
					}
				}


			}
		}

	},


}
