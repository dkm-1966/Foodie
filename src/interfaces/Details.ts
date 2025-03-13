interface IIngredient {
  name: string;
  original: string;
}

export interface IDetails {
  title: string;
  image: string;
  extendedIngredients: IIngredient[];
  preparationMinutes: number;
  summary: string;
}
