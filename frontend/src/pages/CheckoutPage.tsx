import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleConfirmOrder = async () => {
    const address = addressRef.current?.value;

    if (!address) return;

    const respone = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });

    if (!respone.ok) return;

    navigate("/order-success");
  };

  const renderCartItem = () => (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        border: 1,
        borderColor: "#dcdcdcff",
        borderRadius: 2,
        padding: 1,
      }}
    >
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <img src={item.image} width={50} />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice.toLocaleString()} IQD
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="body2" display="flex" justifyContent="flex-end">
          Total Amount: {totalAmount.toLocaleString()} IQD
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container
      fixed
      sx={{ mt: 3, mb: 3, gap: 1, display: "flex", flexDirection: "column" }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
      />
      {renderCartItem()}
      <Button variant="contained" fullWidth onClick={handleConfirmOrder}>
        Pay Now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
