import React from "react";
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
	const { id } = grocery;
	const [deleteApi] = useApi<number>();
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const deleteGrocery = async () => {
		const response = await deleteApi(
			`http://localhost:3000/api/grocery/${kitchen_id}`,
			"DELETE",
			token,
			{
				body: {
					grocery_id: id,
				},
			}
		);
		if (response === 204) {
			dispatch(deleteGroceryStart());
			try {
				const payload = {
					groceryId: id,
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
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.name_delete_row}>
				<div className={styles.name_container}>
					<p className={styles.name}>{grocery.name}</p>
					<BsFillCircleFill size={".5rem"} color={color} />
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
		</div>
	);
};

export default GroceryCard;
