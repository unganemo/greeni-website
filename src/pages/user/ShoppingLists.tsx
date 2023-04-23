import React from "react";
import { useParams } from "react-router-dom";

const ShoppingLists = () => {
  const { user_id } = useParams();
  return <div>ShoppingLists with user id: {user_id}</div>;
};

export default ShoppingLists;
