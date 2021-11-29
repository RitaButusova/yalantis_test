import React from "react";
import "./style.css";

export default function EmpoyeesList(props) {
  const { activeEmployees, updateActiveEmployees } = props;

  document.querySelectorAll('input[type="radio"]').forEach((elt) => {
    elt.addEventListener("change", (e) => {
      localStorage.setItem(e.target.name, e.target.value);
    });
  });

  const hundlerChangeValue = (e) => {
    const elSearch = e.target.name;
    if (e.target.value === "true") {
      const selectedActiveEl = data.find(
        (employee) => employee.id === e.target.name
      );
      updateActiveEmployees((activeEmployees) => [
        selectedActiveEl,
        ...activeEmployees,
      ]);
      const nodeEmployee = document.getElementById(elSearch);
      nodeEmployee.classList.add("active");
      nodeEmployee.classList.remove("not_active");
    }
    if (e.target.value === "false") {
      const removeEl = activeEmployees.find(
        (employee) => employee.id === e.target.name
      );
      const indexRemoveEl = activeEmployees.indexOf(removeEl);
      updateActiveEmployees((activeEmployees) => {
        activeEmployees.splice(indexRemoveEl, 1);
        return activeEmployees;
      });
      const nodeEmployee = document.getElementById(elSearch);
      nodeEmployee.classList.remove("active");
      nodeEmployee.classList.add("not_active");
    }
  };

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const data = props.data;

  return alphabet.map((alpha) => {
    const employee = data.filter((employee) => employee.firstName[0] === alpha);
    const employeesList = employee.map((employee) => {
      return (
        <>
          <li key={employee.id}>
            <p id={employee.id}>
              {employee.firstName} {employee.lastName}
            </p>
          </li>
          <div>
            <label>
              <input
                type="radio"
                value={false}
                name={employee.id}
                defaultChecked
                onChange={hundlerChangeValue}
              />
              <span>not active</span>
            </label>
            <label>
              <input
                type="radio"
                value={true}
                name={employee.id}
                onChange={hundlerChangeValue}
              />
              <span>active</span>
            </label>
          </div>
        </>
      );
    });

    const list =
      employeesList.length > 0 ? <ul>{employeesList}</ul> : <p>No Employees</p>;

    return (
      <>
        <div>
          <h1>{alpha}</h1>
          {list}
        </div>
      </>
    );
  });
}
