import { PropsWithChildren, Suspense } from "react";
import { Section } from "../../types";
import { lazyImport } from "../../utils";
import Loader from "../Loader/Loader";
// import { CompanySchedule } from "../../features/CompanySchedule/CompanySchedule";

interface Props extends PropsWithChildren {}

export const DashDisplay = ({ children }: Props) => {
  return (
    <div className="dashDisplay">
      <div className="innerDashDisplay">{children}</div>
    </div>
  );
};

// export default Dashboard;
