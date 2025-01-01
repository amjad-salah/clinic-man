import { AppointmentDto } from "./Appointments.ts";
import { DiagnoseDto } from "./Diagnoses.ts";

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
  appointments: AppointmentDto[];
  diagnoses: DiagnoseDto[];
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
  patient: PatientDetailsDto | null;
};

export enum Gender {
  ذكر,
  أنثى,
}
