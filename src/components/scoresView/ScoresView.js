import React, { useEffect, useState } from "react"
import { Button, Card, CardHeader, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteGame, editGame, getGamesByUserId } from "../dataManager/GamesManager"
import { getAllHouses } from "../dataManager/HouseManager";
import { Houses } from "../submitForm/Houses";
import { ScoresInput } from "../submitForm/Scores";

export const ScoresView = ({selectedHouse, setSelectedHouse}) => {
    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
    const [games, setGames] = useState([])
    const [houses, setHouses] = useState([])
    const [modal, setModal] = useState(false)
    const [updatedGame, setUpdatedGame] = useState({})

    useEffect(() => {
        // Fetch the list of games for the logged-in user
        getGamesByUserId(loggedInUser?.id)
            .then((data) => {
                
                setGames(data);
            })

        getAllHouses()
            .then((data) => {
                setHouses(data)
            }
            )

    }, []);

    const handleDelete = (gameId) => {
        deleteGame(gameId)
            .then(() => {
                setGames((prevGames) => prevGames.filter((game) => game.id !== gameId))
            })
    }
    
    
    const handleInputChange = (gameId, e) => {
        toggle()
        const updatedObject = {
        id: gameId,
        userId: loggedInUser?.id,
        houseId: houses.id,
        score: "",
        date: "",
    }
    setUpdatedGame(updatedObject)
    console.log(e)
}
    

    const handleUpdate = () => {
        toggle()
        
        editGame(updatedGame)
        .then(() => {
            setGames((prevGames) =>
                prevGames.map((game) => (game.id === updatedGame.id ? { ...game, ...updatedGame } : game))
            )
        })
    }

const toggle = () => {
    setModal(!modal)
}

    //const houseModalState = (houseId) => {
    //setUpdatedGame((prevState) => ({ ...prevState, houseId }))}
    

    return (
        <>
            <div>
            
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        {updatedGame && (
                            <>
                                <ScoresInput
                                    score={updatedGame.score}
                                    setScore={(score) => setUpdatedGame((prevState) => ({ ...prevState, score }))}
                                />

                                <Houses selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse}/>
                            </>
                        )}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleUpdate}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

            <Card style={{ width: "18rem" }}>
                <CardHeader>My scores</CardHeader>
                <ListGroup>
                    {games.map((game) => (
                        <React.Fragment key={game.id}>
                            <ListGroupItem key={`game-${game.id}`}>
                                <>
                                </>
                                {loggedInUser.name} scored {game.score} at {houses[game.houseId - 1]?.name} on {game.date}
                            </ListGroupItem>
                            <Button id={game.id} key={`edit-${game.id}`} color="warning" size="sm" onClick={(e) => handleInputChange(game.id, e)}> Edit</Button>
                            <Button key={`delete-${game.id}`} color="danger" size="sm" onClick={() => handleDelete(game.id)}> Delete</Button>
                        </React.Fragment>
                    ))}
                </ListGroup>
            </Card>
        </>
    )

}

