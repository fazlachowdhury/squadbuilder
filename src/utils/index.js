import _ from 'lodash';
export function generateSquads(playerList, squads) {
    const playerLimit = Math.floor(playerList.length/ squads);
    console.log('playerLimit:', playerLimit);

    let squadShootingSum = [],
        squadSkatingSum = [],
        squadCheckingSum = [];

    let tempSquad = [];
    for (let i = 0; i< squads; i++) {
        tempSquad.push([])
    }
    console.log('tempSquad1', tempSquad);

    let counter = 0;

    _.each(playerList, (player) => {

      let playerStrongestSkill = player.skills.reduce(function(prev, curr) {
          return prev.rating > curr.rating ? prev : curr;
      });

      //Fill the empty squads first.
      if(counter < squads && tempSquad[counter].length == 0){
        tempSquad[counter].push(player);
        // playerList.splice(playerList.indexOf(player), 1);
        console.log('squadShootingSum:', squadShootingSum);

        squadShootingSum[counter] = parseInt(player.skills[0].rating);
        squadSkatingSum[counter] = parseInt(player.skills[1].rating);
        squadCheckingSum[counter] = parseInt(player.skills[2].rating);

        console.log('squadShootingSum:', squadShootingSum);
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
            console.log('squadCheckingSum', squadCheckingSum[squadSelected]);
          }


          squadSelected = Number(squadSelected);
          console.log('tempSquad[squadSelected].length:',tempSquad[squadSelected].length, typeof tempSquad[squadSelected].length);
          console.log('playerLimit:',playerLimit, typeof playerLimit);

          if(tempSquad[squadSelected].length < playerLimit){
              tempSquad[squadSelected].push(player);
              // playerList.splice(squadSelected, 1);
              console.log('squadShootingSum', squadShootingSum);
              squadShootingSum.splice(squadSelected,1,squadShootingSum[squadSelected] + parseInt(player.skills[0].rating));
              squadSkatingSum.splice(squadSelected,1,squadSkatingSum[squadSelected] + parseInt(player.skills[1].rating));
              squadCheckingSum.splice(squadSelected,1,squadCheckingSum[squadSelected] + parseInt(player.skills[2].rating));
              console.log('squadShootingSum after updating', squadShootingSum);
          }
      }
    })

    //Rest of the players will go into new squad.
    tempSquad.push([]);
    for(let i = playerList.legth - 1; i > playerLimit * squads ; i--){
      tempSquad[tempSquad.length - 1].push(playerList[i]);
    }
    // _.each(playerList, (player) => {
    //   tempSquad[tempSquad.length - 1].push(player);
    // });

    console.log('rest of the players', tempSquad);
}
