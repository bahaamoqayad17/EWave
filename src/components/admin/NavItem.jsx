import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function NavItem(props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [itemsState, setItemsState] = useState({});

  const style = {
    borderRadius: 1,
    justifyContent: "flex-start",
    textAlign: "left",
    textTransform: "none",
    width: "100%",
  };

  const handleItemsClick = (key) => {
    let holder = itemsState;
    holder[key] = !holder[key];
    setItemsState({ ...holder });
  };
  const nestedChildren = (item, item_key) => {
    if (item == null) return;
    if (item.subMenu) {
      return (
        <div key={item_key}>
          <ListItemButton
            sx={{
              ":hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            onClick={() => handleItemsClick(item_key)}
          >
            <ListItemIcon
              sx={{
                color: router.pathname === item.href ? "#10B981" : "#D1D5DB",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ color: "#D1D5DB" }} primary={t(item.title)} />
            {itemsState[item_key] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={itemsState[item_key]} timeout="auto" unmountOnExit>
            <List sx={{ pl: 2 }} component="div" disablePadding>
              {item.subMenu.map((item, index) =>
                nestedChildren(item, `${index}_${t(item.title)}`)
              )}
            </List>
          </Collapse>
        </div>
      );
    } else {
      return (
        <NextLink
          href={item.href}
          style={{
            width: "100%",
            textDecoration: "none",
          }}
        >
          <ListItemButton
            style={{
              backgroundColor:
                router.pathname === item.href ? "rgba(255,255,255, 0.08)" : "",
              color: router.pathname === item.href ? "#10B981" : "#D1D5DB",
            }}
            sx={{
              ":hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
            key={item_key}
          >
            <ListItemIcon
              sx={{
                color: router.pathname === item.href ? "#10B981" : "#D1D5DB",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={t(item.title)} />
          </ListItemButton>
        </NextLink>
      );
    }
  };
  return (
    <List sx={style} component="nav" aria-labelledby="nested-list-subheader">
      {props.items?.map((item, index) =>
        nestedChildren(item, `${index}_${t(item.title)}`)
      )}
    </List>
  );
}
