import { useState } from "react";
import axios from "axios";

const RegisterProject = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    date: "",
    phone: "",
    contact_person_name: "",
    contact_person_phone: "",
    required_personnel_number: 0,
    required_qualifications: "",
    unit_price_weekday_daytime: 0,
    unit_price_holiday_daytime: 0,
    unit_price_weekday_nighttime: 0,
    unit_price_holiday_nighttime: 0,
    remarks: "",
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
      .post("http://localhost:3001/api/projects", formData)
      .then((response) => {
        alert("案件が登録されました");
      })
      .catch((error) => {
        console.error("Error registering project:", error);
        setError(
          error.response
            ? error.response.data.details
            : "An unexpected error occurred"
        );
      });
  };

  return (
    <div>
      <h1>案件登録</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>会社名</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>日にち</label>
          <input
            type="date"
            name="date"
            value={formData.date}
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
          <label>担当者名</label>
          <input
            type="text"
            name="contact_person_name"
            value={formData.contact_person_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>担当者の電話番号</label>
          <input
            type="text"
            name="contact_person_phone"
            value={formData.contact_person_phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>必要隊員数</label>
          <input
            type="number"
            name="required_personnel_number"
            value={formData.required_personnel_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>必要資格</label>
          <input
            type="text"
            name="required_qualifications"
            value={formData.required_qualifications}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>単価 (平日 日勤)</label>
          <input
            type="number"
            name="unit_price_weekday_daytime"
            value={formData.unit_price_weekday_daytime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>単価 (休日 日勤)</label>
          <input
            type="number"
            name="unit_price_holiday_daytime"
            value={formData.unit_price_holiday_daytime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>単価 (平日 夜勤)</label>
          <input
            type="number"
            name="unit_price_weekday_nighttime"
            value={formData.unit_price_weekday_nighttime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>単価 (休日 夜勤)</label>
          <input
            type="number"
            name="unit_price_holiday_nighttime"
            value={formData.unit_price_holiday_nighttime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>その他・備考欄</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default RegisterProject;
