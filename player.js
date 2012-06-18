

player = {
	
	list: new Array(),

	end_turn: function(){
		this.active_player_index++;
		if ( this.active_player_index >= player.list.length ){
			this.active_player_index = 0;			
		}
	},

	active_player_index: 0,

	active_player: function(){
		return this.list[this.active_player_index];
	},

	get: function(index){
		return this.list[index];
	},

	add: function(name){
		var object = {};
		object.name = name;

		// Set player index
		object.index = this.list.length;

		// Set image
		object.image = 'images/players/player_' + object.index + '.png';

		// Add player to players list
		this.list.push(object);

		object.units = new Array();

		object.add_unit = function(map, unit, row, col){

			// Set player
			unit.player = this;
	
			// Add unit to players unit list
			this.units.push(unit);
			
			var cell = map.get_cell(row, col);
			if ( cell.get_item('units') == undefined ){
				cell.set_item('units',jsmatrix.list());
			}

			cell.get_item('units').push(unit);
			var index = cell.get_item('units').size;

			cell.set_item('selected_unit',index - 1);
		}

		// 
		return object;
	},

	draw_players: function(area){
		var text = "";

		for(var i = 0; i < this.list.length; i++){
			var player = this.list[i];
			text = text + "<img src='"+player.image+"' />&nbsp;";
			text = text + player.name;
			if ( this.active_player_index == player.index ){
				text = text + "&nbsp;<img src='images/icons/arrow_left.png'/>";
			}		

			text = text + "<br/>";
		}

		document.getElementById(area).innerHTML = text;
	},

}



