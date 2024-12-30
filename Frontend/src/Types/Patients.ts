export type PatientDto = {
  id: number;
  fullName: string;
  phoneNo: string;
  doB: string;
  gender: Gender;
  address: string;
  email: string | null;
  allergies: string;
};

export type PatientDetailsDto = {
  id: number;
  fullName: string;
  phoneNo: string;
  doB: string;
  gender: Gender;
  address: string;
  email: string | null;
  allergies: string;
  // appointments: AppointmentDto[];
  // diagnoses: DiagnosisDto[];
};

export type AddPatientDto = {
  fullName: string;
  phoneNo: string;
  doB: string;
  gender: Gender;
  address: string;
  email: string | null;
  allergies: string;
};

export type UpdatePatientDto = {
  id: number;
  fullName: string;
  phoneNo: string;
  doB: string;
  gender: Gender;
  address: string;
  email: string | null;
  allergies: string;
};

export type PatientResponseDto = {
  success: boolean;
  error: string | null;
  patients: PatientDto[] | null;
  patient: PatientDto | null;
};

export enum Gender {
  Male,
  Female,
}