import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h1>従業員一覧</h1>
      <ul>
        {employees.map(
          (employee: { id: number; employee_number: string; name: string }) => (
            <li key={employee.id}>
              {employee.employee_number}: {employee.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Employees;
