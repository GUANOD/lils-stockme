import { Styles } from "@mantine/core";
import { Calendar, CalendarBaseStylesNames } from "@mantine/dates";
import { PropsWithChildren, Suspense } from "react";
import { Schedule, Section } from "../../types";
import { genRandomHSL } from "../../utils";
import "./companySchedule.scss";
// import Loader from "../Loader/Loader";

// const { AppRoutes } = lazyImport(() => import("./routes"), "AppRoutes");

interface Props {
  // selected: Section;
}

type EmployeeDailyBarProps = {
  schedule: Schedule;
};

let schedules: Schedule[] = [
  {
    id: 20,
    start: new Date("december 12 2022, 08:00"),
    end: new Date("december 12 2022, 15:00"),
    user: {
      user_id: 1,
      user_email: "fafa",
      user_name: "john",
      user_startContract: new Date(),
      user_username: "fam",
      color: genRandomHSL(),
      role_id: 2,
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
  {
    id: 22,
    start: new Date("december 12 2022, 09:00"),
    end: new Date("december 12 2022, 11:00"),
    user: {
      user_id: 2,
      user_email: "fafa",
      user_name: "fif",
      color: genRandomHSL(),
      user_startContract: new Date(),
      user_username: "fam",
      role_id: 2,
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
  {
    id: 22,
    start: new Date("december 12 2022, 09:00"),
    end: new Date("december 12 2022, 11:00"),
    user: {
      user_id: 2,
      user_email: "fafa",
      user_name: "fif",
      color: genRandomHSL(),
      user_startContract: new Date(),
      user_username: "fam",
      role_id: 2,
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
  {
    id: 22,
    start: new Date("december 12 2022, 09:00"),
    end: new Date("december 12 2022, 11:00"),
    user: {
      user_id: 2,
      user_email: "fafa",
      user_name: "fif",
      color: genRandomHSL(),
      user_startContract: new Date(),
      user_username: "fam",
      role_id: 2,
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
  {
    id: 22,
    start: new Date("december 12 2022, 09:00"),
    end: new Date("december 12 2022, 11:00"),
    user: {
      user_id: 2,
      user_email: "fafa",
      user_name: "fif",
      color: genRandomHSL(),
      user_startContract: new Date(),
      user_username: "fam",
      role_id: 2,
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
  {
    id: 22,
    start: new Date("december 12 2022, 09:00"),
    end: new Date("december 12 2022, 11:00"),
    user: {
      user_id: 2,
      user_email: "fafa",
      user_name: "fif",
      user_startContract: new Date(),
      user_username: "fam",
      role_id: 2,
      color: genRandomHSL(),
      company: {
        company_id: 21,
        company_address: "",
        company_name: "name",
        company_reference: "sdfa",
        company_type_id: 1,
      },
    },
  },
];

export const EmployeeDailyBar = ({ schedule }: EmployeeDailyBarProps) => {
  const handleScheduleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    schedule: Schedule
  ) => {
    if ((e.target as Element).className == "EmployeeDailyBar") {
      alert(schedule.start);
    }
  };

  return (
    <div
      style={
        schedule.user.color ? { backgroundColor: schedule.user.color } : {}
      }
      className="EmployeeDailyBar"
      onClick={(e) => handleScheduleClick(e, schedule)}
    >
      {schedule.user.user_name}
    </div>
  );
};

// const calendarStyles: Styles<CalendarBaseStylesNames, Record<string, any>> = {
//   cell: {
//     border: "1px solid red",
//   },
//   day: { borderRadius: 0, height: 130, width: 150 },
// };

export const CompanySchedule = (props: Props) => {
  /**
   * Handles the render of each daily column taking the schedules in account
   * @param dayStart
   * @returns
   */
  const scheduleRenderer = (dayStart: Date) => {
    let dayEnd = new Date(dayStart);
    let day = dayStart.getDate();
    dayEnd = new Date(dayEnd.setHours(23, 59, 59, 999));

    let thisDaySchedule = schedules.filter((sched) => {
      return sched.start > dayStart && sched.end < dayEnd;
    });

    return (
      <div className="dayCell" onClick={(e) => handleDayClick(e, dayStart)}>
        {day}
        <div className="EmployeeDailyBarGroup">
          {thisDaySchedule.map((sched) => {
            return <EmployeeDailyBar schedule={sched} />;
          })}
        </div>
      </div>
    );
  };

  /**
   * handles day cell click
   * @param e
   * @param dayStart
   */
  const handleDayClick = (e: React.MouseEvent<HTMLElement>, dayStart: Date) => {
    if (
      (e.target as Element).className == "dayCell" ||
      (e.target as Element).className == "EmployeeDailyBarGroup"
    ) {
      alert("clicky");
    }
  };

  return (
    <div className="companySchedule">
      <Calendar
        // styles={calendarStyles}
        renderDay={scheduleRenderer}
      ></Calendar>
    </div>
  );
};
