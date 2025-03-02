## Design Document for Blog Project Monorepo

### Introduction

This design document outlines the architectural and technical details of the blog project, which utilizes a monorepo setup with Turborepo. The project combines Next.js 15 for the frontend and NestJS for the backend, leveraging TypeScript, GraphQL, REST APIs, and Tailwind CSS/Shadcn for styling.

### System Architecture

#### Overview

The system architecture is designed to be modular and scalable. It consists of two main components:

- **Frontend**: Built using Next.js 15 with React Server Components or Client Components as needed.
- **Backend**: Developed using NestJS with GraphQL support.

#### Directory Structure:

├── apps/
│ ├── web/ # Next.js application
│ │ ├── app/ # App Router
│ │ ├── public/ # Static assets
│ │ └── package.json # Next.js dependencies
│ └── api/ # NestJS application
│ ├── src/ # NestJS source code
│ │ ├── modules/ # NestJS modules
│ │ ├── main.ts # NestJS entry point
│ │ └── app.module.ts # Root module
│ └── package.json # NestJS dependencies
├── packages/
│ ├── eslint-config/ # Shared ESLint configuration
│ ├── typescript-config/ # Shared TypeScript configuration
│ └── shared/ # Shared code
│ ├── src/
│ │ ├── types/ # Shared type definitions
│ │ ├── dto/ # Data Transfer Objects
│ │ ├── constants/ # Shared constants
│ │ └── utils/ # Shared utilities
│ └── package.json
├── package.json # Root package.json
├── turbo.json # Turborepo configuration
└── pnpm-workspace.yaml # PNPM workspace configuration

#### High-Level Architecture Diagram

```mermaid
graph LR;
    A[Client] -->|HTTPS|> B[Frontend (Next.js)];
    B -->|GraphQL/REST|> C[Backend (NestJS)];
    C -->|Database Access|> D[Database];
```

#### Detailed Architecture

1. **Frontend**:

   - Uses Next.js 15 to handle routing and server-side rendering.
   - Integrates Tailwind CSS/Shadcn for responsive styling.
   - Utilizes React components to build UI elements.

2. **Backend**:

   - Built on NestJS framework providing robust support for RESTful APIs.
   - Implements GraphQL schema/resolvers to manage data queries/mutations efficiently.
   - Handles user authentication via JWT tokens.

3. **Database**:
   - Uses SQLite as the database management system to store data models.
   - Implements Prisma ORM for type-safe database access and migrations.
4. **API Endpoints**:
   | Endpoint | Method | Description |
   |-------------------|--------|-------------------------------------------|
   | `/graphql` | POST/GET | Handles all GraphQL queries/mutations |
   | `/api/posts` | GET | Retrieves list of posts |
5. **Security Measures**:

   - Use HTTPS throughout application interactions.
   - Implement JWT-based authentication with password hashing/salting.

6. **CI/CD Pipelines**: Set up automated build/test/deploy processes using tools like GitHub Actions or Jenkins.

### User Interface Design

1. **Responsive Layout**: Ensure that all pages are fully responsive across desktop/tablet/mobile devices using Tailwind CSS utility classes.

2. **Components Library**: Develop reusable UI components such as navigation bars, article cards, comment sections to maintain consistency throughout the application.

3. **Accessibility Standards**: Ensure compliance with accessibility guidelines such as WCAG standards during component design (e.g., color contrast ratios).

4. **Color Scheme & Typography**: Use a clean color palette that aligns well across different devices; select typography that enhances readability on various screen sizes (e.g., Open Sans).

5. **Search Functionality UI**: Implement a simple yet intuitive search bar at the top of each page allowing users to find articles by keyword/title/author easily without disrupting their browsing experience.

### Data Models & Schema

1. **User Model**

