export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};

export interface IBlog {
  excerpt: string;
  createdAt: string;
  slug: string;
  title: string;
  image: { url: string }[];
  id: string;
  author: {
    name: string;
    avatar: {
      url: string;
    };
  };
  description:{
    html:string;
  },
  category:{
    label:string;
  }
}

export interface ICategory{
  label:string;
  slug:string;
}