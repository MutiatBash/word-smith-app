import * as React from "react";
import { useState, useContext, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { books } from "./Books.js";
// import Toast from "react-native-root-toast";
import Toast, { BaseToast } from "react-native-toast-message";

export const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cartItems, setcartItems] = useState([]);
  const [favItems, setfavItems] = useState([]);
  const [bookList, setBookList] = useState(books);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //   add to cart functionality
  const addtoCart = (item) => {
    console.log("adding to cart");
    // using the find method to check if the item is already in cart
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    // if an item is already in the cart, we can increase its quantity, if non, return the item
    if (itemInCart) {
      setcartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setcartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // TO SHOW TOAST
  function showToast(item) {
    // const toastConfig = {
    //   info: ({ text1, props, ...rest }) => (
    //     <BaseToast {...rest} style={{ borderLeftColor: "#411465" }} />
    //   ),
    // };

    Toast.show({
      type: "info",
      // text1: "Added to cart",
      text1: `Added ${item.title} to cart`,
      visibilityTime: 2000,
      autoHide: true,
      backgroundColor: "white",
      color: "#411465",
      position: "top",
      topOffset: 60,
      // duration: 200,
    });
  }

  //   reduce quantity from cart

  const reducefromCart = (item) => {
    // using the find method to check if the item is already in cart
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    // if the quantity is 1, we can reduce it
    if (itemInCart.quantity === 1) {
      setcartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // if the quantity is greater we can decrease it
      setcartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // totally delete from cart
  const deletefromCart = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    // using the find method to check if the item is already in cart

    // if the quantity is 1, we can reduce it
    if (itemInCart !== -1) {
      setcartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // if the quantity is greater we can decrease it
      setcartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: 0 } : cartItem
        )
      );
    }
  };

  // Alert to DELETE ITEM FROM CART
  const deleteCartAlert = (item) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item ?", [
      {
        text: "Yes",
        onPress: () => deletefromCart(item),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // CLEAR CART FUNCTION
  const clearCartAlert = () => {
    Alert.alert("Clear Cart", "Are you sure you want to clear your cart ?", [
      {
        text: "Yes",
        onPress: () => {
          setcartItems([]);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  //   get total items in cart
  function totalItems() {
    return cartItems.reduce((total, eachItem) => total + eachItem.quantity, 0);
  }

  //   get subtotal price of items in cart
  function totalPrice() {
    return cartItems.reduce((total, eachPrice) => total + eachPrice.price, 0);
  }

  // get total cost of items in cart
  function cartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // FAVOURITES FUNCTIONALITY

  //   add to favourite functionality
  const addtoFav = (item) => {
    console.log("adding to fav");
    const updateBook = bookList.map((book) =>
      book.id === item.id ? { ...book, isLiked: !book.isLiked } : book
    );

    const togglebook = updateBook.find((book) => book.id === item.id);
    setBookList(updateBook);

    // using the find method to check if the item is already in favourites
    const itemInFav = favItems.find((favItem) => favItem.id === togglebook.id);

    // if an item is already in the fav, we can remove it
    if (itemInFav) {
      setfavItems(favItems.filter((favItem) => favItem.id !== togglebook.id));
    } else {
      setfavItems([
        ...favItems,
        { ...item, quantity: 1, isLiked: !favItems.isLiked },
      ]);
    }
  };

  // clear and reset favs

  function clearFav() {
    setfavItems([]);

    // to reset the liked color
    const resetBooks = bookList.map((book) => ({ ...book, isLiked: false }));
    setBookList(resetBooks);
  }

  // clear favourites
  const clearFavAlert = () => {
    Alert.alert(
      "Clear Favourites",
      "Are you sure you want to clear your favourites ?",
      [
        {
          text: "Yes",
          onPress: () => {
            clearFav();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // clear favourites
  const removeFavAlert = (item) => {
    // const booktoremove = favItems.find((favItem) => favItem.id === item.id);
    // if (booktoremove) {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove this item from your favourites ?`,
      [
        {
          text: "Yes",
          onPress: () => {
            addtoFav(item);
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
    // }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favItems,
        clearCartAlert,
        clearFavAlert,
        removeFavAlert,
        deleteCartAlert,
        setcartItems,
        setfavItems,
        showToast,
        addtoCart,
        addtoFav,
        reducefromCart,
        deletefromCart,
        totalItems,
        totalPrice,
        cartTotal,
        loading,
        success,
        setSuccess,
        bookList,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
