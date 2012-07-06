
draw = {

	AREA_MAP: 'map_area',
	AREA_PLAYER_LIST: 'player_area',
	AREA_TILE_INFORMATION: 'tile_area',
	AREA_UNIT_INFORMATION: 'unit_area',

	screen: function(){
		draw.map(world);
		draw.player_list();
	},

	unit_information: function(unit){
		var text = "<div style='background-color:silver;'>";
		text = text + "<b>Active Unit</b><br>";
		text = text + "<img src='"+unit.image+"'><br>";
		text = text + "Owner: " + unit.player.name + "<br>";
		text = text + "Postion: " + unit.row + "," + unit.col + "<br>";
		text = text + "Type: " + unit.type + "<br>";
		text = text + "<br>";
		text = text + "<b>Unit commands</b><br>";
		text = text + "<button disabled='true'>Move</button>" ;

		text = text + "</div>";

		document.getElementById(draw.AREA_UNIT_INFORMATION).innerHTML = text;
	},

	tile_area: function(i, j){
		var tile = world.get_cell(i,j);
		var text = "Postion: " + i + "," +j + "<br>";
		text = text + "Type: " + tile.get_item('background').type + "<br>";
		text = text + "Feature: " + tile.get_item('background').feature + "<br>";

		// Minerals
		text = text + "<br>";
		text = text + "<b>Resources</b><br>";
		text = text + "Resources not implemented yet.<br>";

		// Units
		text = text + "<br>";
		text = text + "<b>Units</b><br>";
		var units = tile.get_item('units'); 
		if ( units != undefined ){
			select_unit(i,j,tile.get_item('selected_unit'));
			for ( var c = 0; c < units.size; c++){
				var unit = units.list[c];
				text = text + "<img onclick='select_unit("+i+","+j+","+c+");' src='"+unit.image+"'>&nbsp;";
			}
		} else {
			text = text + "No units on square.<br>";
		}

		document.getElementById(this.AREA_TILE_INFORMATION).innerHTML = text;
	},

	map: function(world){

		// Active merged viewed tiles in jslos
		jslos.reset_merged_tiles(world.rows, world.cols);

		if ( FOW == true ){
			// Generate blocked map
			var blocked_map = los_map(world, player.active());

			// Calculate line of site for all units
			for ( var u = 0; u < player.active().units.length; u++) {
				var unit =  player.active().units[u];
				jslos.calculate_line_of_sight(blocked_map, {row:unit.row, col:unit.col}, unit.vision);
			}
		}

		var text = "<table>";
		for (var i=0;i< world.rows;i++){
			text = text + "<tr>";
			for (var j=0;j<world.cols;j++){

				if ( FOW == false || jslos.merged_visible_tiles[i][j] == jslos.VISIBLE ){
					var x = "&nbsp;"
					var height_index = i;
					var cell = world.get_cell(i,j);
					var units = cell.get_item('units');

					if ( units != undefined ){
						var selected_unit = cell.get_item('selected_unit');
						x = '<img src="' + units.get(selected_unit).image +  '" ></image>';
					}
	
					text = text + "<td onclick='draw.tile_area("+ height_index + "," + j +");' style='width:20;height:20;background-color:"+ cell.get_item('background').color +";'>"+ x + "</td>";
				} else {
					text = text + "<td style='width:20;height:20;background-color:silver'>&nbsp;</td>";
				}
			}
			text = text + "</tr>";
		}
		text = text + "</table>";

		document.getElementById(this.AREA_MAP).innerHTML = text;
	},

	player_list: function(area){
		var text = "";

		for(var i = 0; i < player.list.length; i++){
			var current_player = player.list[i];
			text = text + "<img src='"+current_player.image+"' />&nbsp;";
			text = text + current_player.name;
			if ( player.active_player_index == current_player.index ){
				text = text + "&nbsp;<img src='images/icons/arrow_left.png'/>";
			}		

			text = text + "<br/>";
		}

		document.getElementById(this.AREA_PLAYER_LIST).innerHTML = text;
	},

}
