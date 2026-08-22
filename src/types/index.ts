export type PriceType = 'fixed' | 'range' | 'contact' | 'add-on';

export interface PricingItem {
  id: string;
  category: 'car' | 'motorcycle' | 'ev' | 'truck';
  name: string;
  badge?: string;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  priceType: PriceType;
  priceLabel?: string;
  unit?: string;
  description?: string;
  services: string[];
  recommended?: boolean;
  addOns?: {
    name: string;
    price: number;
    description?: string;
  }[];
  ctaText?: string;
}

export interface ProcessStep {
  step: number;
  stepLabel: string;
  title: string;
  description: string;
  details?: string[];
  image: string;
  imageAlt: string;
  highlight?: string;
}

export interface EquipmentItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image?: string;
  imageAlt?: string;
  benefits?: string[];
}

export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
}

export interface PortfolioItem {
  id: string;
  vehicleType: string;
  title: string;
  category: 'car' | 'motorcycle' | 'ev' | 'truck';
  beforeImage: string;
  afterImage: string;
  description?: string;
  featured?: boolean;
  isRealWork?: boolean;
  altBefore: string;
  altAfter: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  isRealWork: boolean;
  width?: number;
  height?: number;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  vehicleType: string;
  problem: string[];
  service: string[];
  result: string;
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
  timeSpent?: string;
}

export interface PromotionItem {
  id: string;
  title: string;
  discount: string;
  description: string;
  condition: string;
  badge?: string;
  popular?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isVerifiedProduction: boolean;
}
