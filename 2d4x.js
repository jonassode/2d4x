	var cal_next_square = function(parent1, parent2){
		var next = Math.floor((parent1+parent2)/2);
		
		if ( next === parent1 || next === parent2 ){
			next = undefined;
		}

		return next;
	}

	var cal_max = function(arr, parent1, parent2, next, height){
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
	}

	var random = function(min, max){
		return Math.floor((Math.random()*(max-min+1))+min);
	}

	var cal_min = function(arr, parent1, parent2, next){
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
	}

	// Calculate Sub Square
	var cal_sub_square = function(arr, parent1, parent2, height){

		var next = cal_next_square(parent1, parent2);
		if ( next != undefined ) {
			var max = cal_max(arr, parent1,parent2, next, height);
			var min = cal_min(arr, parent1,parent2, next);
			// Random Value
			// Set Value
			arr[next] = random(min,max);
			cal_sub_square(arr, parent1, next, height);
			cal_sub_square(arr, next, parent2, height);
		}

	}

	var _log = function(text){
		LOG = LOG + text + "<br>";
	}

	var select_unit = function(hi,j,c){
		var tile = world.get_cell(hi,j);
		var unit = tile.get_item('units').get(c);
	
		var text = "<b>Unit information:</b><br>";
		text = text + "Postion: " + hi + "," +j + "<br>";
		text = text + "Type: " + unit.type + "<br>";

		document.getElementById('unit_area').innerHTML = text;

		// Move Unit To Front
		tile.set_item('selected_unit', c);
		draw_screen();
	}

	var draw_tile_area = function(i, j){
		var hi = i - 1;
		var tile = world.get_cell(hi,j);
		var text = "Postion: " + hi + "," +j + "<br>";
		text = text + "Type: " + tile.get_item('background').type + "<br>";

		// Minerals
		text = text + "<br>";
		text = text + "<b>Minerals</b><br>";
		text = text + "Minerals not implemented yet.<br>";

		// Units
		text = text + "<br>";
		text = text + "<b>Units</b><br>";
		var units = tile.get_item('units'); 
		if ( units != undefined ){
			for ( var c = 0; c < units.size; c++){
				var unit = units.list[c];
				text = text + "<img onclick='select_unit("+hi+","+j+","+c+");' src='"+unit.image+"'>&nbsp;";
			}
		} else {
			text = text + "No units on square.<br>";
		}

		document.getElementById('tile_area').innerHTML = text;
	}

	var draw_screen = function(){

		var text = draw(world);		
		document.getElementById('map_area').innerHTML = text;
		document.getElementById('log_area').innerHTML = "LOG:<br>" + LOG;
	}

	var draw = function(world){

		var text = "<table>";
		for (var i=0;i< world.rows;i++){
			text = text + "<tr>";
			for (var j=0;j<world.cols;j++){

				var x = "&nbsp;"
				var height_index = ( world.rows - i );
				var cell = world.get_cell(height_index-1,j);
				var units = cell.get_item('units');

				if ( units != undefined ){
					var selected_unit = cell.get_item('selected_unit');
					x = '<img src="' + units.get(selected_unit).image +  '" ></image>';
				}
	
				text = text + "<td onclick='draw_tile_area("+ height_index + "," + j +");' style='width:20;height:20;background-color:"+ cell.get_item('background').color +";'>"+ x + "</td>";
			}
			text = text + "</tr>";
		}
		text = text + "</table>";

		return text;
	}

	var generate_world = function(height, width){
		var arr = new Array(width);

		for (var i=0;i < width; i++){
			arr[i] = " ";
		}

		arr[0] = 10;
		arr[width-1] = 10;

		// World Generateion
		cal_sub_square(arr, 0, width-1, height);

		var world = jsmatrix.matrix2d(height, width);

		var cell = world.get_cell(10, 0);
		cell.set_item('units',jsmatrix.list());
		cell.get_item('units').push(nodes.settler());
		cell.get_item('units').push(nodes.soldier());
		cell.get_item('units').push(nodes.engineer());
		cell.set_item('selected_unit',1);


		for (var i=0;i<world.rows;i++){
			for (var j=0;j<world.cols;j++){

				var height_index = ( height - i );
				var type = nodes.AIR;

				if ( arr[j] >= height_index ) {
					type = nodes.GROUND;
				} else if ( height_index <= 8 ) {
					type = nodes.WATER;
				}

				var background = nodes.background(type);

				var cell = world.get_cell(height_index-1,j);
				cell.set_item('background', background);	
	
			}
		}

		return world;
	}

