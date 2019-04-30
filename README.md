Instruction to clone and run project:
	* To clone proejct from github:
		git clone https://github.com/fazlachowdhury/squadbuilder
	* Please ensure port 3000 and 4000 is free.
	* to start the json server on port 4000:
		npm run json:server 
	* to start the app:
		npm start
	* Please ensure both port 3000 and 4000 is running simultaniously.

Technology used:
	* React: it has good user interface and provided me with a good starting project. 
	* MaterialsUI: has good compatibility with react, is easy to integrate, has good documentation.
 	* lodash
	* json-server: run a mock DB. 
	* enzyme and jest: for testing.

Algorithm thoughts:
	* Each player is considered for selection based on his/her strongest skill.
        * Player is placed into a squad that has the lowest average for player's strongest skill.
	* Once balanced squads are created, additional players either go into fill empty spots or into waiting list.

Things to be improved:
	* Require more test cases.
	* Bugs:
		# Does not reset text field value after pressing "Reset squads" button.
		# Does not check if user input is valid.

