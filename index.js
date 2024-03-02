import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Teacher from "./models/Teacher.js";

const app = express();
app.use(cors()); // Это позволяет запросы со всех источников
const port = 3000;

app.use(express.json()); // Для разбора JSON-запросов

const MONGODB =
  "mongodb+srv://shuttle_school:Vr788JIVd7hetpmI@cluster0.qwhu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Замените 'your_database_url' на URL вашей базы данных MongoDB
mongoose
  .connect(MONGODB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Создание нового учителя
app.post("/teachers", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Получение списка учителей с фильтрацией по языку, если указан параметр lang
app.get("/teachers", async (req, res) => {
  try {
    // Проверяем, был ли передан параметр lang в запросе
    const langQuery = req.query.lang ? { lang: req.query.lang } : {};

    // Используем параметр lang для фильтрации, если он есть
    const teachers = await Teacher.find(langQuery);
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Получение учителя по ID
app.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Обновление учителя по ID
app.put("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Удаление учителя по ID
app.delete("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});
