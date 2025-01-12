import { PatientDto } from "./Patients.ts";
import { DoctorDto } from "./Doctors.ts";
import { LabTestDetailsDto } from "./LabTests.ts";
import { DiagnoseDto } from "./Diagnoses.ts";
import { PrescriptionDto } from "./Prescriptions.ts";
import { AppointmentTypeDto } from "./AppointmentTypes.ts";

export enum AppointmentStatus {
  مقرر,
  إنتهى,
  ملغي,
}

export type AppointmentDto = {
  id: number;
  date: string;
  time: string;
  appointmentTypeId: number;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
  patient: PatientDto;
  doctor: DoctorDto;
  appointmentType: AppointmentTypeDto;
};

export type AppointmentDetailsDto = {
  id: number;
  date: string;
  time: string;
  appointmentTypeId: number;
  status: AppointmentStatus;
  patientId: number;
  doctorId: number;
  patient: PatientDto;
  doctor: DoctorDto;
  appointmentType: AppointmentTypeDto;
  tests: LabTestDetailsDto[] | null;
  diagnoses: DiagnoseDto[] | null;
  prescriptions: PrescriptionDto[] | null;
};

export type AddAppointmentDto = {
  date: string;
  time: string;
  appointmentTypeId: number;
  patientId: number;
  doctorId: number;
  status: AppointmentStatus;
};

export type UpdateAppointmentDto = {
  id: number;
  date: string;
  time: string;
  appointmentTypeId: number;
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
