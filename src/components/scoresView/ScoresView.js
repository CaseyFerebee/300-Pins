import { useEffect, useState } from "react"
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap"
import { getGamesByUserId } from "../dataManager/GamesManager"
import { getAllHouses } from "../dataManager/HouseManager";

export const ScoresList = () => {
    const [games, setGames] = useState([])
    const [houses, setHouses] = useState([])

    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
    useEffect(() => {
        // Fetch the list of games for the logged-in user
        getGamesByUserId(loggedInUser.id)
            .then((data) => {
                console.log(data)
                setGames(data);
            })

        getAllHouses()
        .then((data) => {
            setHouses(data)
        }
        )

    }, []);


    return (
        <>
            <Card style={{ width: "18rem" }}>
                <CardHeader>My scores</CardHeader>
                <ListGroup>
                    {games.map((game) => (
                        <ListGroupItem key={game.id}>
                            {loggedInUser.name} scored {game.score} at {houses[game.houseId -1].name} on {game.date}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card>
        </>
    )
};
