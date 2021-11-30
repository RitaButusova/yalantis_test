import React from "react";
import moment from "moment";

export default function EmpoyeesBirthday(props) {
  const activeEmployees = props.activeEmployees;
  const birthdayEmployees = activeEmployees.sort((a, b) =>
    a.lastName.localeCompare(b.lastName, "en", { sensitivity: "base" })
  );
  const currentMonth = moment().month();
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString("en-US", { month: "long" });
  });
  const sortedMonths = [
    ...months.slice(currentMonth),
    ...months.slice(0, currentMonth),
  ];

  return sortedMonths.map((month) => {
    const employee = birthdayEmployees.filter((employee) => {
      const data = new Date(employee.dob);
      const inxBirthday = data.getMonth();
      return months[inxBirthday] === month;
    });
    const birthdayList = employee.map((employee) => {
      return (
        <>
          <li key={employee.id}>
            {employee.lastName} {employee.firstName} - {employee.dob.getDate()}.{employee.dob.getMonth()}.{employee.dob.getFullYear()}
          </li>
        </>
      );
    });

    const list =
      birthdayList.length > 0 ? <ul>{birthdayList}</ul> : <p>No Employees</p>;

    return (
      <>
        <div>
          <h1>{month}</h1>
          {list}
        </div>
      </>
    );
  });
}
