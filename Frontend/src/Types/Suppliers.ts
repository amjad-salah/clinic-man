import { InventoryLogDto } from "./InventoryLogs.ts";

export type SupplierDto = {
  id: number;
  name: string;
  contactInfo: string;
  address: string;
};

export type SupplierDetailsDto = {
  name: string;
  contactInfo: string;
  address: string;
  logs: InventoryLogDto[];
};

export type AddSupplierDto = {
  name: string;
  contactInfo: string;
  address: string;
};

export type UpdateSupplierDto = {
  id: number;
  name: string;
  contactInfo: string;
  address: string;
};

export type SupplierResponseDto = {
  success: boolean;
  error: string | null;
  suppliers: SupplierDto[] | null;
  supplier: SupplierDetailsDto | null;
};
