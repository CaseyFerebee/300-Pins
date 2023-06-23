import { FriendsList } from "../submitForm/Friends"
import { SubmitForm } from "../submitForm/SubmitForm"
import { ScoresView } from "../scoresView/ScoresView"
import { useState } from "react"

export const ApplicationViews = () => {
	const [selectedHouse, setSelectedHouse]= useState();
	const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
	const [startDate, setStartDate] = useState(new Date());
	const selectedDate = startDate.toLocaleDateString();
	const [gameObj, setGameObj] = useState({
        id: null,
        userId: loggedInUser.id,
        houseId: null,
        score: 0,
        date: new Date().toISOString(),
    });
	
	return <>
		<h1 className="title--main">300-Pins</h1>
		<div>Let's Bowl</div>

		<SubmitForm selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse}  setGameObj={setGameObj} gameObj={gameObj} selectedDate={selectedDate} startDate={startDate} setStartDate={setStartDate} />

		<FriendsList selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse}  setGameObj={setGameObj} gameObj={gameObj} />

		<ScoresView selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse}  setGameObj={setGameObj}  gameObj={gameObj} selectedDate={selectedDate}  startDate={startDate}  setStartDate={setStartDate}      />

	</>
}

