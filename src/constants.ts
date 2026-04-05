import { Gig, User } from './types';

export const MOCK_USER_SELLER: User = {
  id: 's1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  role: 'seller',
  level: 'Top Rated Student',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

export const MOCK_GIGS: Gig[] = [
  {
    id: 'g1',
    title: 'I will build a full-stack MERN application for your college project',
    seller: MOCK_USER_SELLER,
    rating: 4.9,
    reviewsCount: 124,
    startingPrice: 49,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    category: 'Web Dev',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    id: 'g2',
    title: 'I will write efficient Python scripts for data analysis and automation',
    seller: {
      id: 's2',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'seller',
      level: 'Level 2 Seller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    rating: 4.8,
    reviewsCount: 89,
    startingPrice: 25,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    category: 'Data Science',
    techStack: ['Python', 'Pandas', 'NumPy'],
  },
  {
    id: 'g3',
    title: 'I will develop a professional Android app using Java or Kotlin',
    seller: {
      id: 's3',
      name: 'David Kumar',
      email: 'david@example.com',
      role: 'seller',
      level: 'Level 1 Seller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    rating: 5.0,
    reviewsCount: 45,
    startingPrice: 75,
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800',
    category: 'App Dev',
    techStack: ['Java', 'Kotlin', 'Android Studio'],
  },
];
