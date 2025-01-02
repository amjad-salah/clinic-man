import { PatientDto } from "./Patients.ts";
import { AppointmentDto } from "./Appointments.ts";

export enum BillingStatus {
  معلق,
  مدفوع,
  متأخر,
}

export type BillingDto = {
  id: number;
  status: BillingStatus;
  date: string;
  tax: number;
  total: number;
  subTotal: number;
  paidAmount: number;
  remainingBalance: number;
  patientId: number;
  appointmentId: number;
  patient: PatientDto | null;
  appointment: AppointmentDto | null;
};

export type BillingDetailsDto = {
  id: number;
  status: BillingStatus;
  date: string;
  tax: number;
  total: number;
  subTotal: number;
  paidAmount: number;
  remainingBalance: number;
  patientId: number;
  appointmentId: number;
  patient: PatientDto | null;
  appointment: AppointmentDto | null;
  billingItems: BillingItemDto[];
  payments: PaymentDto[];
};

export type AddBillingDto = {
  date: string;
  tax: number;
  appointmentId: number;
};

export type BillingItemDto = {
  billingId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type AddBillingItemDto = {
  billingId: number;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type PaymentDto = {
  billingId: number;
  amount: number;
  date: string;
  //transactionId: string;
};

export type BillingResponse = {
  success: boolean;
  error: string;
  billings: BillingDto[];
  billing: BillingDetailsDto;
};
