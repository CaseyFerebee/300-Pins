import { FriendsList } from "../Scores/Friends"
import { SubmitForm } from "../Scores/SubmitForm"



export const ApplicationViews = () => {
	return <>
		<h1 className="title--main">300-Pins</h1>
		<div>Let's Bowl</div>

	<SubmitForm />
    

	<FriendsList />
	</>
}

