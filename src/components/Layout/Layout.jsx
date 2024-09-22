import { Container, Box, CssBaseline, GlobalStyles } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Layout = () => {
  return (
    <>
      <CssBaseline />

      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          },
          html: {
            height: "100%",
          },
        }}
      />

      <Header />

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <Container maxWidth="lg" sx={{ padding: "16px" }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
