import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import ArticleIcon from "@mui/icons-material/Article";
import NavItem from "./NavItem";
import Image from "next/image";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import RecommendIcon from "@mui/icons-material/Recommend";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
const items = [
  {
    href: "/admin/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/admin/articles",
    icon: <ArticleIcon fontSize="small" />,
    title: "Articles",
  },
  {
    href: "/admin/markets",
    icon: <CurrencyBitcoinIcon fontSize="small" />,
    title: "Markets",
  },
  {
    href: "/admin/videos",
    icon: <OndemandVideoIcon fontSize="small" />,
    title: "Videos",
  },
  {
    href: "/admin/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
  {
    href: "/admin/users",
    icon: <PeopleIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/admin/recommendations",
    icon: <RecommendIcon fontSize="small" />,
    title: "Recommendation",
    subMenu: [
      {
        href: "/admin/recommendations/paid",
        icon: <PaidIcon fontSize="small" />,
        title: "Paid Recommendations",
      },
      {
        href: "/admin/recommendations/unpaid",
        icon: <MoneyOffIcon fontSize="small" />,
        title: "UnPaid Recommendations",
      },
    ],
  },
  {
    href: "/admin/notifications",
    icon: <NotificationsActiveIcon fontSize="small" />,
    title: "Push Notifications",
  },
];

export default function Sidebar(props) {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{ p: 1 }}
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <NextLink href="/" passHref>
              <Image src="/logo.jpg" width={100} height={100} alt="test" />
            </NextLink>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <NavItem items={items} />
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
