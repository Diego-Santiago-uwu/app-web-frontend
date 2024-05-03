export interface Category {
  categoryId: number;
  categoryName: string;
  parentCategory: Category | null;
  subCategoryName: string[];
}
