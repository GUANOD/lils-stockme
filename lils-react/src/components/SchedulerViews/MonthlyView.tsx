import { Calendar } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Schedule, User } from "../../types";
import { getFirstLastDayInMonth } from "../../utils/getFirstLastDayInMonth";
import Loader from "../Loader/Loader";
import { EmployeeDailyBar } from "./EmployeeDailyBar";
import "./monthlyView.scss";

interface Props {
  schedules: User[];
  setParentDates: React.Dispatch<React.SetStateAction<Date[]>>;
  defaultDate: Date;
  loading: boolean;
}

export type SanSched = {
  start: Date;
  end: Date;
  user: User;
};

export const MonthlyView = ({
  schedules,
  setParentDates,
  defaultDate,
  loading,
}: Props) => {
  const [sanitizedSchedules, setSanitizedSchedules] = useState<SanSched[]>([]);

  useEffect(() => {
    if (schedules) {
      // console.log(schedules);
      let san = sanitizeSchedules(schedules);
      setSanitizedSchedules(san);
    }
  }, [schedules]);

  /**runs on mount to lift date */
  useEffect(() => {
    handleMonthChange();
  }, []);

  const handleMonthChange = (date?: Date) => {
    setParentDates(getFirstLastDayInMonth(date || defaultDate));
  };

  /**
   *
   * Sanitize schedules
   */
  const sanitizeSchedules = (schedules: User[]) => {
    let san: SanSched[] = [];

    schedules.forEach((usr) => {
      usr.schedule.forEach((sched) => {
        san.push({
          start: new Date(sched.scheule_start),
          end: new Date(sched.schedule_end),
          user: usr,
        });
      });
    });

    return san;
  };

  /**
   * Handles the render of each daily column taking the schedules in account
   * @param dayStart
   * @returns
   */
  const scheduleRenderer = (dayStart: Date) => {
    // console.log(sanitizeSchedules);
    let dayEnd = new Date(dayStart);
    let day = dayStart.getDate();
    dayEnd = new Date(dayEnd.setHours(23, 59, 59, 999));

    let thisDaySchedule = sanitizedSchedules.filter((sched) => {
      return sched.start > dayStart && sched.start < dayEnd;
    });

    return (
      <div
        key={Math.random() * 10000}
        title="Add new schedule"
        className="dayCell"
        onClick={(e) => handleDayClick(e, dayStart)}
      >
        {day}
        <div className="EmployeeDailyBarGroup">
          {thisDaySchedule.map((sched) => {
            return (
              <EmployeeDailyBar key={Math.random() * 10000} schedule={sched} />
            );
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
    <div className="monthlyView">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="monthlyUserList">
            {schedules.map((user) => {
              return (
                <div className="monthlyUser">
                  <p
                    style={{ background: user.color }}
                    className="monthlyUserListColor"
                  ></p>
                  <p>{user.user_name}</p>
                </div>
              );
            })}
          </div>
          <Calendar
            month={defaultDate}
            // styles={calendarStyles}
            renderDay={scheduleRenderer}
            // onChange={(e) => console.log(e)}
            // allowLevelChange={false}
            onMonthChange={(e) => {
              handleMonthChange(new Date(e));
              // return e;
            }}
          ></Calendar>
        </>
      )}
    </div>
  );
};
