import _ from 'lodash';
export function generateSquads(playerList, squads) {
    const playerLimit = Math.floor(playerList.length/ squads);

    let squadShootingSum = [],
        squadSkatingSum = [],
        squadCheckingSum = [];

    let tempSquad = [];
    for (let i = 0; i< squads; i++) {
        tempSquad.push([])
    }

    let counter = 0;

    for (let playerCounter = playerList.length - 1 ; playerCounter >= 0 ; playerCounter--){
      let player = playerList[playerCounter];

      let playerStrongestSkill = player.skills.reduce(function(prev, curr) {
          return prev.rating > curr.rating ? prev : curr;
      });

      //Fill the empty squads first.
      if(counter < squads && tempSquad[counter].length == 0){
        tempSquad[counter].push(player);
        squadShootingSum[counter] = parseInt(player.skills[0].rating);
        squadSkatingSum[counter] = parseInt(player.skills[1].rating);
        squadCheckingSum[counter] = parseInt(player.skills[2].rating);
        //remove player from list indicating player has been added to a squad.
        _(playerList).splice(playerCounter, 1).value();
        counter++;
      }else{
         let squadSelected;
          //add the player to the squad that has the smallest average for that skills
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
              squadShootingSum.splice(squadSelected,1,squadShootingSum[squadSelected] + parseInt(player.skills[0].rating));
              squadSkatingSum.splice(squadSelected,1,squadSkatingSum[squadSelected] + parseInt(player.skills[1].rating));
              squadCheckingSum.splice(squadSelected,1,squadCheckingSum[squadSelected] + parseInt(player.skills[2].rating));
              //remove player from list indicating player has been added to a squad.
              _(playerList).splice(playerCounter, 1).value();
          }
      }

    }




    //Rest of the players will go into new squad.
    tempSquad.push([]);
    _.each(playerList, (player) => {
      tempSquad[tempSquad.length - 1].push(player);
    });

    console.log('rest of the players', tempSquad);
}
