import { Button, Navbar } from "@mantine/core";
import { Section } from "../../types";
import UserButton from "../Users/UserButton";
import "./sideBar.scss";
type Props = {
  selected: Section;
  sections: Section[];
  setSelected: React.Dispatch<React.SetStateAction<Section>>;
};

const SideBar = ({ selected, sections, setSelected }: Props) => {
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
