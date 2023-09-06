import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import AuthGuard from "./AuthGuard";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export default function DashboardLayout(props) {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <AuthGuard>
        <DashboardLayoutRoot>
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <NavBar onSidebarOpen={() => setSidebarOpen(true)} />
        <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </AuthGuard>
    </>
  );
}
