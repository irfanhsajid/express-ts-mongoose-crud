import { Schema, model } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

import validator from "validator";

// capitalizeString function
const capitalizeString = (value: string) => {
  if (!value) return value;
  return value
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

//custom validator function for name
const nameValidator = {
  validator: function (value: string) {
    return /^[a-zA-Z ]+$/.test(value);
  },
  message: (props: { value: string }) =>
    `${props.value} is not a valid name! Only letters and spaces are allowed.`,
};

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name can not be more than 20 characters"],
    set: capitalizeString,
    validate: nameValidator,
  },
  middleName: {
    type: String,
    trim: true,
    set: capitalizeString,
    validate: nameValidator,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message:
        "{VALUE} is not a valid name! Only letters and spaces are allowed.",
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
    set: capitalizeString,
    validate: nameValidator,
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
    set: capitalizeString,
    validate: nameValidator,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    set: capitalizeString,
  },
  motherOccupation: {
    type: String,
    trim: true,
    set: capitalizeString,
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
    set: capitalizeString,
    validate: nameValidator,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: {
    type: String,
    trim: true,
    set: capitalizeString,
  },
  occupation: {
    type: String,
    trim: true,
    set: capitalizeString,
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
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email",
    },
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
    set: capitalizeString,
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, "Permanent address is required"],
    set: capitalizeString,
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
