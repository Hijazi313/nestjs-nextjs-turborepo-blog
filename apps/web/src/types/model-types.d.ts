export type Post = {
  id: number;
  title: string;
  content: string;
  slug?: string;
  thumbnail?: string;
  published: boolean;
  tags: Tag[];
  author: User;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  _count: PostCount;
};

export type PostCount = {
  likes: number;
  comments: number;
};

export type Tag = {
  id: number;
  name: string;
  posts: Post[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  posts?: Post[];
  comments: Comment[];
};

export type Comment = {
  id: number;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
};
