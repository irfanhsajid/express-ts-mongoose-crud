import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: { type: String },
  occupation: { type: String },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profilePicture: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "{VALUE} is not a valid status",
    },
    default: "active",
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
