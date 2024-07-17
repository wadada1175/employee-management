import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/employees/${id}`)
      .then(() => {
        setEmployees(
          employees.filter((employee: { id: number }) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleDeleteP = (id: number) => {
    axios
      .delete(`http://localhost:3001/api/passwords/${id}`)
      .then(() => {
        alert("パスワードが削除されました");
      })
      .catch((error) => {
        console.error("Error deleting password:", error);
      });
  };

  return (
    <div>
      <h1>従業員一覧</h1>
      <ul>
        {employees.map(
          (employee: { id: number; employee_number: string; name: string }) => (
            <li key={employee.id}>
              {employee.employee_number}: {employee.name}
              <Link href={`/editEmployee?id=${employee.id}`}>編集</Link>
              <button
                onClick={() => {
                  handleDelete(employee.id);
                  handleDeleteP(employee.id);
                }}
              >
                削除
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Employees;
