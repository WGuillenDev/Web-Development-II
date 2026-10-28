// Publicación tal como la devuelve JSONPlaceholder en /posts
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Publicación lista para la vista, con los datos de su autor ya unidos
export interface FeedPost extends Post {
  authorName: string;
  authorUsername: string;
  authorCity: string;
  authorInitials: string;
}
