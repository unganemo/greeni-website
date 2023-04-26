import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
	const user_id = "1";
	return (
		<div className={styles.container}>
			<h1>Welcome to My Website</h1>
		</div>
	);
};

export default Home;
