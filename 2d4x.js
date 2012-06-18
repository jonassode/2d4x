

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

