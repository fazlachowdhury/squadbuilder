
export  async function getPlayers() {
    let results
    await fetch('http://localhost:4000/players').then(response=>response.json())
    .then(data=> results = data)
    return results
    
}