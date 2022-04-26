const remoteURL = "http://localhost:8088"


export const getAllBrands = () => {
    return fetch(`${remoteURL}/brands`)
    .then(res => res.json())
}