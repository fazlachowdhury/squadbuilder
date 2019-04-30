import _ from 'lodash';

export function generateSquads(allPlayersList, squads) {
    //Array to hold squads
    let tempSquad = [];

    //copied array to reduce calls to server on reset
    let currentPlayerList = _.clone(allPlayersList, true);

    //If squads is < 1, return all players in waiting list
    if(squads < 1){
      tempSquad.push([])
      tempSquad[0] = _.clone(currentPlayerList, true);
      return tempSquad;
    }

    //Number of players in each squad.
    const playerLimit = Math.floor(currentPlayerList.length/ squads);

    //Holds infromation about squad skills
    let squadShootingSum = [],
        squadSkatingSum = [],
        squadCheckingSum = [];

    for (let i = 0; i< squads; i++) {
        tempSquad.push([])
    }

    //Counter used to identify empty squads
    let counter = 0;

    //Loop through each player to find a suitable squad based on player's stringest skill
    //and squad skills
    for (let playerCounter = currentPlayerList.length - 1 ; playerCounter >= 0 ; playerCounter--){

      let player = currentPlayerList[playerCounter];

      //Find player's strongest skill.
      let playerStrongestSkill = player.skills.reduce(function(prev, curr) {
          return prev.rating > curr.rating ? prev : curr;
      });

      //Fill the empty squads first.
      if(counter < squads && tempSquad[counter].length == 0){
        //Add player to squad
        tempSquad[counter].push(player);
        //update squad stats
        squadShootingSum[counter] = parseInt(player.skills[0].rating);
        squadSkatingSum[counter] = parseInt(player.skills[1].rating);
        squadCheckingSum[counter] = parseInt(player.skills[2].rating);
        //remove player from list indicating player has been added to a squad.
        _(currentPlayerList).splice(playerCounter, 1).value();
        counter++;
      }else{
         let squadSelected;
          //Use player's strongest skill to find match to a squad that has least points for that skill
          if(playerStrongestSkill.type.toUpperCase() === 'SHOOTING'){
            squadSelected = squadShootingSum.indexOf(squadShootingSum.reduce(function(prev, curr) {
                return prev < curr ? prev : curr;
            }));
            console.log('squadShootingSum', squadShootingSum[squadSelected]);
          }else if(playerStrongestSkill.type.toUpperCase() === 'SKATING'){
            squadSelected = squadSkatingSum.indexOf(squadSkatingSum.reduce(function(prev, curr) {
                return prev < curr ? prev : curr;
            }));
            console.log('squadShootingSum', squadShootingSum[squadSelected]);
          }else{
            squadSelected = squadCheckingSum.indexOf(squadCheckingSum.reduce(function(prev, curr) {
                return prev < curr ? prev : curr;
            }));
          }


          squadSelected = Number(squadSelected);

          if(tempSquad[squadSelected].length < playerLimit){
              tempSquad[squadSelected].push(player);
              //update squad stats
              squadShootingSum.splice(squadSelected,1,squadShootingSum[squadSelected] + parseInt(player.skills[0].rating));
              squadSkatingSum.splice(squadSelected,1,squadSkatingSum[squadSelected] + parseInt(player.skills[1].rating));
              squadCheckingSum.splice(squadSelected,1,squadCheckingSum[squadSelected] + parseInt(player.skills[2].rating));
              //remove player from list indicating player has been added to a squad.
              _(currentPlayerList).splice(playerCounter, 1).value();
          }
      }

    }


    //Now for each suad, set a name, and add squad average skills info
    let squadCounter = 0;
    _.each(tempSquad, (squad) => {

      //If squad still has unfilled spots, fill them from available players
      if(squad.length < playerLimit){
        squad.push(currentPlayerList[0]);
        //update squad stats
        squadShootingSum.splice(squadCounter,1,squadShootingSum[squadCounter] + parseInt(currentPlayerList[0].skills[0].rating));
        squadSkatingSum.splice(squadCounter,1,squadSkatingSum[squadCounter] + parseInt(currentPlayerList[0].skills[1].rating));
        squadCheckingSum.splice(squadCounter,1,squadCheckingSum[squadCounter] + parseInt(currentPlayerList[0].skills[2].rating));
        //remove player from list indicating player has been added to a squad.
        _(currentPlayerList).splice(0, 1).value();
      }

      let squadInfo = {
          "_id": "",
          "firstName": "",
          "lastName": "",
          "skills": [
            {
              "type": "Shooting",
              "rating": ""
            },
            {
              "type": "Skating",
              "rating": ""
            },
            {
              "type": "Checking",
              "rating": ""
            }
          ]
      };

      //Now calculate squad skill info.
      squadInfo.firstName = 'Squad';
      squadInfo.lastName = 'Average:';
      squadInfo.skills[0].rating = Math.floor(squadShootingSum[squadCounter]/playerLimit);
      squadInfo.skills[1].rating = Math.floor(squadSkatingSum[squadCounter]/playerLimit);
      squadInfo.skills[2].rating = Math.floor(squadCheckingSum[squadCounter]/playerLimit);
      tempSquad[squadCounter].push(squadInfo);

      squadCounter++;
    });

    //Rest of the players will go into waiting list.
    tempSquad.push([]);
    tempSquad[tempSquad.length - 1] = _.clone(currentPlayerList, true);

    return tempSquad;
}
