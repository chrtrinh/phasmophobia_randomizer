import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Home.css";

let id = 1;
const locations = [
	"Tanglewood",
	"Ridgeview",
	"Edgefield",
	"Bleasdale",
	"Grafton",
	"Asylum",
	"High School",
];

const items = [
	"EMF Reader",
	"Flashlight",
	"Photo Camera",
	"Lighter",
	"Candle",
	"UV Light",
	"Crucifix",
	"Video Camera",
	"Spirit Box",
	"Salt",
	"Smudge Sticks",
	"Tripod",
	"Strong Flashlight",
	"Motion Sensor",
	"Sound Sensor",
	"Thermometer",
	"Sanity Pills",
	"Ghost Book",
	"Infrared Sensor",
	"Parabolic Mic",
	"Glowstick",
	"Head Camera",
];

function Home() {
	const [users, setUsers] = useState([]);
	const [userField, setUserField] = useState("");
	const [bait, setBait] = useState("");
	const [locale, setLocale] = useState("");

	const addUser = () => {
		if (userField !== "") {
			setUsers([...users, { id, userName: userField, items: [] }]);
			setUserField("");
			id++;
		} else {
			alert("Username cannot be empty");
		}
	};

	const deleteUser = (inputId) => {
		const results = users.filter(({ id }) => {
			return id !== inputId;
		});
		setUsers(results);
	};

	const handleRandomize = (arr = []) => {
		console.log("fired");
		if (arr.length === 0) {
			//Bait
			let baitIndex = Math.floor(Math.random() * users.length);
			const { userName } = users[baitIndex];
			setBait(userName);

			//Location
			let locationIndex = Math.floor(Math.random() * locations.length);
			setLocale(locations[locationIndex]);

			//Items
			users.forEach((user) => {
				const { id } = user;
				let returnedItems = new Set();
				while (returnedItems.size !== 3) {
					let itemsIndex = Math.floor(Math.random() * items.length);
					returnedItems.add(items[itemsIndex]);
				}
				let filtered = users.filter(({ id: userId }) => {
					return userId !== user.id;
				});
				let updatedUser = user;
				updatedUser.items = [...returnedItems];

				setUsers([...filtered, updatedUser]);
			});
		} else {
		}

		//Generate Location
	};

	return (
		<div className="home">
			<div className="home__top">
				<div className="home__top__left">
					<h4>User</h4>
					<Paper elevation={4}>
						<h4>These are the users</h4>
						<h3>⬇</h3>
						{users.length === 0 ? (
							<h4>None</h4>
						) : (
							users.map(({ userName, id }) => {
								return (
									<div className="home__users">
										<div>
											<h4 key={userName}>{userName}</h4>
											<button onClick={() => deleteUser(id)}>❌</button>
										</div>
									</div>
								);
							})
						)}
					</Paper>
				</div>
				<div className="home__top__right">
					<h4>Enter Users</h4>
					<Paper elevation={4}>
						<div className="home__top__right--div">
							<label>Username: </label>
							<input
								type="text"
								onChange={(e) => setUserField(e.target.value)}
								value={userField}
							/>
						</div>
						{users.length >= 4 ? (
							<Button
								disabled
								onClick={addUser}
								variant="contained"
								color="secondary"
							>
								Add User
							</Button>
						) : (
							<Button onClick={addUser} variant="contained" color="secondary">
								Add User
							</Button>
						)}
					</Paper>
				</div>
			</div>
			<div className="home__bottom">
				<div className="home__bottom__top">
					{users.length === 0 ? (
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleRandomize()}
							disabled
						>
							Randomize
						</Button>
					) : (
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleRandomize()}
						>
							Randomize
						</Button>
					)}
				</div>
				<div className="home__bottom__bottom">
					<Paper elevation={4}>
						<h4>Bait</h4>
						<div className="home__bait">
							<h4>{bait}</h4>
						</div>
					</Paper>
					<Paper elevation={4}>
						<h4>Location</h4>
						<div className="home__locations">
							<h4>{locale}</h4>
						</div>
					</Paper>
					<Paper elevation={4}>
						<h4>Items</h4>
						<div className="home__items">
							{users.map(({ userName, id, items }) => {
								return (
									<div className="home__items--user">
										<div className="home__items__left">
											<h4>{userName}</h4>
										</div>
										<div className="home__items__right">
											{items.map((item) => (
												<h6>• {item}</h6>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</Paper>
				</div>
			</div>
		</div>
	);
}

export default Home;
