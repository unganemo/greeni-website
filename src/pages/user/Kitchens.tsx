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

const Kitchens = ({}) => {
	//user_id and temp token
	const { user_id } = useParams();
	//Refs
	const buttonRef = useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzkwYWMxYmMtYWNjNS00ODE5LThkMjAtYTZmN2Y0M2M3NWU3IiwiZW1haWwiOiIkMmIkMTAkcEFFbDVjZHNjQ0N5MzdFZEt3bVh2ZVQ4ZGx0cFNxeHR6TFMuWVYzWTVOM01qcHV6eFBXRkciLCJmaXJzdG5hbWUiOiJBbGV4YW5kcm9zIiwibGFzdE5hbWUiOiJLYXJha2l0c29zIiwiaWF0IjoxNjgyMjY1MzU2LCJleHAiOjE2ODIzNTE3NTZ9.XkbY3rvKs7q_kbFQlV7LbMR5Ic28BhvvEK1cDZgw_o4";
	//States
	const [open, setOpen] = useState(false);
	const [selKitchen, setSelKitchen] = useState<Kitchen>();
	const kitchens = useSelector((state: RootState) => state.kitchens.kitchens);
	const [api, isLoading, error] = useApi<Kitchen[]>();

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
				const kitchensData = await api(
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

		fetchKitchens();
	}, [dispatch]);

	//useEffect
	useEffect(() => {
		const initialKitchen = () => {
			if (!kitchens || kitchens.length === 0 || !kitchens[0]) return;
			setSelKitchen(kitchens[0]);
		};
		initialKitchen();
		console.log(kitchens);
	}, [kitchens]);

	const toggleOpen = (value: boolean) => {
		setOpen(value);
	};

	if (isLoading && !kitchens) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred: {error}</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.header_row}>
					<h1>Kitchens</h1>
				</div>
				<div className={styles.kitchen_row}>
					{kitchens?.map((kitchen) => {
						return (
							<button
								onClick={() => setSelKitchen(kitchen)}
								key={kitchen.kitchen_id}
								style={
									selKitchen === kitchen
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
							<p>Add grocery</p>
							<IoMdAddCircleOutline size="1rem" />
						</button>
						{open && (
							<div style={getModalPosition()}>
								<AddGrocery
									close={toggleOpen}
									kitchen_id={selKitchen?.kitchen_id}
									token={token}
								/>
							</div>
						)}

						<button className={styles.secondary}>
							<p>Invite user</p>
							<RiUserAddLine size="1rem" color="#4eb536" />
						</button>
					</div>
				</div>
			</div>
			<div className={styles.grocery_container}>
				{selKitchen?.groceries.map((items, i) => (
					<div className={styles.grocery_list_container} key={i}>
						<GroceriesList groceries={items} type={i} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Kitchens;
