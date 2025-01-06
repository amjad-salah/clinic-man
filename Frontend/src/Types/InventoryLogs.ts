import { InventoryDto } from "./Inventories.ts";
import { SupplierDto } from "./Suppliers.ts";

export enum LogType {
  إضافة,
  إستهلاك,
}

export type InventoryLogDto = {
  id: number;
  inventoryId: number;
  supplierId: number | null;
  type: LogType;
  quantity: number;
  description: string;
  inventory: InventoryDto | null;
  supplier: SupplierDto | null;
};

export type AddInventoryLogDto = {
  inventoryId: number;
  supplierId: number | null;
  type: LogType;
  quantity: number;
  description: string;
};

export type UpdateInventoryLogDto = {
  id: number;
  inventoryId: number;
  supplierId: number | null;
  type: LogType;
  quantity: number;
  description: string;
};

export type InventoryLogResponseDto = {
  success: boolean;
  error: string | null;
  logs: InventoryLogDto[] | null;
  log: InventoryLogDto | null;
};
