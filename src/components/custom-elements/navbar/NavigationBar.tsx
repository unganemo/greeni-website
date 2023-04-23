import React from "react";
import styles from "./styles/NavigationBar.module.css";
import NavbarListItem from "./list-item/NavbarListItem";

const NavigationBar = () => {
  return (
    <div className={styles.container}>
      <h1>
        green<span>i</span>
      </h1>
      <div className={styles.listContainer}>
        <NavbarListItem title="Kitchens" icon="kitchens" route="kitchens" />
        <NavbarListItem title="Recipes" icon="recipes" route="recipes" />
        <NavbarListItem
          title="Shopping lists"
          icon="shopping-lists"
          route="shopping-lists"
        />
      </div>
    </div>
  );
};

export default NavigationBar;
