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
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name can not be more than 50 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
  },
  motherOccupation: {
    type: String,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherContactNo: {
    type: String,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian name is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: {
    type: String,
    trim: true,
  },
  occupation: {
    type: String,
    trim: true,
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    unique: true,
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
  dateOfBirth: {
    type: String,
  },
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
    trim: true,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, "Permanent address is required"],
  },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profilePicture: {
    type: String,
  },
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
