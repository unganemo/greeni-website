import React from "react";
import styles from "./styles/GroceryCard.module.scss";
import { BsFillCircleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

interface GroceryProps {
  grocery: Grocery;
  color: string;
}

const GroceryCard = ({ grocery, color }: GroceryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.name_delete_row}>
        <div className={styles.name_container}>
          <p className={styles.name}>{grocery.name}</p>
          <BsFillCircleFill size={".5rem"} color={color} />
        </div>
        <div className={styles.icon_container}>
          <GrClose className={styles.icon} cursor="pointer" />
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
