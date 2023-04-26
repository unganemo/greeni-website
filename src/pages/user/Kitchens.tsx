import { useEffect, useRef, useState } from "react";
import styles from "./styles/Kitchens.module.scss";
import { useParams } from "react-router-dom";
import GroceriesList from "../../components/grocery/GroceriesList";
import { RiUserAddLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddGrocery from "../../components/add-grocery/AddGrocery";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import {
	getKitchensFailure,
	getKitchensStart,
	getKitchensSuccess,
} from "../../redux/reducers/kitchensReducer";
import useApi from "../../hooks/useApi";
import {
	getGroceryFailure,
	getGroceryStart,
	getGrocerySuccess,
} from "../../redux/reducers/groceryReducer";
import { tokenImport } from "../../token";

const Kitchens = ({}) => {
	//user_id and temp token
	const { user_id } = useParams();

	//Refs
	const buttonRef = useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	//Temp
	const token = tokenImport;

	//States
	const [open, setOpen] = useState(false);
	const [kitchenIndex, setKitchenIndex] = useState<number>(0);
	const kitchens = useSelector((state: RootState) => state.kitchens.kitchens);
	const groceries = useSelector(
		(state: RootState) => state.groceries.groceries
	);
	const [kitchenApi, isLoading, error] = useApi<Kitchen[]>();
	const [groceryApi] = useApi<PureGroceries>();

	//Functions
	const getModalPosition = (): React.CSSProperties => {
		if (!buttonRef.current) {
			return {};
		}

		const buttonRect = buttonRef.current.getBoundingClientRect();
		const modalWidth = 350; // change this to the width of your modal
		const left = buttonRect.right - modalWidth;
		const top = buttonRect.top + buttonRect.height + 8;

		return {
			position: "absolute",
			top,
			left,
		};
	};

	useEffect(() => {
		async function fetchKitchens() {
			dispatch(getKitchensStart());

			try {
				const kitchensData = await kitchenApi(
					`http://localhost:3000/api/kitchen/get/${user_id}`,
					"GET",
					token
				);
				if (
					kitchensData === undefined ||
					kitchensData.length === 0 ||
					!kitchensData[0]
				)
					return;
				setKitchenIndex(0);

				if (kitchensData !== kitchens)
					dispatch(getKitchensSuccess(kitchensData));
			} catch (error) {
				if (error instanceof Error) {
					dispatch(getKitchensFailure(error.message));
				} else {
					dispatch(getKitchensFailure("An unknown error occurred."));
				}
			}
		}

		async function fetchAllGroceries() {
			dispatch(getGroceryStart());
			try {
				const data = await groceryApi(
					`http://localhost:3000/api/grocery`,
					"GET",
					token
				);

				if (
					data === undefined ||
					data.groceries.length === 0 ||
					!data.groceries[0]
				)
					return;

				dispatch(getGrocerySuccess(data.groceries));
			} catch (error) {
				if (error instanceof Error) {
					dispatch(getGroceryFailure(error.message));
				} else {
					dispatch(getGroceryFailure("An unknown error occurred."));
				}
			}
		}

		fetchAllGroceries();
		if (kitchens === undefined || kitchens.length === 0) fetchKitchens();
	}, [dispatch]);

	const toggleOpen = (value: boolean) => {
		setOpen(value);
	};

	if (isLoading && !kitchens) {
		return <div>Loading...</div>;
	}

	if (groceries === undefined) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred: {error}</div>;
	}

	if (kitchens[kitchenIndex] === undefined) {
		return <div>Loading...</div>;
	}

	if (kitchenIndex === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			{open && (
				<div>
					<AddGrocery
						close={toggleOpen}
						kitchen_id={kitchens[kitchenIndex].kitchen_id}
						token={token}
						user_id={user_id}
						groceries={groceries}
					/>
				</div>
			)}
			<div className={styles.top_container}>
				<div className={styles.header_row}>
					<h1>Kitchens</h1>
				</div>
				<div className={styles.kitchen_row}>
					{kitchens?.map((kitchen, i) => {
						return (
							<button
								onClick={() => setKitchenIndex(i)}
								key={kitchen.kitchen_id}
								style={
									kitchens[kitchenIndex]?.kitchen_id ===
									kitchen.kitchen_id
										? {
												backgroundColor: "#4eb536",
												color: "#fff",
										  }
										: {
												backgroundColor: "#e7f4e4",
												color: "#333",
										  }
								}
							>
								{kitchen.kitchen_name}
							</button>
						);
					})}
				</div>
				<div className={styles.info_row}>
					<div className={styles.kitchen_info_container}>
						<h2>Groceries</h2>
					</div>
					<div className={styles.kitchen_button_container}>
						<button
							className={styles.main}
							ref={buttonRef}
							onClick={() => toggleOpen(!open)}
						>
							<IoMdAddCircleOutline
								size="1.5rem"
								className={styles.icon}
							/>
						</button>
						<button className={styles.secondary}>
							<RiUserAddLine
								size="1.5rem"
								color="#4eb536"
								className={styles.icon}
							/>
						</button>
					</div>
				</div>
			</div>
			<div className={styles.grocery_container}>
				{kitchens[kitchenIndex].groceries.map((items, i) => (
					<div className={styles.grocery_list_container} key={i}>
						<GroceriesList
							groceries={items}
							type={i}
							kitchen_id={kitchens[kitchenIndex].kitchen_id}
							token={token}
							title={
								i === 0
									? "Expiring soon"
									: i === 1
									? "Not expired"
									: "Expired"
							}
							user_id={user_id}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Kitchens;
