import { PatientDto } from "./Patients.ts";
import { AppointmentDto } from "./Appointments.ts";

export type DiagnoseDto = {
  patientId: number;
  appointmentId: number;
  diagnosis: string;
};

export type DiagnoseDetailsDto = {
  id: number;
  patientId: number;
  appointmentId: number;
  diagnosis: string;
  patient: PatientDto;
  appointment: AppointmentDto;
};

export type AddDiagnoseDto = {
  patientId: number;
  appointmentId: number;
  diagnosis: string;
};

export type UpdateDiagnoseDto = {
  id: number;
  patientId: number;
  appointmentId: number;
  diagnosis: string;
};

export type DiagnoseResponseDto = {
  success: boolean;
  error: string;
  diagnoses: DiagnoseDetailsDto[];
  diagnose: DiagnoseDetailsDto;
};
