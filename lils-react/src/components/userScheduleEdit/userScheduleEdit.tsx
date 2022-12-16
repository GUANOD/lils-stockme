import { Badge, Modal, Textarea } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Schedule, User } from "../../types";
import "./userScheduleEdit.scss";
import {
  DateRangePicker,
  DateRangePickerValue,
  TimeRangeInput,
} from "@mantine/dates";
import { ThemeContext } from "../../context/ThemeContext";

type Props = {
  schedule?: Schedule;
  user?: User;
  editing: boolean;
  closeEditing: () => void;
  existing?: boolean;
};

export const UserScheduleEdit = ({
  schedule,
  user,
  editing,
  closeEditing,
  existing,
}: Props) => {
  const theme = useContext(ThemeContext);
  /**
   *
   **/
  useEffect(() => {}, []);

  return (
    <div className="userScheduleEdit">
      <Modal
        className={theme?.theme}
        opened={editing}
        onClose={() => closeEditing()}
        title={
          <>
            Edit <span>{user?.user_name || ""} </span>schedule
          </>
        }
      >
        <div className="userScheduleEditBody">
          <div className="badgesContainer">
            <Badge className="badgePrimary">
              {schedule?.scheule_start.toLocaleDateString("en-EN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
              })}
            </Badge>
            {existing && (
              <Badge color="red" variant="outline">
                Editing existing schedule
              </Badge>
            )}
          </div>

          {/* <h4>Editing schedule for</h4> */}

          {/* <p>{JSON.stringify(schedule)}</p>
        <p>{JSON.stringify(user)}</p> */}
          <TimeRangeInput
            label={`Enter ${user?.user_name || ""}'s schedule for ${
              schedule?.scheule_start.toLocaleDateString() || ""
            } `}
            defaultValue={[
              schedule?.scheule_start || new Date(),
              schedule?.schedule_end || new Date(),
            ]}
          />
          <Textarea label={"Notes"}></Textarea>
        </div>
      </Modal>
    </div>
  );
};
