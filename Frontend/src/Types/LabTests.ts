import { PatientDto } from "./Patients.ts";
import { AppointmentDto } from "./Appointments.ts";

export enum TestStatus {
  معلق,
  منتهي,
  ملغي,
}

export type LabTestDetailsDto = {
  id: number;
  testName: string;
  status: TestStatus;
  result: string;
  description: string | null;
  patientId: number;
  patient: PatientDto;
  appointmentId: number;
  appointment: AppointmentDto;
};

export type AddLabTestDto = {
  testName: string;
  status: TestStatus;
  result: string;
  description: string | null;
  patientId: number;
  appointmentId: number;
  fees: number;
};

export type UpdateLabTestDto = {
  id: number;
  testName: string;
  status: TestStatus;
  result: string;
  description: string | null;
  patientId: number;
  appointmentId: number;
  fees: number;
};

export type TestResponseDto = {
  success: boolean;
  error: string | null;
  tests: LabTestDetailsDto[] | null;
  test: LabTestDetailsDto | null;
};
