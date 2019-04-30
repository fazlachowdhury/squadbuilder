Instruction:
	* To clone proejct from github:
		git clone https://github.com/fazlachowdhury/squadbuilder
	* Please ensure port 3000 and 4000 is free.
	* to start the json server on port 4000:
		npm run json:server 
	* to start the app:
		npm start
	* Please ensure both port 3000 and 4000 is running simultaniously.

What to expect:
	* App starts with no tables.
	* Entering number of squads and pressing "Create Squad" button will create and show squads 
	  followed by waiting list at the end.
	* Entering 0 or negative number of squads will put all players in waiting list. 
	* Reset squad button will restore to initial state.

Technology used:
	* React: it has good user interface and provided me with a good starting project. 
	* MaterialsUI: has good compatibility with react, is easy to integrate, has good documentation.
 	* lodash
	* json-server: run a mock DB. 
	* enzyme and jest: for testing.

Algorithm thoughts:
	* Each player is considered for selection based on his/her strongest skill.
        * Player is placed into a squad that has the lowest average for player's strongest skill.
	* Once balanced squads are created, additional players either go into filling empty spots or into waiting list.

Things to be improved:
	* Require more test cases.
	* Bugs:
		# Does not reset text field value after pressing "Reset squads" button.
		# Not showing squad/waiting list header.
		# Not checking for invalid user input (non numeric number of squads).

