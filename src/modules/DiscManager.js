const remoteURL = "http://localhost:8088"

//will use this for Disc Detail
export const getDiscById = (discId) => {
    return fetch(`${remoteURL}/discs/${discId}?_expand=user`)
    .then(res => res.json())
}

export const getAUsersDiscs = (userId) => {
    return fetch(`${remoteURL}/discs?userId=${userId}&_expand=type&_expand=brand`)
    .then(res => res.json())
}


//not yet needed but potentially for a stretch goal. 
export const getAllDiscs = () => {
    return fetch(`${remoteURL}/discs?_expand=user`)
    .then(res => res.json())
}
  
//will use for Delete Disc button
export const deleteDisc = id => {
      return fetch(`${remoteURL}/discs/${id}`, {
          method: "DELETE"
      }).then(result => result.json())
}

//will use for adding new Disc (on Disc Form?)
export const addDisc = newDisc => {
    return fetch(`${remoteURL}/discs`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newDisc)
    }).then(response => response.json())
}

//will use for Disc Edit
export const updateDisc  = (editedDisc) => {
      return fetch(`${remoteURL}/discs/${editedDisc.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(editedDisc)
      }).then(data => data.json());
}