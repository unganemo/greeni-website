import React, { useEffect, useState } from "react";
import styles from "./styles/AddGrocery.module.scss";
import useApi from "../../hooks/useApi";
import {
	postGroceryFailure,
	postGroceryStart,
	postGrocerySuccess,
	getKitchensFailure,
	getKitchensSuccess,
} from "../../redux/reducers/kitchensReducer";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import DropdownList from "../custom-elements/dropdown/DropdownList";

interface AddGroceryProps {
	close: (value: boolean) => void;
	kitchen_id: string | undefined;
	token: string;
	user_id: string | undefined;
	groceries: PureGrocery[];
}

interface AddGroceryResponse {
	expires: string;
	purchased: string;
	name: string;
	id: string;
	has_id: string;
}

const AddGrocery = ({
	close,
	kitchen_id,
	token,
	user_id,
	groceries,
}: AddGroceryProps) => {
	const [selGrocery, setSelGrocery] = useState<PureGrocery>();
	const [name, setName] = useState<string>("");
	const [purchased, setPurchased] = useState<Date>(new Date());
	const [expires, setExpires] = useState<Date>(new Date());
	const [api] = useApi<AddGroceryResponse>();
	const [fetchApi] = useApi<Kitchen[]>();
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	useEffect(() => {
		if (selGrocery !== undefined) {
			setName(selGrocery.name);
			const expiry = new Date();
			expiry.setDate(new Date().getDate() + selGrocery.days);
			setExpires(expiry);
		}
	}, [selGrocery]);

	const handleCancel = () => {
		close(false);
	};
	const handleAdd = async () => {
		const response = await api(
			`http://localhost:3000/api/grocery/add_to_kitchen`,
			"POST",
			token,
			{
				body: {
					kitchen_id: kitchen_id,
					grocery_id: selGrocery?.id,
					expires: expires.toLocaleDateString(),
					purchased: purchased.toLocaleDateString(),
				},
			}
		);
		if (response === undefined) return;
		if (kitchen_id === undefined) return;
		try {
			dispatch(postGroceryStart());

			const today = new Date();
			const expiringSoonThreshold = new Date();
			expiringSoonThreshold.setDate(expiringSoonThreshold.getDate() + 2);
			let expiryType;

			if (expires < today) {
				expiryType = 2;
			} else if (expires <= expiringSoonThreshold) {
				expiryType = 0;
			} else {
				expiryType = 1;
			}
			console.log(response);
			dispatch(
				postGrocerySuccess({
					kitchenId: kitchen_id,
					grocery: {
						id: response.id,
						name: response.name,
						expires: response.expires,
						purchased: response.purchased,
						has_id: response.has_id,
					},
					expiryType: expiryType,
				})
			);
			handleCancel();
		} catch (error) {
			if (error instanceof Error)
				dispatch(postGroceryFailure(error.message));
			else dispatch(postGroceryFailure("An error occured"));
		}
	};

	const handleSetSelGrocery = (grocery: PureGrocery) => {
		setSelGrocery(grocery);
	};

	return (
		<div className={styles.container}>
			<div className={styles.name_container}>
				<input
					placeholder="Name of grocery"
					value={name}
					onChange={(e) => setName(e.target.value)}
				></input>
				<DropdownList
					options={groceries}
					setSelGrocery={handleSetSelGrocery}
					searchValue={name}
				/>
			</div>
			<div className={styles.date_container}>
				<div className={styles.date_row}>
					<p>Purchased</p>
					<input
						placeholder="Set date"
						type="date"
						onChange={(e) => setPurchased(new Date(e.target.value))}
						value={purchased?.toLocaleDateString()}
					></input>
				</div>
				<div className={styles.date_row}>
					<p>Expires</p>
					<input
						placeholder="Set date"
						type="date"
						onChange={(e) => setExpires(new Date(e.target.value))}
						value={expires?.toLocaleDateString()}
					></input>
				</div>
			</div>
			<div className={styles.button_container}>
				<button className={styles.main} onClick={handleAdd}>
					Add
				</button>
				<div></div>
				<button className={styles.secondary} onClick={handleCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AddGrocery;
