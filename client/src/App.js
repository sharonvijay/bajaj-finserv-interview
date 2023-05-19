import React, { useEffect, useState } from "react";
import EmployeeTable from "../src/components/EmployeeTable";

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch JSON data from the API or local file
    fetch("http://localhost:5000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h1>Employee Table</h1>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default App;
