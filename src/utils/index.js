import _ from 'lodash';
export function generateSquads(playerList, squads) {
    const playerLimit = Math.floor(playerList.length/ squads);
    console.log('check$$$$', playerLimit, squads)
    let tempSquad = [];
    for (let i = 0; i< squads; i++) {
        tempSquad.push([])
    }
    console.log('tempSquad1', tempSquad);
    _.each(playerList, (player) => {
        let counter = 0;
        if (counter <= playerLimit) {
            tempSquad[0].push(player)
        } else if (counter > playerLimit && tempSquad[0].length === playerLimit) {
            tempSquad[1].push(player)
        } else if (counter > playerLimit && tempSquad[0].length === playerLimit && tempSquad[1].length === playerLimit) {
            tempSquad[2].push(player)
        }
        counter++;
    })
    console.log('tempSquad', tempSquad);
}
