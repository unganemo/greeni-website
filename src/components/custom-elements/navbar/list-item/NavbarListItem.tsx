import React from "react";
import styles from "./styles/NavigationListItem.module.css";
import { MdKitchen } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { FaCartPlus, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarListItem = ({ icon, title, route }: NavbarListItemProps) => {
  const user_id = "3029a1bf-b6fe-40e7-bc1f-46714f625725";
  let selectedIcon;

  switch (icon) {
    case "kitchens":
      selectedIcon = <MdKitchen />;
      break;
    case "shopping-lists":
      selectedIcon = <IoMdListBox />;
      break;
    case "recipes":
      selectedIcon = <FaUtensils />;
      break;
    case "add-groceries":
      selectedIcon = <FaCartPlus />;
      break;
    default:
      selectedIcon = null;
  }
  return (
    <Link
      className={styles.container}
      style={{ textDecoration: "none" }}
      to={`/${route}/${user_id}`}
    >
      {selectedIcon}
      <p className={styles.title}>{title}</p>
    </Link>
  );
};

export default NavbarListItem;
