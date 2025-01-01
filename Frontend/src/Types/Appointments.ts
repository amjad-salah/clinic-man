import { PatientDto } from "./Patients.ts";
import { DoctorDto } from "./Doctors.ts";
import { LabTestDetailsDto } from "./LabTests.ts";

export enum AppointmentStatus {
  مقرر,
  إنتهى,
  ملغي,
}

export type AppointmentDto = {
  id: number;
  date: string;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
  patient: PatientDto;
  doctor: DoctorDto;
};

export type AppointmentDetailsDto = {
  id: number;
  date: string;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
  patient: PatientDto;
  doctor: DoctorDto;
  tests: LabTestDetailsDto[] | null;
};

export type AddAppointmentDto = {
  date: string;
  time: string;
  reason: string | null;
  patientId: number;
  doctorId: number;
  status: AppointmentStatus;
};

export type UpdateAppointmentDto = {
  id: number;
  date: string;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
};

export type AppointmentResponseDto = {
  success: boolean;
  error: string | null;
  appointment: AppointmentDetailsDto | null;
  appointments: AppointmentDto[] | null;
};

export type SelectOptions = {
  value: string;
  label: string;
};
