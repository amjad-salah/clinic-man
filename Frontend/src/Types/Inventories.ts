import { InventoryLogDto } from "./InventoryLogs.ts";

export type InventoryDto = {
  id: number;
  name: string;
  quantity: number;
  minQuantity: number;
  expirationDate: string;
};

export type AddInventoryDto = {
  name: string;
  minQuantity: number;
  expirationDate: string;
};

export type UpdateInventoryDto = {
  id: number;
  name: string;
  minQuantity: number;
  expirationDate: string;
};

export type InventoryDetailsDto = {
  name: string;
  quantity: number;
  minQuantity: number;
  expirationDate: string;
  logs: InventoryLogDto[];
};

export type InventoryResponseDto = {
  success: boolean;
  error: string | null;
  inventories: InventoryDto[] | null;
  inventory: InventoryDetailsDto | null;
};
