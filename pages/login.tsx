import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    employee_number: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", formData)
      .then((response) => {
        alert("ログイン成功");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError(
          error.response
            ? error.response.data.details
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>隊員番号</label>
          <input
            type="text"
            name="employee_number"
            value={formData.employee_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
