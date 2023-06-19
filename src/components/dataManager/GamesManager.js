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


