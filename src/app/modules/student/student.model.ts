import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  fatherContactNo: { type: String, required: true },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String },
  occupation: { type: String },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: ["male", "female"], // enum
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // enum
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profilePicture: { type: String },
  isActive: ["active", "blocked"], // enum
});

export const StudentModel = model<Student>("Student", studentSchema);
