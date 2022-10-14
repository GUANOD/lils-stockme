import { Button, Navbar } from "@mantine/core";
import {
  IconBuildingStore,
  IconBuildingWarehouse,
  IconCalendar,
  IconCalendarTime,
  IconDatabase,
  IconHome,
  IconUsers,
} from "@tabler/icons";
import { useState } from "react";
import { Section } from "../../types";
import UserButton from "../Users/UserButton";
import "./sideBar.scss";
type Props = {};

export const sections: Section[] = [
  { name: "Home", icon: <IconHome /> },
  { name: "My schedule", icon: <IconCalendar /> },
  { name: "Company schedule", icon: <IconCalendarTime /> },
  { name: "Employees", icon: <IconUsers /> },
  { name: "Stock", icon: <IconBuildingWarehouse /> },
  { name: "Stores", icon: <IconBuildingStore /> },
];

const SideBar = (props: Props) => {
  const [selected, setSelected] = useState<Section>(sections[1]);
  return (
    <div className="sideBarContainer">
      <Navbar>
        <Navbar.Section>
          {sections.map((section) => {
            return (
              <Button
                className={`${
                  section.name == selected.name ? "selected" : ""
                } sectionBtn`}
                leftIcon={section.icon}
                onClick={() => setSelected(section)}
              >
                {section.name}
              </Button>
            );
          })}
        </Navbar.Section>
        <Navbar.Section>
          <div className="sideBarDivider">
            <UserButton />
          </div>
        </Navbar.Section>
      </Navbar>
    </div>
  );
};

export default SideBar;
