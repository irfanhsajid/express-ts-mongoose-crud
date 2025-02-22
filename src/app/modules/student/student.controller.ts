import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    // get the data from request body
    const student = req.body;
    // call service function to send this data to database
    const result = await StudentServices.createStudentIntoDB(student);
    // send the response back to client
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const StudentController = {
  createStudent,
};
