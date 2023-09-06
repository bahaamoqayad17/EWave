import DashboardLayout from "@/components/admin/DashboardLayout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";

const style = {
  marginBottom: "20px",
};

const Page = () => {
  const [item, setItem] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateSetting(item));
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
          <Typography sx={{ m: 1, mb: 3 }} variant="h3">
            Settings
          </Typography>
          <TextField
            label={"Privacy Policy"}
            multiline
            rows={7}
            fullWidth
            sx={style}
            onChange={handleChange}
          />
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
