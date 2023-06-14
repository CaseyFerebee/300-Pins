const url = "http://localhost:8088"

export const getAllFriends = () => {
    return fetch(`${url}/users`) 
        .then(response => response.json())
}
