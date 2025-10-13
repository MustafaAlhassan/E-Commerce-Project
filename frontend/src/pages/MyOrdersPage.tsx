import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
  const { myOrders, getMyOrders } = useAuth();

  console.log(myOrders);
  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">My Orders</Typography>
      {myOrders.map(({address, orderItems, total}) =>(
        <Box sx={{border: 1, borderColor: "gray", borderRadius: 1, padding: 1}}>
          <Typography>Address: {address}</Typography>
          <Typography>Items: {orderItems.length}</Typography>
          <Typography>Total: {parseInt(total).toLocaleString()}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrdersPage;
