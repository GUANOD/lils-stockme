/**
 * THIS FILE CONTAINS ALL INFORMATION PERTAINING TO THE DASHBOARD SECTIONS
 */

import {
  IconBuildingStore,
  IconBuildingWarehouse,
  IconCalendar,
  IconCalendarTime,
  IconDatabase,
  IconHome,
  IconUsers,
} from "@tabler/icons";
import { ReactNode } from "react";
import Loader from "../../components/Loader/Loader";
import { Section } from "../../types";
import { lazyImport } from "../../utils";
import roleGuard from "../Auth/guards/roleGuard";
import { Suspense } from "react";

const { CompanySchedule } = lazyImport(
  () => import("../CompanySchedule/CompanySchedule"),
  "CompanySchedule"
);

/**
 *
 * available sections
 */

const defaultSections: Section[] = [
  { name: "Home", icon: <IconHome />, role: 4, path: "" },
  { name: "My schedule", icon: <IconCalendar />, role: 4, path: "schedule" },
  {
    name: "Company schedule",
    icon: <IconCalendarTime />,
    role: 3,
    path: "company_schedule",
  },
  { name: "Employees", icon: <IconUsers />, role: 3, path: "employees" },
  { name: "Stock", icon: <IconBuildingWarehouse />, role: 3, path: "stock" },
  { name: "Stores", icon: <IconBuildingStore />, role: 3, path: "stores" },
];

/**
 * calculates the react element to render given the selected section
 * @param selected current selected section
 * @returns lazy loaded ReactNode with the corresponding element
 */
export const selectionDisplay = (selected: Section): ReactNode => {
  let displayedSection: ReactNode = <></>;

  switch (selected.name) {
    case "Home":
      displayedSection = <></>;
      break;
    case "My schedule":
      displayedSection = <></>;
      break;
    case "Company schedule":
      displayedSection = <CompanySchedule />;
      break;
    case "Employees":
      displayedSection = <></>;
      break;
    case "Stock":
      displayedSection = <></>;
      break;
    case "Stores":
      displayedSection = <></>;
      break;
  }

  return <Suspense fallback={<Loader />}>{displayedSection}</Suspense>;
};

/**
 *
 * @returns the sections the user is allowed to see
 */
export const sections = (
  auth: {
    token: string | null;
    role: number | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRole: React.Dispatch<React.SetStateAction<number | null>>;
  } | null
): Section[] => {
  let allowedSections = defaultSections.filter((sec) => {
    return roleGuard(auth, sec.role);
  });
  return allowedSections;
};
