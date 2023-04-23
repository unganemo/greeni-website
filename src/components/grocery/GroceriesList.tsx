import React, { useMemo } from "react";
import styles from "./styles/GroceriesList.module.scss";
import GroceryCard from "./GroceryCard";
import { MdSort } from "react-icons/md";

interface GroceryListProps {
  groceries: Groceries;
  type: number;
}

const GroceriesList = ({ groceries, type }: GroceryListProps) => {
  const expiryType = useMemo(() => {
    switch (type) {
      case 0:
        return "Expiring soon";
      case 1:
        return "Not expired";
      case 2:
        return "Expired";
      default:
        return "Error";
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.info_row}>
        <h2>{expiryType}</h2>
        <MdSort size={"1.5rem"} className="icon" cursor="pointer" />
      </div>
      <div className={styles.grocery_list}>
        {groceries.map((grocery) => (
          <GroceryCard
            key={grocery.id}
            grocery={grocery}
            color={type === 0 ? "#F6C443" : type === 1 ? "#4EB536" : "#F06565"}
          />
        ))}
      </div>
    </div>
  );
};

export default GroceriesList;
