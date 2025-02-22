import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// will call the controller method createStudent
router.post("/create-student", StudentController.createStudent);
