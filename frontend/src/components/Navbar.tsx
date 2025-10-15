import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const { username, isAuthenticated, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/Register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };
  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                sx={{ color: "#fff" }}
                onClick={() => navigate("/")}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  Laptops High
                </Typography>
              </Button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <IconButton aria-label="cart" onClick={handleCart}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, gap: 1 }}
                    >
                      <Typography color="white">{username}</Typography>
                      <Avatar
                        alt={username || ""}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleMyOrders}>
                      <Typography sx={{ textAlign: "center" }}>
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#009688" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#009637ff" }}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
