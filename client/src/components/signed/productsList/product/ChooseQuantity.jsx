import React from "react";
import Styles from "./product.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
export default function ChooseQuantity({ quantity, setQuantity }) {
  return (
    <div className={Styles.itemQuantity}>
      <div className={Styles.counterWrap}>
        <button
          onClick={(e) => (quantity > 0 ? setQuantity(quantity - 1) : null)}
          className={Styles.counterBtn}
        >
          <RemoveIcon />
        </button>
        <span className={Styles.quantityInputWrap}>
          <input
            type="number"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity || 0}
            id={Styles.quantityInput}
          />
        </span>
        <button
          onClick={(e) => setQuantity(quantity + 1)}
          className={Styles.counterBtn}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
}
