const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORSパッケージをインポート
const { Sequelize } = require("sequelize");
const EmployeeModel = require("./models/employee");
const ProjectModel = require("./models/project"); // プロジェクトモデルをインポート
const PasswordModel = require("./models/password");
require("dotenv").config({ path: ".env.local" }); // .env.localファイルから環境変数を読み込む

const app = express();
const port = 3001;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const Employee = EmployeeModel(sequelize);
const Project = ProjectModel(sequelize); // プロジェクトモデルを初期化
const Password = PasswordModel(sequelize);

app.use(bodyParser.json());
app.use(cors()); // CORSを有効にする

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    console.log("Request body:", req.body); // リクエストボディをログに出力
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
    const newPassword = await Password.create({
      employee_number: req.body.employee_number,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Error creating employee:", error); // エラーメッセージをログに出力
    res.status(500).json({
      error: "An error occurred while creating the employee",
      details: error.message,
    });
  }
});

// プロジェクト用のエンドポイントを追加
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      error: "An error occurred while creating the project",
      details: error.message,
    });
  }
});

app.post("/api/passwords", async (req, res) => {
  try {
    const { employee_number, password } = req.body;
    const newPassword = await Password.create({ employee_number, password });
    res.status(201).json(newPassword);
  } catch (error) {
    console.error("Error creating password:", error);
    res.status(500).json({
      error: "An error occurred while creating the password",
      details: error.message,
    });
  }
});

// 既存のコードの後に追加
const bcrypt = require("bcrypt");

// ログインエンドポイント
app.post("/api/login", async (req, res) => {
  try {
    const { employee_number, password } = req.body;
    const employeePassword = await Password.findOne({
      where: { employee_number },
    });

    if (!employeePassword) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employeePassword.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      error: "An error occurred while logging in",
      details: error.message,
    });
  }
});

// パスワード保存用エンドポイント
app.post("/api/passwords", async (req, res) => {
  try {
    const { employee_number, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // パスワードをハッシュ化
    const newPassword = await Password.create({
      employee_number,
      password: hashedPassword,
    });
    res.status(201).json(newPassword);
  } catch (error) {
    console.error("Error creating password:", error);
    res.status(500).json({
      error: "An error occurred while creating the password",
      details: error.message,
    });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.destroy({ where: { id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      error: "An error occurred while deleting the employee",
      details: error.message,
    });
  }
});

// 案件の削除エンドポイント
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({ where: { id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      error: "An error occurred while deleting the project",
      details: error.message,
    });
  }
});

// パスワードの削除エンドポイント
app.delete("/api/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Password.destroy({ where: { id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({
      error: "An error occurred while deleting the password",
      details: error.message,
    });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Employee.update(req.body, { where: { id } });
    if (updated) {
      const updatedEmployee = await Employee.findOne({ where: { id } });
      res.status(200).json(updatedEmployee);
    } else {
      throw new Error("Employee not found");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      error: "An error occurred while updating the employee",
      details: error.message,
    });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ where: { id } });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching the employee",
        details: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
