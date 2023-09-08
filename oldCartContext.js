import * as React from "react";
import { useState, useContext, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { books } from "./Books.js";
export const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cartItems, setcartItems] = useState([]);
  const [favItems, setfavItems] = useState([]);
  const [bookList, setBookList] = useState(books);
  // const [liked, setLiked] = useState([]);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(false);

  //   add to cart functionality
  const addtoCart = (item) => {
    console.log("adding to cart");
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    // using the find method to check if the item is already in cart

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

  //   reduce quantity from cart

  const reducefromCart = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    // using the find method to check if the item is already in cart

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
  // const deletefromCart = (item) => {
  //   const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  //   // using the find method to check if the item is already in cart

  //   // if the quantity is 1, we can reduce it
  //   if (itemInCart !== -1) {
  //     setcartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  //   } else {
  //     // if the quantity is greater we can decrease it
  //     setcartItems(
  //       cartItems.map((cartItem) =>
  //         cartItem.id === item.id ? { ...cartItem, quantity: 0 } : cartItem
  //       )
  //     );
  //   }
  // };

  // Alert to DELETE ITEM FROM CART
  const deleteCartAlert = (itemInCart) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item ?", [
      {
        text: "Yes",
        onPress: (item) =>
          //  {
          //   // deletefromCart(itemInCart);
          //    const deletefromCart = (item) =>
          {
            const itemInCart = cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            // using the find method to check if the item is already in cart

            // if the quantity is 1, we can reduce it
            if (itemInCart !== -1) {
              setcartItems(
                cartItems.filter((cartItem) => cartItem.id !== item.id)
              );
            } else {
              // if the quantity is greater we can decrease it
              setcartItems(
                cartItems.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: 0 }
                    : cartItem
                )
              );
            }
            //  };
            console.log("delete");
          },
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

  // to store the items in local storage
  //   useEffect(() => {
  //     localStorage.setItem("cart items");
  //   }, [cartItems]);

  //   // to get cart items from browser
  //   useEffect(() => {
  //     const cartItems = localStorage.getItem("cart items");
  //     if (cartItems) {
  //       setcartItems(cartItems);
  //     }
  //   }, []);

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

    // if an item is already in the fave, we can reduce it
    if (itemInFav) {
      setfavItems(favItems.filter((favItem) => favItem.id !== togglebook.id));
    } else {
      setfavItems([
        ...favItems,
        { ...item, quantity: 1, isLiked: !favItems.isLiked },
      ]);
      // setLiked(favItems.id)
    }

    // if (itemInFav) {
    //   setfavItems(
    //     favItems.filter((favItem) => {
    //       if (favItem.id !== item.id) {
    //         return { ...item, quantity: 1, isLiked: true };
    //       }
    //     })
    //   );
    // } else {
    //   setfavItems([...favItems, { ...item, quantity: 1, isLiked: true }]);
    //   // setLiked(favItems.id)
    // }
    // const newItem = liked.filter((val) => {
    //   if (val.id === item.id) {
    //     return { ...val, liked: !val.liked };
    //   } else {
    //     return val;
    //   }
    // });
    // // if (itemInFav) {
    //   setfavItems(fav =>
    //     fav.map((favItem) =>
    //       favItem.id === item.id ? { ...favItem,quantity: 1, liked: !favItem.liked } : favItem
    //     )
    //   );
    // }
    //  else {
    //   setfavItems([...favItems, { ...item, quantity: 1 }]);
    //   // setLiked((isLiked) => !isLiked)
    // }
  };

  // const handleLike = (id) => {
  //   // const itemLiked = liked.includes((likedItem) => likedItem.id === item.id);

  //   // if (itemLiked) {
  //   //   setLiked(isLiked => ({...isLiked , [id] : !isLiked[id]}))
  //   // }
  //   // const itemIn = favItems.includes((favItem) => favItem.id === item.id);
  //   // if (item.id === liked) {
  //   //   console.log("liking");
  //   // setLiked([...liked, id]);
  //   // setLiked(!liked);
  //   // }
  //   if (liked) {
  //     setLiked(!liked);
  //   } else {
  //     setLiked(liked);
  //   }
  // };

  const handleLike = (item) => {
    const newItem = liked.filter((val) => {
      if (val.id === item.id) {
        return { ...val, liked: !val.liked };
      } else {
        return val;
      }
    });
    console.log("liking");
    setLiked(newItem);

    const itemLiked = liked.find((like) => like.id === item.id);
    // using the find method to check if the item is already in cart

    // if an item is already in the cart, we can increase its quantity, if non, return the item
    // if (itemLiked) {
    //   setLiked(
    //     liked.filter((like) =>
    //       like.id !== item.id
    //         ? { ...like, liked: !liked }
    //         : like
    //     )
    //   );
    // }
    // console.log("liking")
    // else {
    //   setLiked([...liked, { ...item, quantity: 1 }]);
    // }
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favItems,
        handleLike,
        liked,
        clearCartAlert,
        clearFavAlert,
        deleteCartAlert,
        setLiked,
        setcartItems,
        setfavItems,
        addtoCart,
        addtoFav,
        reducefromCart,
        // deletefromCart,
        totalItems,
        totalPrice,
        cartTotal,
        loading,
        bookList,
        setLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
