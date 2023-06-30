import { DateSubmit } from "./Date";
import { Houses } from "./Houses";
import { ScoresInput } from "./Scores";
import { addGame } from "../dataManager/GamesManager";
import { Button } from "reactstrap";
import { format } from 'date-fns'

export const SubmitForm = ({ selectedHouse, setSelectedHouse, gameObj, setGameObj, startDate, setStartDate, selectedDate }) => {
    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));



    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (gameObj.score !== null && selectedHouse && selectedDate) {
            addGame(gameObj)
                .then(() => {
                    return setGameObj({
                        id: null,
                        userId: loggedInUser.id,
                        houseId: selectedHouse,
                        score: 0,
                        date: selectedDate
                    })
                });
            setStartDate(new Date());
            setSelectedHouse()
            window.location.reload();
        }
    };

    return (
        <div className="submitForm">

            <ScoresInput score={gameObj.score} setScore={(score) => setGameObj((state) => ({ ...state, score }))} selectedDate={selectedDate} startDate={startDate} setStartDate={setStartDate} />

            <Houses  setGameObj={setGameObj} selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} />

            <DateSubmit setGameObj={setGameObj} setStartDate={setStartDate} startDate={startDate} selectedDate={selectedDate} />
            
            <Button
                onClick={handleSaveButtonClick}
                className="btn btn-success"
                disabled={
                    gameObj.score === null || !selectedHouse || !selectedDate
                }
            >
                Submit
            </Button>
        </div>
    );
};



