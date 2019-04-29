import _ from 'lodash';
export function generateSquads(allPlayersList, squads) {

    //copy array
    let currentPlayerList = _.clone(allPlayersList, true);

    //Players in each squad.
    const playerLimit = Math.floor(currentPlayerList.length/ squads);

    //used to balance team average for each skill
    let squadShootingSum = [],
        squadSkatingSum = [],
        squadCheckingSum = [];

    let tempSquad = [];
    for (let i = 0; i< squads; i++) {
        tempSquad.push([])
    }

    let counter = 0;
    for (let playerCounter = currentPlayerList.length - 1 ; playerCounter >= 0 ; playerCounter--){
      let player = currentPlayerList[playerCounter];
      //Use player's strongest skill while selecting a squad.
      let playerStrongestSkill = player.skills.reduce(function(prev, curr) {
          return prev.rating > curr.rating ? prev : curr;
      });

      //Fill the empty squads first.
      if(counter < squads && tempSquad[counter].length == 0){
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
          //find player's strongest skill to find suitable squad that has the smallest average for that skills
          if(playerStrongestSkill.type.toUpperCase() === "SHOOTING"){
            squadSelected = squadShootingSum.indexOf(squadShootingSum.reduce(function(prev, curr) {
                return prev < curr ? prev : curr;
            }));
            console.log('squadShootingSum', squadShootingSum[squadSelected]);
          }else if(playerStrongestSkill.type.toUpperCase() === "SKATING"){
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

    _.each(tempSquad, (squad) => {
      if(squad.length < playerLimit){
        squad.push(currentPlayerList[0]);
        _(currentPlayerList).splice(0, 1).value();
      }
    });

    //Rest of the players will go into new squad.
    tempSquad.push([]);
    tempSquad[tempSquad.length - 1] = _.clone(currentPlayerList, true); 

    console.log("Squad:", tempSquad);
    console.log("Current Player list:", currentPlayerList);
    console.log("All Player list:", allPlayersList);

    return tempSquad;
}
