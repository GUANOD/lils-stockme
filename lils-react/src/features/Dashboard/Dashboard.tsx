import React, { ReactNode, useState } from "react";
import { DashDisplay } from "../../components/DashDisplay/DashDisplay";
import SideBar from "../../components/SideBar/Sidebar";
import { Section } from "../../types";
import roleGuard from "../Auth/guards/roleGuard";
import { sections, selectionDisplay } from "./sections";
import "./dashboard.scss";

type Props = {
  preSelection?: Section;
};

export const Dashboard = ({ preSelection = sections()[0] }: Props) => {
  const [selected, setSelected] = useState<Section>(preSelection);

  return (
    <div className="dashboard">
      <SideBar
        selected={selected}
        setSelected={setSelected}
        sections={sections()}
      />
      <DashDisplay> {selectionDisplay(selected)} </DashDisplay>
    </div>
  );
};

// export default Dashboard;
