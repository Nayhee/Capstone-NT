const remoteURL = "http://localhost:8088"


export const getAllTypes = () => {
    return fetch(`${remoteURL}/types`)
    .then(res => res.json())
}