export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  avatar?: string;
  level?: string;
}

export interface Gig {
  id: string;
  title: string;
  seller: User;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  image: string;
  category: string;
  techStack: string[];
}

export interface Package {
  type: 'Basic' | 'Standard' | 'Premium';
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  features: string[];
}

export interface Order {
  id: string;
  gigId: string;
  status: 'Requirements' | 'In Progress' | 'Review' | 'Delivered' | 'Pending Verification';
  amount: number;
  createdAt: string;
  problemStatement?: string;
  preferredLanguage?: string;
  deadline?: string;
}
