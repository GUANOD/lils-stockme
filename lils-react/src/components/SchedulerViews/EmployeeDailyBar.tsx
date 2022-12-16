import { Schedule } from "../../types";
import "./employeeDailyBar.scss";
import { SanSched } from "./MonthlyView";
type EmployeeDailyBarProps = {
  schedule: SanSched;
};

export const EmployeeDailyBar = ({ schedule }: EmployeeDailyBarProps) => {
  const handleScheduleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    schedule: SanSched
  ) => {
    if ((e.target as Element).className == "EmployeeDailyBar") {
      alert(schedule.start);
    }
  };

  const handleEndDateOptions = () => {
    let endDateOptions: Intl.DateTimeFormatOptions | undefined =
      schedule.start.getDay() == schedule.end.getDay()
        ? { hour: "numeric", minute: "numeric" }
        : {
            hour: "numeric",
            minute: "numeric",
            day: "2-digit",
            month: "2-digit",
          };
    return endDateOptions;
  };

  return (
    <div
      title="Edit this schedule"
      style={
        schedule.user.color ? { backgroundColor: schedule.user.color } : {}
      }
      className="EmployeeDailyBar"
      onClick={(e) => handleScheduleClick(e, schedule)}
    >
      <span>{schedule.user.user_name}</span> :{" "}
      {schedule.start.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })}
      -{schedule.end.toLocaleTimeString("fr-FR", handleEndDateOptions())}
    </div>
  );
};
