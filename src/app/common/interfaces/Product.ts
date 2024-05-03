import {Category} from "./Category";

export interface Product {
  productId: number;
  category: Category;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imgUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date | null;
  lastUpdated: Date | null;
}

