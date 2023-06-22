const url = "http://localhost:8088"

export const getGamesByUserId = (userId) => {
    return fetch(`${url}/games?userId=${userId}`)
        .then((response) => response.json());
};

export const addGame = (gameOjb) => {
    return fetch(`${url}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameOjb)
    })
        .then(response => response.json())
}


export const deleteGame = (id) => {
    return fetch(`${url}/games/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const editGame = (gameObj) => {
    return fetch(`${url}/games/${gameObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObj)
    }).then(response => response.json())
}

export const getGameById = (gameId) => {
    return fetch(`${url}/games?id=${gameId}`)
        .then((response) => response.json());
};
