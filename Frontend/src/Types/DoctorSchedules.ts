import { DoctorDto } from "./Doctors.ts";

export type DoctorScheduleDto = {
  id: number;
  doctorId: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type DoctorScheduleDetailsDto = {
  id: number;
  doctorId: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  doctor: DoctorDto;
};

export type AddDoctorScheduleDto = {
  doctorId: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type ScheduleResponseDto = {
  success: boolean;
  error: string | null;
  schedule: DoctorScheduleDetailsDto | null;
  schedules?: DoctorScheduleDetailsDto[] | null;
};

export enum DayOfWeek {
  الأحد,
  الإثنين,
  الثلاثاء,
  الأربعاء,
  الخميس,
  الجمعة,
  السبت,
}
