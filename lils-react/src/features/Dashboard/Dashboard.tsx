import React, { ReactNode, useContext, useState } from "react";
import { DashDisplay } from "../../components/DashDisplay/DashDisplay";
import SideBar from "../../components/SideBar/Sidebar";
import { Section } from "../../types";
import roleGuard from "../Auth/guards/roleGuard";
import { sections, selectionDisplay } from "./sections";
import "./dashboard.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  preSelection?: Section;
};

export const Dashboard = ({ preSelection }: Props) => {
  const auth = useContext(AuthContext);
  const [allowedSections, setAllowedSections] = useState(sections(auth));
  const navigate = useNavigate();

  const [selected, setSelected] = useState<Section>(
    preSelection || allowedSections[0]
  );

  const handleSelection = (section: Section) => {
    navigate("/dashboard/" + section.path);
    setSelected(section);
  };

  return (
    <div className="dashboard">
      <SideBar
        selected={selected}
        setSelected={(section: Section) => handleSelection(section)}
        sections={sections(auth)}
      />
      <DashDisplay> {selectionDisplay(selected)} </DashDisplay>
    </div>
  );
};

// export default Dashboard;
