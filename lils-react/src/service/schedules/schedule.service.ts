import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Schedule, User } from "../../types";
import { genRandomHSL } from "../../utils";
import storage from "../../utils/storage";
import { scheduleRoutes } from "./routes";

export const getEmployeesSchedule = (dates: Date[], token: string) => {
  return new Promise((resolve, reject) => {
    fetch(scheduleRoutes.allEmployeeSchedule, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dates),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.res) {
          data.res.forEach((user: User) => {
            let colors = storage.getColor() || {};
            if (!user.color) {
              if (!colors || !colors[user.user_id]) {
                user.color = genRandomHSL();
                // if(!colors) colors = {};
                colors[user.user_id] = user.color;
                storage.setColor(colors);
              } else {
                user.color = colors[user.user_id];
              }
            }
            if (user.user_endContract) {
              user.user_endContract = new Date(user.user_endContract);
            }
            if (user.user_startContract) {
              user.user_startContract = new Date(user.user_startContract);
            }
            if (user.schedule) {
              user.schedule.forEach((sched: Schedule) => {
                if (sched.schedule_end) {
                  sched.schedule_end = new Date(sched.schedule_end);
                }
                if (sched.scheule_start) {
                  sched.scheule_start = new Date(sched.scheule_start);
                }
              });
            }
          });
          resolve(data);
        } else {
          throw data;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
