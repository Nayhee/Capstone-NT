const remoteURL = "http://localhost:8088"


//used for Scorecard calculation. 
export const getAUsersRounds = (userId) => {
    return fetch(`${remoteURL}/rounds?userId=${userId}&_expand=disc&_expand=user`)
    .then(res => res.json())
}

//will use this for Round Detail
export const getRoundById = (roundId) => {
    return fetch(`${remoteURL}/rounds/${roundId}?_expand=disc&_expand=user`)
    .then(res => res.json())
}

//will use for Round List
export const getAllRounds = () => {
    return fetch(`${remoteURL}/rounds?_expand=disc&_expand=user`)
    .then(res => res.json())
}
  
//will use for Delete Round button
export const deleteRound = (id) => {
      return fetch(`${remoteURL}/rounds/${id}`, {
          method: "DELETE"
      }).then(result => result.json())
}

//will use for adding new Round (on Round Form?)
export const addRound = newRound => {
    return fetch(`${remoteURL}/rounds`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newRound)
    }).then(response => response.json())
}

//will use for Round Edit
export const updateRound = (editedRound) => {
      return fetch(`${remoteURL}/rounds/${editedRound.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(editedRound)
      }).then(data => data.json());
}