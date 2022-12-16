import { Radio, Styles } from "@mantine/core";
import { Calendar, CalendarBaseStylesNames } from "@mantine/dates";
import { IconLicenseOff } from "@tabler/icons";
import {
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { MonthlyView } from "../../components/SchedulerViews/MonthlyView";
import { WeeklyView } from "../../components/SchedulerViews/weeklyView";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import { getEmployeesSchedule } from "../../service/schedules/schedule.service";
import { Schedule, Section, User } from "../../types";
import { genRandomHSL } from "../../utils";
import "./companySchedule.scss";
// import Loader from "../Loader/Loader";

// const { AppRoutes } = lazyImport(() => import("./routes"), "AppRoutes");

type CompanyScheduleProps = {};

export const CompanySchedule = ({}: CompanyScheduleProps) => {
  const [view, setView] = useState<string>("monthlyView");
  const [schedules, setSchedules] = useState<User[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const errorContext = useContext(ErrorContext);

  let { data, loading, error } = useAuthenticatedFetch(
    getEmployeesSchedule,
    [dates],
    false,
    { dates }
  );

  /**
   * HANDLE RETURN FROM AUTHFETCH
   **/
  useEffect(() => {
    if (data) {
      setSchedules(data);
    }
  }, [data]);

  /**
   * HANDLE ERROR FROM AUTHFETCH
   */
  useEffect(() => {
    if (error) {
      errorContext?.setError({ message: error, icon: <IconLicenseOff /> });
    }
  }, [error]);

  const renderView = () => {
    switch (view) {
      case "monthlyView":
        return (
          <MonthlyView
            defaultDate={dates[0] || new Date()}
            schedules={schedules}
            setParentDates={setDates}
            loading={loading}
          ></MonthlyView>
        );
      case "weeklyView":
        return (
          <WeeklyView
            schedules={schedules}
            setParentDates={setDates}
            defaultDate={dates[0] || new Date()}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="companySchedule">
      <div className="radioChoice">
        <Radio.Group
          name="favoriteFramework"
          label="Select your preferred View"
          value={view}
          onChange={setView}
          // description="This is anonymous"
          // withAsterisk
        >
          <Radio value="monthlyView" label="Monthly view" />
          <Radio value="weeklyView" label="Weekly View" />
        </Radio.Group>
      </div>

      {renderView()}
    </div>
  );
};
