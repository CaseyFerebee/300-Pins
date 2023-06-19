import { Route } from "react-router-dom"
import { FriendsList } from "../submitForm/Friends"
import { SubmitForm } from "../submitForm/SubmitForm"
import { ScoresList } from "../scoresView/ScoresView"

export const ApplicationViews = () => {

	return <>
		<h1 className="title--main">300-Pins</h1>
		<div>Let's Bowl</div>
		
	<SubmitForm />
    
	<FriendsList />

	<ScoresList />
	
	</>
}

