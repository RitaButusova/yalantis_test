import React from "react";
import "./style.css";

import { useState, useEffect } from "react";
import service from "../../services/service";
import EmpoyeesList from "../EmployeesList";
import EmpoyeesBirthday from "../EmpoyeesBirthday";

export default function Employees() {
  const [data, setData] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState(() => {
    const saved = localStorage.getItem("activeEmployees");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    window.localStorage.setItem(
      "activeEmployees",
      JSON.stringify(activeEmployees)
    );
  }, [activeEmployees]);

  const updateActiveEmployees = (value) => {
    setActiveEmployees(value);
  };

  //потрібно доробити
  document.querySelectorAll('input[type="radio"]').forEach((elt) => {
    if (localStorage.getItem(elt.name) === "true") {
      elt.checked = true;
    } else {
      elt.checked = false;
    }
  });

  useEffect(() => {
    (async () => {
      const result = await service();
      const data = result.data.sort((a, b) =>
        a.firstName.localeCompare(b.firstName, "en", { sensitivity: "base" })
      );
      setData(data);
    })();
  }, []);

  return (
    <div className="container">
      <EmpoyeesList
        data={data}
        updateActiveEmployees={updateActiveEmployees}
        activeEmployees={activeEmployees}
      />
      {activeEmployees.length > 0 ? (
        <EmpoyeesBirthday activeEmployees={activeEmployees} />
      ) : (
        <p>Employees List is empty</p>
      )}
    </div>
  );
}
