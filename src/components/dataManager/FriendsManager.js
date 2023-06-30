const url = "http://localhost:8088"

export const getAllFriends = () => {
    return fetch(`${url}/users`) 
        .then(response => response.json())
}

export const getFriendById = (userId) => {
    return fetch(`${url}/users?id=${userId}`)
}