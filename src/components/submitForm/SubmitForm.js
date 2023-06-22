import { DateSubmit } from "./Date";
import { Houses } from "./Houses";
import { ScoresInput } from "./Scores";
import { addGame } from "../dataManager/GamesManager";
import { Button } from "reactstrap";

export const SubmitForm = ({selectedHouse, setSelectedHouse, gameObj, setGameObj, startDate, setStartDate, selectedDate}) => {
    const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));



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
                        date: selectedDate
                    })
                });
                setStartDate(new Date());
                setSelectedHouse()
                window.location.reload();
        }
    };

    return (
        <>

            <ScoresInput score={gameObj.score} setScore={(score) => setGameObj((state) => ({ ...state, score }))} />

            <Houses setGameObj={setGameObj} selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} />

            <DateSubmit setGameObj={setGameObj} setStartDate={setStartDate} startDate={startDate} selectedDate={selectedDate} />

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



