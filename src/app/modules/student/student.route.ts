import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// create a new Student in the database
router.post("/create-student", StudentController.createStudent);

// get all the students info
router.get("/all", StudentController.getAllStudents);

// get a single student info
router.get("/:studentId", StudentController.getSingleStudent);

export const StudentRoutes = router;

// PATTERN :: routes > controller > service > model > interface
