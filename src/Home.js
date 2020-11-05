import { Button, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Home.css";

let id = 2;

function Home() {
	const [users, setUsers] = useState([]);
	const [userField, setUserField] = useState("");

	const addUser = () => {
		setUsers([...users, { id, userName: userField }]);
		setUserField("");
		id++;
	};

	const deleteUser = (inputId) => {
		const results = users.filter(({ id }) => {
			return id !== inputId;
		});
		setUsers(results);
	};

	useEffect(() => {
		setUsers([
			{
				id: 1,
				userName: "chris",
			},
		]);
	}, []);

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
											<h4>{id}: </h4>
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
		</div>
	);
}

export default Home;
