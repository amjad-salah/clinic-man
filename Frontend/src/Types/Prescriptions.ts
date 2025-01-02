import { PatientDto } from "./Patients.ts";
import { AppointmentDto } from "./Appointments.ts";

export type PrescriptionDto = {
  id: number;
  patientId: number;
  appointmentId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type PrescriptionDetailsDto = {
  id: number;
  patientId: number;
  appointmentId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  patient: PatientDto;
  appointment: AppointmentDto;
};

export type AddPrescriptionDto = {
  patientId: number;
  appointmentId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type UpdatePrescriptionDto = {
  id: number;
  patientId: number;
  appointmentId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type PrescriptionResponseDto = {
  success: boolean;
  error: string | null;
  prescription: PrescriptionDetailsDto | null;
  prescriptions: PrescriptionDetailsDto[] | null;
};
