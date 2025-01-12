import { AppointmentDto } from "./Appointments.ts";

export type AppointmentTypeDto = {
  id: number;
  name: string;
  fees: number;
};

export type AppointmentTypeDetailsDto = {
  name: string;
  fees: number;
  appointments: AppointmentDto[];
};

export type AddAppointmentType = {
  name: string;
  fees: number;
};

export type UpdateAppointmentType = {
  id: number;
  name: string;
  fees: number;
};

export type AppointmentTypeResponseDto = {
  success: boolean;
  error: string | null;
  appointmentTypes: AppointmentTypeDto[] | null;
  appointmentType: AppointmentTypeDetailsDto | null;
};
