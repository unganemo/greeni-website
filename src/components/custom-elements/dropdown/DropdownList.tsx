import React, { useState } from "react";
import styles from "./styles/DropdownList.module.scss";

interface DropdownListProps {
	options: PureGrocery[];
	setSelGrocery: (grocery: PureGrocery) => void;
	searchValue: string;
}

const DropdownList = ({
	options,
	setSelGrocery,
	searchValue,
}: DropdownListProps) => {
	const filteredOptions = options.filter((option) =>
		option.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<div className={styles.container}>
			<ul className={styles.list_container}>
				{filteredOptions.map((option) => (
					<li
						key={option.id}
						onClick={() => setSelGrocery(option)}
						className={styles.list_item}
					>
						{option.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DropdownList;
