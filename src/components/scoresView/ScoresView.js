import React, { useEffect, useState } from "react"
import { Button, Card, CardHeader, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteGame, editGame, getGamesByUserId } from "../dataManager/GamesManager"
import { getAllHouses } from "../dataManager/HouseManager";
import { Houses } from "../submitForm/Houses";
import { ScoresInput } from "../submitForm/Scores";

export const ScoresView = ({ selectedHouse, setSelectedHouse, setGameObj, gameObj }) => {
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

    const handleInputChange = (gameId,e) => {
        toggle()
        const updatedInputChange = {
            id: gameId,
            userId: loggedInUser?.id,
            houseId: selectedHouse?.id,
            score: e.target.value,
            date: gameObj.date
        }
        setUpdatedGame(updatedInputChange)
    }

    const handleUpdate = () => {
        toggle()
        const updatedObject = {
            id: updatedGame.id,
            userId: updatedGame.userId,
            houseId: gameObj.houseId,
            score: updatedGame?.score,
            date: gameObj.date,
        };
        console.log("updated object", updatedObject)
        editGame(updatedObject)
            .then(() => {
                setGames((prevGames) =>
                    prevGames.map((game) => (game.id === updatedObject.id ? { ...game, ...updatedObject } : game))
                )
            })
    }
    
    const toggle = () => {
        setModal(!modal)
        setSelectedHouse(null)
    }

    return (
        <>
            <div>

                <Modal isOpen={modal} toggle={toggle} key={selectedHouse?.id} >
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody id={selectedHouse?.id}   >
                        {updatedGame && (
                            <>
                                <ScoresInput
                                    score={updatedGame.score}
                                    setScore={(score) => setUpdatedGame((prevState) => ({ ...prevState, score }))}
                                />

                                <Houses  houses={houses} selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} setGameObj={setGameObj} />
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

