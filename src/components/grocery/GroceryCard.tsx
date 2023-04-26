import React, { useEffect, useState } from "react";
import styles from "./styles/GroceryCard.module.scss";
import { BsFillCircleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import useApi from "../../hooks/useApi";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import {
	deleteGroceryStart,
	deleteGrocerySuccess,
	deleteGroceryFailure,
} from "../../redux/reducers/kitchensReducer";
import { CSSTransition } from "react-transition-group";
import { useTransition, animated } from "react-spring";

interface GroceryProps {
	grocery: Grocery;
	color: string;
	expiryType: number;
	kitchen_id: string;
	token: string;
	user_id: string | undefined;
}

interface DeleteGroceryResponse {
	code: number;
}

const GroceryCard = ({
	grocery,
	color,
	expiryType,
	kitchen_id,
	token,
	user_id,
}: GroceryProps) => {
	const { has_id } = grocery;
	const [vis, setVis] = useState<boolean>(false);
	const [deleteApi] = useApi<number>();
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const transition = useTransition(vis, {
		from: { x: 0, y: 50, opacity: 0 },
		enter: { x: 0, y: 0, opacity: 1 },
		leave: { x: 0, y: 50, opacity: 0 },
		config: { duration: 300, tension: 280, friction: 60 },
		unique: true,
	});

	console.log(has_id);

	const deleteGrocery = async () => {
		const response = await deleteApi(
			`http://localhost:3000/api/grocery/delete/${has_id}`,
			"DELETE",
			token
		);
		if (response === 204) {
			setVis(false);
			setTimeout(() => {
				dispatch(deleteGroceryStart());
				try {
					const payload = {
						has_id: grocery.has_id,
						kitchenId: kitchen_id,
						expiryType: expiryType,
					};

					dispatch(deleteGrocerySuccess(payload));
				} catch (error) {
					if (error instanceof Error) {
						dispatch(deleteGroceryFailure(error.message));
					} else {
						dispatch(
							deleteGroceryFailure("An unknown error occurred.")
						);
					}
				}
			}, 300);
		}
	};

	useEffect(() => {
		setVis(true);

		return () => {
			setVis(false);
		};
	}, []);

	return (
		<div>
			{transition((style, item) =>
				item ? (
					<animated.div style={style} className={styles.container}>
						<div className={styles.name_delete_row}>
							<div className={styles.name_container}>
								<p className={styles.name}>{grocery.name}</p>
								<BsFillCircleFill
									size={".5rem"}
									color={color}
								/>
							</div>
							<div className={styles.icon_container}>
								<GrClose
									className={styles.icon}
									cursor="pointer"
									onClick={deleteGrocery}
								/>
							</div>
						</div>
						<div className={styles.date_container}>
							<div className={styles.date_row}>
								<p>Purchased</p>
								<p>{grocery.purchased}</p>
							</div>
							<div className={styles.date_row}>
								<p>Expiring</p>
								<p>{grocery.expires}</p>
							</div>
						</div>
					</animated.div>
				) : null
			)}
		</div>
	);
};

export default GroceryCard;
