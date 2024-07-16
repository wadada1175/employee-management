import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    employee_number: "",
    name: "",
    address: "",
    phone: "",
    birth_date: "",
    email: "",
    employment_type: "",
    employment_start_date: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    qualifications: "",
    ng_list: false,
    banned_info: false,
    self_ban: false,
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/employees", formData)
      .then((response) => {
        alert("従業員が登録されました");
        // パスワードを保存
        axios
          .post("http://localhost:3001/api/passwords", {
            employee_number: formData.employee_number,
            password: formData.password,
          })
          .then(() => {
            alert("パスワードが保存されました");
          })
          .catch((error) => {
            console.error("Error saving password:", error);
          });
      })
      .catch((error) => {
        console.error("Error registering employee:", error);
        setError(
          error.response
            ? error.response.data.details
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <div>
      <h1>従業員登録</h1>
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
          <label>氏名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>住所</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>電話番号</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>生年月日</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>雇用形態</label>
          <input
            type="text"
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>雇用開始日</label>
          <input
            type="date"
            name="employment_start_date"
            value={formData.employment_start_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>緊急連絡先 属柄</label>
          <input
            type="text"
            name="emergency_contact_relationship"
            value={formData.emergency_contact_relationship}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>緊急連絡先 電話番号</label>
          <input
            type="text"
            name="emergency_contact_phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>資格情報</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>NG隊員リスト</label>
          <input
            type="checkbox"
            name="ng_list"
            checked={formData.ng_list}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>出禁情報</label>
          <input
            type="checkbox"
            name="banned_info"
            checked={formData.banned_info}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>自首出禁</label>
          <input
            type="checkbox"
            name="self_ban"
            checked={formData.self_ban}
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
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Register;
