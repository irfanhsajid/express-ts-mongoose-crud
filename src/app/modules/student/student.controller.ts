// student.controller.ts
import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import JoiValidatedStudentSchema from "./student.validation-using-joi";
import { studentValidationSchema } from "./student.validation";

// using joi validaiton schema
export const createStudentUsingJoi = async (req: Request, res: Response) => {
  try {
    // Get the data from request body
    const { student: studentData } = req.body;

    // Validate the data using Joi schema
    const { error, value } = JoiValidatedStudentSchema.validate(studentData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        error: error.details,
      });
    }

    // Call service function to send validated data to database
    const result = await StudentServices.createStudentIntoDB(value);

    // Send successful response back to client
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// using zod validation 
const createStudent = async (req: Request, res: Response) => {
  try {
    // Get the data from request body
    const { student: studentData } = req.body;

    // Validate the data using Zod schema
   
    const zodParsedData = studentValidationSchema.parse(studentData)

 
    // Call service function to send validated data to database
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // Send successful response back to client
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All students fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};