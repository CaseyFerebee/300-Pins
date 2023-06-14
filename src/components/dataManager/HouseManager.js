
const url = "http://localhost:8088"

export const getAllHouses = () => {
    return fetch(`${url}/houses`) 
        .then(response => response.json())
}
