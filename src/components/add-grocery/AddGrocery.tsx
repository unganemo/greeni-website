import React, { useEffect, useState } from "react";
import styles from "./styles/AddGrocery.module.scss";
import useApi from "../../hooks/useApi";

interface AddGroceryProps {
  close: (value: boolean) => void;
  kitchen_id: string | undefined;
  token: string;
}

interface AddGroceryResponse {
  message: string;
}

const AddGrocery = ({ close, kitchen_id, token }: AddGroceryProps) => {
  const [name, setName] = useState<string>("");
  const [purchased, setPurchased] = useState<Date>(new Date());
  const [expires, setExpires] = useState<Date>(new Date());
  const [api, isLoading, error] = useApi<AddGroceryResponse>();

  useEffect(() => {
    console.log(purchased?.toLocaleDateString());
  }, [purchased]);

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
          grocery_name: name,
          expires: expires.toLocaleDateString(),
          purchased: purchased.toLocaleDateString(),
        },
      }
    );
    console.log(response);
  };
  return (
    <div className={styles.container}>
      <div className={styles.name_container}>
        <input
          placeholder="Name of grocery"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
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
