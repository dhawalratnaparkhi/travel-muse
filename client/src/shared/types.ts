export type InsertTour = {
  id?: number;
  title: string;
  description: string;
  destination: string;
  price: number;
  duration: string;
  imageUrl: string;
  isActive?: boolean;
};
