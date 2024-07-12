const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORSパッケージをインポート
const { Sequelize } = require("sequelize");
const EmployeeModel = require("./models/employee");
const ProjectModel = require("./models/project"); // プロジェクトモデルをインポート
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
