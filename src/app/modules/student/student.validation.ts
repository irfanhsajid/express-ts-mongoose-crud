import { z } from "zod";

// Capitalize string function
const capitalizeString = (value: string) => {
  if (!value) return value;
  return value
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Name validation regex
const nameRegex = /^[a-zA-Z ]+$/;

// UserName schema validation
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(20, { message: "First name can not be more than 20 characters" })
    .regex(nameRegex, { message: "First name should only contain letters and spaces" })
    .transform(capitalizeString),
  middleName: z
    .string()
    .trim()
    .regex(nameRegex, { message: "Middle name should only contain letters and spaces" })
    .transform(capitalizeString)
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .regex(nameRegex, { message: "Last name should only contain letters and spaces" })
    .transform(capitalizeString),
});

// Guardian schema validation
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, { message: "Father's name is required" })
    .regex(nameRegex, { message: "Father's name should only contain letters and spaces" })
    .transform(capitalizeString),
  motherName: z
    .string()
    .trim()
    .min(1, { message: "Mother's name is required" })
    .regex(nameRegex, { message: "Mother's name should only contain letters and spaces" })
    .transform(capitalizeString),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Father's occupation is required" }) // Made required
    .transform(capitalizeString),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Mother's occupation is required" }) // Made required
    .transform(capitalizeString),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherContactNo: z
    .string()
    .trim()
    .optional(),
});

// Local Guardian schema validation
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Local guardian name is required" })
    .regex(nameRegex, { message: "Local guardian name should only contain letters and spaces" })
    .transform(capitalizeString),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian contact number is required" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Local guardian address is required" })
    .transform(capitalizeString),
  occupation: z // Changed to required
    .string()
    .trim()
    .min(1, { message: "Local guardian occupation is required" })
    .transform(capitalizeString),
});

// Student schema validation
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: "Student ID is required" }),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
  }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Contact number is required" }),
  emergencyContactNo: z
    .string()
    .min(1, { message: "Emergency contact number is required" }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      errorMap: () => ({ message: "Invalid blood group" }),
    })
    .optional(),
  presentAddress: z
    .string()
    .trim()
    .min(1, { message: "Present address is required" })
    .transform(capitalizeString),
  permanentAddress: z
    .string()
    .trim()
    .min(1, { message: "Permanent address is required" })
    .transform(capitalizeString),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema.optional(),
  profilePicture: z.string().optional(),
  isActive: z
    .enum(["active", "inactive"], {
      errorMap: () => ({ message: "Status must be either 'active' or 'inactive'" }),
    })
    .default("active"),
});

export { studentValidationSchema };