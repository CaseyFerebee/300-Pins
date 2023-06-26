import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import {
    deleteGame,
    editGame,
    getGameById,
    getGamesByUserId,
} from "../dataManager/GamesManager";
import { getAllHouses } from "../dataManager/HouseManager";
import { Houses } from "../submitForm/Houses";
import { ScoresInput } from "../submitForm/Scores";
import { DateSubmit } from "../submitForm/Date";
import { format } from 'date-fns';

export const ScoresView = ({
    selectedHouse,
    setSelectedHouse,
    setGameObj,
    gameObj,
    startDate,
    selectedDate,
    setStartDate,
}) => {
    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
    const [games, setGames] = useState([]);
    const [houses, setHouses] = useState([]);
    const [modal, setModal] = useState(false);
    const [updatedGame, setUpdatedGame] = useState({});
    

    useEffect(() => {
        // Fetch the list of games for the logged-in user
        getGamesByUserId(loggedInUser?.id).then((data) => {
            setGames(data);
        });

        getAllHouses().then((data) => {
            setHouses(data);
        });
    }, []);

    const handleDelete = (gameId) => {
        deleteGame(gameId).then(() => {
            setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
        });
    };

    const handleInputChange = (gameId, e) => {
        toggle();
        console.log(e);
        getGameById(gameId)
            .then((data) => {
                console.log("data", data[0]);
                return data[0]; // Return the fetched game object
            })
            .then((fetchedGame) => {
                let copy = { ...fetchedGame };
                copy.date = format(new Date(copy.date), "MM/dd/yyyy")
                setUpdatedGame(copy);
            });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        toggle();

        const updatedObject = {
            id: updatedGame?.id,
            userId: updatedGame?.userId,
            houseId: updatedGame?.houseId,
            score: updatedGame?.score,
            date: updatedGame.date,
        };
        console.log("updated object", updatedObject);
        editGame(updatedObject).then(() => {
            setGames((prevGames) =>
                prevGames.map((game) =>
                    game.id === updatedGame.id ? { ...game, ...updatedObject } : game
                )
            );
        });
    };

    const toggle = () => {
        setModal(!modal);
        setSelectedHouse();
    };

    return (
        <>
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody >
                        {updatedGame && (
                            <>
                                <ScoresInput

                                    score={updatedGame.score}
                                    setScore={(score) =>
                                        setUpdatedGame((prevState) => ({ ...prevState, score }))
                                    }
                                />

                                <Houses

                                    selectedHouse={selectedHouse}
                                    setSelectedHouse={(house) =>
                                        setUpdatedGame((prevState) => ({ ...prevState, houseId: house?.id }))
                                    }
                                    setGameObj={setGameObj}
                                />

                                <DateSubmit
                                
                                    setGameObj={setGameObj}
                                    selectedDate={selectedDate}
                                    setStartDate={(date) => 
                                    
                                        setUpdatedGame((prevState) => ({ ...prevState, date: date}))
                                    }
                                    startDate={startDate}
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleUpdate}>
                            Save
                        </Button>{" "}
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
                                <></>
                                {loggedInUser.name} scored {game.score} at{" "}
                                {houses[game.houseId - 1]?.name} on {""}
                                {format(new Date(game.date), "MM/dd/yyyy")}
                            </ListGroupItem>
                            <Button
                                id={game.id}
                                key={`edit-${game.id}`}
                                color="warning"
                                size="sm"
                                onClick={(e) => handleInputChange(game.id, e)}
                            >
                                {" "}
                                Edit
                            </Button>
                            <Button
                                key={`delete-${game.id}`}
                                color="danger"
                                size="sm"
                                onClick={() => handleDelete(game.id)}
                            >
                                {" "}
                                Delete
                            </Button>
                        </React.Fragment>
                    ))}
                </ListGroup>
            </Card>
        </>
    );
};

// const updatedInputChange = {
//     id: gameId,
//     userId: loggedInUser?.id,
//     houseId: selectedHouse?.id,
//     score: e.target.value,
//     date: gameObj.date
// }
