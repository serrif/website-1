/**
 JS File containing all JQuery-related handlers
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/

/**
* On send command button click
*/
$("#sendCommandButton").click(function() {
	connectionManager.sendConsoleCmd($("#commandInput").val());
	$("#commandInput").val('');
	commandHistoryIndex = -1; //Reset command history index
});

/**
* Enter or arrow down/up key on command input
*/
$("#commandInput").on('keydown', function (e) {
	if(e.which === 13){ //Detect enter key
		//Disable textbox to prevent multiple submit
		$(this).attr("disabled", "disabled");
		
		//Send command
		sendCommandButton.click();

		//Enable the textbox again.
		$(this).removeAttr("disabled");
		
		//Focus again
		$(this).focus();
	}else if(e.which === 38){ //Detect arrow up key
		//Replace with older command
		if(commandHistoryIndex == -1){
			//If not browsing history, start by latest command sent
			commandHistoryIndex = connectionManager.activeConnection.commands.length;
		}
		$("#commandInput").val(connectionManager.activeConnection.commands[commandHistoryIndex - 1]);
		commandHistoryIndex = commandHistoryIndex - 1;
	}else if(e.which === 40){ //Detect arrow down key
		//Replace with newer command
		if(commandHistoryIndex !== -1){
			//If not browsing history, do nothing
			$("#commandInput").val(connectionManager.activeConnection.commands[commandHistoryIndex + 1]);
			commandHistoryIndex = commandHistoryIndex + 1;
		}
	}else if(e.which == 9){ //Detect tab key
		//TODO Suggest user from connectionManager.activeConnection.players;
	}
});