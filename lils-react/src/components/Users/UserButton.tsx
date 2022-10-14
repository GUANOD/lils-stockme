import { ActionIcon, Navbar } from "@mantine/core";
import { IconBed, IconChevronRight, IconSettings } from "@tabler/icons";
import "./userButton.scss";
type Props = {};

const UserButton = (props: Props) => {
  return (
    <div className="userButtonContainer">
      <IconBed className="userButtonAvatar" />
      <div className="userButtonInfo">
        <p className="userBtnUserName">Lorem ipsum dolor sit amet</p>
        <p className="userBtnEmail">Lorem@ipsum.com</p>
      </div>
      <ActionIcon>
        <IconSettings className="userButtonChev" />
      </ActionIcon>
    </div>
  );
};

export default UserButton;
