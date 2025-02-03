
import React from "react";



interface CartProps {

  items: { name: string; price: number }[];

  onClose: () => void;

}



const Cart: React.FC<CartProps> = ({ items, onClose }) => {

  return (

    <div>

      {/* Cart implementation */}

      <button onClick={onClose}>Close</button>

      <ul>

        {items.map((item, index) => (

          <li key={index}>

            {item.name} - ${item.price}

          </li>

        ))}

      </ul>

    </div>

  );

};



export default Cart;
