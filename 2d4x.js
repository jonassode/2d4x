

	var _log = function(text){
		LOG = LOG + text + "<br>";
	}

	var select_unit = function(hi,j,c){
		var tile = world.get_cell(hi,j);
		var unit = tile.get_item('units').get(c);

		// Move Unit To Front
		tile.set_item('selected_unit', c);
		draw.screen();

		draw.unit_information(unit);
	}

	var end_turn = function(){
		player.end_turn();
		draw.screen();
	}

	jslos.blocker_values.push('#');

	var los_map = function(map, player){
		var arr = jslos.create_matrix(map.rows, map.cols);

		for(var i = 0; i < map.rows; i++){
			for(var j = 0; j < map.cols; j++){
				var cell = map.get_cell(i, j);
				// landscape
				var bg = cell.get_item('background');
				if ( bg.type == nodes.GROUND.type ){
					arr[i][j] = '#';
				}
				// units

			}
		}

		return arr;
	}




