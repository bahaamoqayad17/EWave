import { useState } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import LangMenu from "@/components/admin/LangMenu";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";

const Page = () => {
  const { t } = useTranslation();
  const [item, setItem] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...item, fcm_token: "" }));
  };

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Login`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "neutral.50",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                p: 3,
              }}
            ></Box>
            <Box
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  maxWidth: 500,
                  px: 3,
                  py: "100px",
                  width: "100%",
                }}
              >
                <Typography sx={{ mb: 1 }} variant="h4">
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{ my: 2 }}
                  >
                    <p style={{ margin: 0 }}>{t("welcome")}</p>
                    <LangMenu />
                  </Box>
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                  variant="body2"
                >
                  {t("Sign up on the internal platform")}
                </Typography>
                <Tabs sx={{ mb: 3 }} value={"email"}>
                  <Tab label={t("login")} value="email" />
                </Tabs>
                <TextField
                  margin="normal"
                  fullWidth
                  label={t("email")}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={item.email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label={t("password")}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={item.password}
                  variant="outlined"
                />

                <Button
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {t("login")}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background:
                "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Image src="/login.svg" alt="test" width="700" height="700" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
