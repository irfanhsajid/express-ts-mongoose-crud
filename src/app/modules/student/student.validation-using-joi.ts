// student.validation.ts
import Joi from "joi";

// Capitalize string function for Joi custom validation
const capitalizeString = (value: string) => {
  if (!value) return value;
  return value
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Custom validation for names (letters and spaces only)
const nameValidation = Joi.string()
  .trim()
  .regex(/^[a-zA-Z ]+$/)
  .custom((value) => capitalizeString(value));

// Joi schema
const JoiValidatedStudentSchema = Joi.object({
  id: Joi.string().required(),

  name: Joi.object({
    firstName: nameValidation.max(20).required(),
    middleName: nameValidation.allow(""),
    lastName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .custom((value) => capitalizeString(value))
      .required(),
  }).required(),

  gender: Joi.string().valid("male", "female").required(),

  dateOfBirth: Joi.string().allow(""),

  email: Joi.string().email().required(),

  contactNo: Joi.string().required(),

  emergencyContactNo: Joi.string().required(),

  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ),

  presentAddress: Joi.string()
    .trim()
    .custom((value) => capitalizeString(value))
    .required(),

  permanentAddress: Joi.string()
    .trim()
    .custom((value) => capitalizeString(value))
    .required(),

  guardian: Joi.object({
    fatherName: nameValidation.required(),
    motherName: nameValidation.required(),
    fatherOccupation: Joi.string()
      .trim()
      .custom((value) => capitalizeString(value))
      .allow(""),
    motherOccupation: Joi.string()
      .trim()
      .custom((value) => capitalizeString(value))
      .allow(""),
    fatherContactNo: Joi.string().required(),
    motherContactNo: Joi.string().allow(""),
  }).required(),

  localGuardian: Joi.object({
    name: nameValidation.required(),
    contactNo: Joi.string().required(),
    address: Joi.string()
      .trim()
      .custom((value) => capitalizeString(value))
      .allow(""),
    occupation: Joi.string()
      .trim()
      .custom((value) => capitalizeString(value))
      .allow(""),
  }).required(),

  profilePicture: Joi.string().allow(""),

  isActive: Joi.string()
    .valid("active", "inactive")
    .default("active"),
});

export default JoiValidatedStudentSchema;