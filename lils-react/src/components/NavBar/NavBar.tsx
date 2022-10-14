import { Switch } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import React, { useContext } from "react";
import { Theme, ThemeContext } from "../../context/ThemeContext";
// import { ReactComponent as Logo } from "/assets/svg/logo-no-background.svg";
// import { ReactComponent as Logo } from "assets/svg/logo-no-background.svg";
import { ReactComponent as Logo } from "../../../public/assets/svg/logo-no-background.svg";
import "./navBar.scss";
type Props = {};

const NavBar = (props: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <div className="navContainer">
      <Logo className="navLogo" />
      <Switch
        className="themeSwitch"
        size="md"
        onLabel={<IconSun size={16} stroke={2.5} />}
        offLabel={<IconMoonStars size={16} stroke={2.5} />}
        defaultChecked={theme?.theme === Theme.dark}
        onChange={(e) =>
          theme?.setTheme(e.target.checked ? Theme.light : Theme.dark)
        }
      />
    </div>
  );
};

export default NavBar;
