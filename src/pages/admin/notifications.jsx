import Box from "@mui/material/Box";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pushNotification } from "@/store/SettingSlice";

const style = {
  marginBottom: "20px",
};

const Page = () => {
  const [item, setItem] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(pushNotification(item));
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <h1 style={style}>Push Notifications</h1>
          <TextField
            label="Title"
            onChange={handleChange}
            value={item.title}
            sx={style}
          />
          <br />
          <TextField
            label="Body"
            onChange={handleChange}
            value={item.body}
            sx={style}
          />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