```typescript
interface User {
  id: number; // Auto-incrementing primary key
  name: string; // User's full name
  email: string; // User's email address
  bio?: string; // Optional user biography
  avatar?: string; // Optional avatar URL
  password?: string; // Optional hashed password
  createdAt: Date; // Timestamp of user creation
  updatedAt: Date; // Timestamp of last update
  posts: Post[]; // One-to-many relationship with Posts
  comments: Comment[]; // One-to-many relationship with Comments
  likes: Like[]; // One-to-many relationship with Likes
}
```

2. **Post Model**

```typescript
interface Post {
  id: number; // Auto-incrementing primary key
  title: string; // Post title
  slug?: string; // Unique URL-friendly identifier
  content: string; // Post content
  thumbnail?: string; // Optional thumbnail URL
  published: boolean; // Publication status
  authorId: number; // Foreign key to User
  author: User; // Many-to-one relationship with User
  createdAt: Date; // Timestamp of post creation
  updatedAt: Date; // Timestamp of last update
  comments: Comment[]; // One-to-many relationship with Comments
  tags: Tag[]; // Many-to-many relationship with Tags through PostTags
  likes: Like[]; // One-to-many relationship with Likes
}
```

3. **Comment Model**

```typescript
interface Comment {
  id: number; // Auto-incrementing primary key
  content: string; // Comment content
  published: boolean; // Publication status
  postId: number; // Foreign key to Post
  post: Post; // Many-to-one relationship with Post
  authorId: number; // Foreign key to User
  author: User; // Many-to-one relationship with User
  createdAt: Date; // Timestamp of comment creation
  updatedAt: Date; // Timestamp of last update
}
```

4. **Tag Model**

```typescript
interface Tag {
  id: number; // Auto-incrementing primary key
  name: string; // Unique tag name
  posts: Post[]; // Many-to-many relationship with Posts through PostTags
}
```

5. **Like Model**

```typescript
interface Like {
  id: number; // Auto-incrementing primary key
  userId: number; // Foreign key to User
  postId: number; // Foreign key to Post
  user: User; // Many-to-one relationship with User
  post: Post; // Many-to-one relationship with Post
  createdAt: Date; // Timestamp of like creation
}
```

6. **GraphQL Schema Example**

```graphql
type Query {
  posts(limit: Int!): [Post!]!
  user(id: Int!): User
  comments(postId: Int!): [Comment!]!
  tags: [Tag!]!
  postsByTag(tagName: String!): [Post!]!
  likes(postId: Int!): [Like!]!
}

type Mutation {
  createPost(
    title: String!
    content: String!
    published: Boolean!
    tags: [String!]
  ): Post!
  updateUser(id: Int!, name: String, bio: String): User!
  createComment(postId: Int!, content: String!, published: Boolean!): Comment!
  updateComment(id: Int!, content: String, published: Boolean): Comment!
  createTag(name: String!): Tag!
  addTagToPost(postId: Int!, tagName: String!): Post!
  createLike(postId: Int!): Like!
  deleteLike(postId: Int!): Boolean!
}

type User {
  id: Int!
  name: String!
  email: String!
  bio: String
  avatar: String
  posts: [Post!]!
  comments: [Comment!]!
  likes: [Like!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Post {
  id: Int!
  title: String!
  slug: String
  content: String!
  thumbnail: String
  published: Boolean!
  author: User!
  comments: [Comment!]!
  tags: [Tag!]!
  likes: [Like!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Comment {
  id: Int!
  content: String!
  published: Boolean!
  post: Post!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Tag {
  id: Int!
  name: String!
  posts: [Post!]!
}
```

### Testing Strategy

1. **Unit Tests**: Write unit tests covering individual functions/components logic ensuring they behave correctly under various inputs/scenarios (use Jest).

2. **Integration Tests**: Test how different parts interact together—e.g., API calls from frontend interacting correctly with backend endpoints (use Cypress).

3. **End-to-End Tests**: Perform full-stack testing simulating real user interactions through tools like Playwright/Cypress end-to-end testing capabilities ensuring seamless functionality from client-server interaction down through database operations if applicable.
