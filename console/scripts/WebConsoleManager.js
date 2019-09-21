/**
 WebConsole Manager for WebConsole
 Used to manage active connections
 https://github.com/mesacarlos
 2019 Carlos Mesa under MIT License.
*/
class WebConsoleManager {
	/**
	* Loads a existing connection or creates a new one
	*/
	loadConnection(){		
		//If not created yet, create it
		this.activeConnection = new WebConsoleConnector("ws://play.kaboom.pw:53951");
		this.activeConnection.connect();
	}
	
	/**
	* Send console command to server
	*/
	sendConsoleCmd(cmd){
		this.activeConnection.sendToServer("EXEC " + cmd);
		this.activeConnection.commands.push(cmd);
	}
	
	/**
	* Asks server for CPU, RAM and players info
	*/
	askForInfo(){
		this.activeConnection.sendToServer("PLAYERS");
		this.activeConnection.sendToServer("CPUUSAGE");
		this.activeConnection.sendToServer("RAMUSAGE");
	}
	
}