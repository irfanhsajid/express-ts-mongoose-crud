export interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  fatherContactNo: string;
  motherContactNo: string;
}

export interface LocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  occupation: string;
}

export type Student = {
  id: string;
  name: UserName;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian?: LocalGuardian;
  profilePicture?: string;
  isActive: "active" | "inactive";
};
