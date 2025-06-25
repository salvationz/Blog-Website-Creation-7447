export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  likes?: number;
  bookmarked?: boolean;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribed: boolean;
  subscribedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AppState {
  posts: BlogPost[];
  categories: Category[];
  newsletter: NewsletterSubscription;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
}