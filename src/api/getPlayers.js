import superagent from 'superagent';

export  async function getPlayers() {
    let results
    //  await superagent.get('http://localhost:4000/players')
    //  .then((res) => {
    //      console.log('VVVVV', res.body)
    //      results = res.body
    //     })
    await fetch('http://localhost:4000/players').then(response=>response.json())
    .then(data=> results = data)
    return results
    
}