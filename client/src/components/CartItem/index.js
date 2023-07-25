import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { Box, Typography, Grid , IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} md={4}>
        <Box display="flex" justifyContent="center">
          <img src={`/images/${item.image}`} alt="" />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">{item.name}, ${item.price}</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">Qty:</Typography>
            <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
            <IconButton
              aria-label="delete"
              onClick={() => removeFromCart(item)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};


export default CartItem;
