import { DoctorScheduleDto } from "./DoctorSchedules.ts";

type UserDoctorDto = {
  fullName: string;
};

export type DoctorDto = {
  id: number;
  phoneNo: string;
  specialization: string;
  user: UserDoctorDto;
};

export type DoctorDetailsDto = {
  phoneNo: string;
  specialization: string;
  user: UserDoctorDto;
  userId: number;
  schedules?: DoctorScheduleDto[];
  //appointments: AppointmentDto[];
};

export type AddDoctorDto = {
  phoneNo: string;
  specialization: string;
  userId: number;
};

export type UpdateDoctorDto = {
  id: number;
  phoneNo: string;
  specialization: string;
  userId: number;
};

export type DoctorResponseDto = {
  success: boolean;
  error: string | null;
  doctors: DoctorDto[] | null;
  doctor: DoctorDetailsDto | null;
};
