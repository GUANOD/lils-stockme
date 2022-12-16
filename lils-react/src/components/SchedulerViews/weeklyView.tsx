import { Schedule, Section, User } from "../../types";
import "./weeklyView.scss";
import { getStartEndOfWeek } from "../../utils";
import { DragEvent, useEffect, useState } from "react";
import { EmployeeDailyBar } from "./EmployeeDailyBar";
import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { Loader } from "../Loader/Loader";
import { UserScheduleEdit } from "../userScheduleEdit/userScheduleEdit";
interface Props {
  schedules: User[];
  setParentDates: React.Dispatch<React.SetStateAction<Date[]>>;
  defaultDate: Date;
  loading: boolean;
}

export const WeeklyView = ({
  schedules,
  setParentDates,
  defaultDate,
  loading,
}: Props) => {
  const [weekDates, setWeekDates] = useState<Date[]>(
    getStartEndOfWeek(true, defaultDate)
  );

  const [editingSchedule, setEditingSchedule] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | undefined>();
  const [activeSchedule, setActiveSchedule] = useState<Schedule | undefined>();
  const [existingSchedule, setExistingSchedule] = useState<boolean>(false);

  const handleEdit = (user: User, schedule: Schedule, existing?: boolean) => {
    setActiveUser(user);
    setActiveSchedule(schedule);
    setEditingSchedule(true);
    existing ? setExistingSchedule(true) : "";
  };

  const handleEditFinish = () => {
    setActiveSchedule(undefined);
    setActiveUser(undefined);
    setEditingSchedule(false);
    setExistingSchedule(false);
  };
  /**
   * handles day cell click
   * @param e
   * @param dayStart
   */
  const handleDayClick = (
    e: React.MouseEvent<HTMLElement>,
    dayStart: Date
  ) => {};

  const handleNavigation = (previous?: boolean) => {
    let nextWeekDay = new Date(weekDates[weekDates.length - 1]);
    let toAdd: number;
    if (previous) {
      toAdd = -7;
    } else {
      toAdd = 1;
    }
    nextWeekDay.setDate(nextWeekDay.getDate() + toAdd);
    let navWeek = getStartEndOfWeek(true, nextWeekDay);

    setWeekDates(navWeek);
    setParentDates([navWeek[0], navWeek[navWeek.length - 1]]);
  };

  return (
    <div className="weeklyView">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="navBtnGroup">
            <Button
              leftIcon={<IconChevronLeft />}
              className="btnPrimary"
              onClick={() => {
                handleNavigation(true);
              }}
            >
              Previous
            </Button>
            {}
            <Button
              rightIcon={<IconChevronRight />}
              className="btnPrimary"
              // style={{ border: "2px solid black" }}
              onClick={() => {
                handleNavigation(false);
              }}
            >
              Next
            </Button>
          </div>
          <table>
            <thead>
              <tr>
                {weekDates.map((date: Date, index: number) => {
                  if (index == 0) {
                    return (
                      <>
                        <th></th>
                        <th>
                          <p>
                            {date.toLocaleString("en-FR", {
                              weekday: "short",
                            })}
                          </p>
                          <p>
                            {date.toLocaleDateString("en-FR", {
                              month: "short",
                            })}{" "}
                            {date.getDate()}
                          </p>
                        </th>
                      </>
                    );
                  } else {
                    return (
                      <th>
                        <p>
                          {date.toLocaleString("en-FR", {
                            weekday: "short",
                          })}
                        </p>
                        <p>
                          {date.toLocaleDateString("en-FR", { month: "short" })}{" "}
                          {date.getDate()}
                        </p>
                      </th>
                    );
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {schedules.map((usr) => {
                return (
                  <tr>
                    <th style={{ background: usr.color }}>{usr.user_name}</th>
                    {weekDates.map((day) => {
                      let weekDayUserSchedules =
                        usr.schedule?.filter((sched, index) => {
                          // console.log("index", index, day.getDay());
                          return (
                            new Date(
                              sched.scheule_start.toDateString()
                            ).valueOf() ==
                            new Date(day.toDateString()).valueOf()
                          );
                        }) || [];
                      return (
                        <td
                          className="dailyTd"
                          // onDrop={(e) => handleDrop(e)}
                          // onDragOver={(e) => allowDrop(e)}
                          onClick={(e) => {
                            if ((e.target as Element).className == "dailyTd") {
                              handleEdit(usr, {
                                scheule_start: new Date(
                                  day.setHours(8).valueOf()
                                ),
                                schedule_end: new Date(
                                  day.setHours(17).valueOf()
                                ),
                              });
                            }
                          }}
                        >
                          {weekDayUserSchedules.map((sched) => {
                            let endDateOptions:
                              | Intl.DateTimeFormatOptions
                              | undefined =
                              sched.scheule_start.getDay() ==
                              sched.schedule_end.getDay()
                                ? { hour: "numeric", minute: "numeric" }
                                : {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "numeric",
                                    minute: "numeric",
                                  };
                            return (
                              <p
                                onClick={() => {
                                  handleEdit(usr, sched, true);
                                }}
                                // data-schedule={sched}
                                // draggable
                                // onDragStart={(e) => handleDragTransfer(e)}
                                style={{ background: usr.color }}
                                className="dailyScheduleTag"
                              >
                                {sched.scheule_start.toLocaleString("fr-FR", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}{" "}
                                -{" "}
                                {sched.schedule_end.toLocaleString(
                                  "fr-FR",
                                  endDateOptions
                                )}
                              </p>
                            );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <UserScheduleEdit
        user={activeUser}
        schedule={activeSchedule}
        editing={editingSchedule}
        closeEditing={handleEditFinish}
        existing={existingSchedule}
      />
    </div>
  );
};
