
export type ProjectCategory = 'All' | 'Branding' | '3D' | '2D' | 'Motion';

export type Language = 'en' | 'vi';

export type BlockType = 'text' | 'full-image' | 'image-grid' | 'quote' | 'two-column';

export interface BaseBlock {
  type: BlockType;
  id: string;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  title?: string;
  title_vi?: string;
  content: string;
  content_vi?: string;
  align?: 'left' | 'center';
}

export interface FullImageBlock extends BaseBlock {
  type: 'full-image';
  imageUrl: string;
  caption?: string;
  caption_vi?: string;
}

export interface ImageGridBlock extends BaseBlock {
  type: 'image-grid';
  images: string[];
  layout: 'simple-2' | 'simple-3' | 'masonry' | '1-2' | 'pan-gallery';
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  text: string;
  text_vi?: string;
  author?: string;
}

export interface TwoColumnBlock extends BaseBlock {
  type: 'two-column';
  leftContent: string;
  leftContent_vi?: string;
  leftTitle?: string;
  leftTitle_vi?: string;
  rightContent?: string;
  rightContent_vi?: string;
  rightImage?: string;
}

export type ProjectBlock = TextBlock | FullImageBlock | ImageGridBlock | QuoteBlock | TwoColumnBlock;

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  description_vi?: string;
  imageUrl: string;
  videoUrl?: string;
  tools?: string[];
  displayOrder?: number;
  star?: number;
  challenge?: string;
  challenge_vi?: string;
  solution?: string;
  solution_vi?: string;
  gallery?: string[];
  blocks?: ProjectBlock[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: 'Instagram' | 'Twitter' | 'Linkedin' | 'Mail' | 'Github' | 'Facebook' | 'Telegram';
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  socials: SocialLink[];
}

export interface GalleryImage {
  src: string;
  width?: number;
  height?: number;
  id?: string;
  title?: string;
}

export interface GalleryCollection {
  id: string;
  title: string;
  location: string;
  date: string;
  images: GalleryImage[];
}

export interface PlaygroundItem {
    id: string;
    title: string;
    src: string;
    width: number;
    height: number;
    tag: string;
}

export interface PlaygroundSection {
    id: string;
    title: string;
    description: string;
    items: PlaygroundItem[];
}
