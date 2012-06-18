
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
		var text = "<b>Unit information:</b><br>";
		text = text + "<img src='"+unit.image+"'><br>";
		text = text + "Owner: " + unit.player.name + "<br>";
		text = text + "Postion: " + unit.row + "," + unit.col + "<br>";
		text = text + "Type: " + unit.type + "<br>";

		document.getElementById(draw.AREA_UNIT_INFORMATION).innerHTML = text;
	},

	tile_area: function(i, j){
		var hi = i - 1;
		var tile = world.get_cell(hi,j);
		var text = "Postion: " + hi + "," +j + "<br>";
		text = text + "Type: " + tile.get_item('background').type + "<br>";

		// Minerals
		text = text + "<br>";
		text = text + "<b>Resources</b><br>";
		text = text + "Resources not implemented yet.<br>";

		// Units
		text = text + "<br>";
		text = text + "<b>Units</b><br>";
		var units = tile.get_item('units'); 
		if ( units != undefined ){
			select_unit(hi,j,tile.get_item('selected_unit'));
			for ( var c = 0; c < units.size; c++){
				var unit = units.list[c];
				text = text + "<img onclick='select_unit("+hi+","+j+","+c+");' src='"+unit.image+"'>&nbsp;";
			}
		} else {
			text = text + "No units on square.<br>";
		}

		document.getElementById(this.AREA_TILE_INFORMATION).innerHTML = text;
	},

	map: function(world){

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
	
				text = text + "<td onclick='draw.tile_area("+ height_index + "," + j +");' style='width:20;height:20;background-color:"+ cell.get_item('background').color +";'>"+ x + "</td>";
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
