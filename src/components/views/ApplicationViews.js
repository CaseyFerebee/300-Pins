import { FriendsList } from "../submitForm/Friends"
import { SubmitForm } from "../submitForm/SubmitForm"
import { ScoresView } from "../scoresView/ScoresView"
import { useState } from "react"
import { Col, Container, Row } from "reactstrap"
import { getGamesByUserId } from "../dataManager/GamesManager"

export const ApplicationViews = () => {
	const [selectedHouse, setSelectedHouse] = useState();
	const loggedInUser = JSON.parse(localStorage.getItem("bowler_user"));
	const [startDate, setStartDate] = useState(new Date());
	const selectedDate = startDate.toLocaleDateString();
	const [cSelected, setCSelected] = useState([]);
	const [selectedFriend, setSelectedFriend] = useState(null)
	const [friends, setFriends] = useState([])
	const [games, setGames] = useState([]);

	const [gameObj, setGameObj] = useState({
		id: null,
		userId: loggedInUser?.id,
		houseId: null,
		score: 0,
		date: new Date().toISOString(),
	});

	const handleFriendClick = (friendId) => {
		setSelectedFriend(friends.find((friend) => friend.id === friendId));
		getGamesByUserId(friendId)
			.then((data) => {
				setGames(data);
			})
			.catch((error) => {
				console.log("Error retrieving games:", error);
			});
	};

	return (
		<Container>

			<h1 className="title--main">300-Pins</h1>
			<h1 className="change-color">Let's Bowl</h1>
			<Row>
				<Col>
					<ScoresView selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} setGameObj={setGameObj} gameObj={gameObj} selectedDate={selectedDate} startDate={startDate} setStartDate={setStartDate} cSelected={cSelected} setCSelected={setCSelected} selectedFriend={selectedFriend} setFriends={setFriends} friends={friends} games={games} setGames={setGames} />
				</Col>
				<Col >
					<FriendsList selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} setGameObj={setGameObj} gameObj={gameObj} cSelected={cSelected} setCSelected={setCSelected} onFriendClick={handleFriendClick} friends={friends} setFriends={setFriends} games={games} />
				</Col>
			</Row>
			<SubmitForm selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} setGameObj={setGameObj} gameObj={gameObj} selectedDate={selectedDate} startDate={startDate} setStartDate={setStartDate} />

		</Container>
	)
}

