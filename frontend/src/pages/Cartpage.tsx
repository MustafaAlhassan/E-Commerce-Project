import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const renderCartItem = () => (
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              border: 1,
              borderColor: "#dcdcdcff",
              borderRadius: 2,
              padding: 1,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <img src={item.image} width={100} />
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice.toLocaleString()} IQD
                </Typography>
                <Button
                  sx={{ color: "red" }}
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  REMOVE ITEM
                </Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button
                onClick={() =>
                  handleQuantity(item.productId, item.quantity - 1)
                }
              >
                -
              </Button>
              <Button
                onClick={() =>
                  handleQuantity(item.productId, item.quantity + 1)
                }
              >
                +
              </Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box>
          <Typography variant="h5">
            Total Amount: {totalAmount.toLocaleString()} IQD
          </Typography>
        </Box>
      </Box>)

  return (
    <Container fixed sx={{ mt: 3, mb: 3 }}>
      <Box display="flex" flexDirection='row' justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">My Cart</Typography>
        <Button
          sx={{ color: "red" }}
          onClick={() => clearCart()}
        >
          REMOVE ALL ITEM
        </Button>
      </Box>
      {cartItems.length ? renderCartItem() : <Typography sx={{fontSize: "22px"}}>Cart is empty. Please start shopping and add items first</Typography> }
    </Container>
  );
};

export default CartPage;
