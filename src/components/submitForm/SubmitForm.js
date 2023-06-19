import { useState } from "react";
import { DateSubmit } from "./Date";
import { Houses } from "./Houses";
import { ScoresInput } from "./Scores";
import { addGame } from "../dataManager/GamesManager";
import { Button } from "reactstrap";

export const SubmitForm = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
    const [startDate, setStartDate] = useState(new Date());
    const [selectedHouse,setSelectedHouse]= useState();

    const [gameObj, setGameObj] = useState({
        id: null,
        userId: loggedInUser.id,
        houseId: null,
        score: 0,
        date: null,
    });

    const formattedDate = new Date()

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (gameObj.score !== null) {
            addGame(gameObj)
                .then(() => {
                    return setGameObj({
                        id: null,
                        userId: loggedInUser.id,
                        houseId: null,
                        score: 0,
                        date: formattedDate.toLocaleDateString()
                    })
                });
                setStartDate(new Date());
                setSelectedHouse()
        }
    };

    //console.log(gameObj)
    return (
        <>
            <ScoresInput score={gameObj.score} setScore={(score) => setGameObj((state) => ({ ...state, score }))} />

            <Houses setGameObj={setGameObj} selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} />

            <DateSubmit setGameObj={setGameObj} setStartDate={setStartDate} startDate={startDate} />

            <Button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent);
                }}
                className="btn btn-success"
                disabled={gameObj.score === null}
            >
                Submit
            </Button>
        </>
    );
};



