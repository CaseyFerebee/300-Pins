import { FriendsList } from "../submitForm/Friends"
import { SubmitForm } from "../submitForm/SubmitForm"
import { ScoresView } from "../scoresView/ScoresView"
import { useState } from "react"

export const ApplicationViews = () => {
	const [selectedHouse, setSelectedHouse]= useState();

	return <>
		<h1 className="title--main">300-Pins</h1>
		<div>Let's Bowl</div>

		<SubmitForm selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} />

		<FriendsList />

		<ScoresView selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} />

	</>
}

