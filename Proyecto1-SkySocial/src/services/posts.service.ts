import axios from 'axios';
import type { FeedPost, Post } from '../types/post.types.js';
import type { User } from '../types/user.types.js';
import { POSTS_ES, ZONES_BY_USER } from '../data/posts.es.js';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// JSONPlaceholder numera 10 posts por usuario; se muestra el primero de cada uno para que cada publicación sea de una zona distinta
const POSTS_PER_USER = 1;
const POSTS_BY_USER = 10;

// Con FEED_ORIGINAL=true el feed muestra el título y el contenido tal como los entrega JSONPlaceholder
function showOriginalText(): boolean {
  return process.env.FEED_ORIGINAL === 'true';
}

const FRIENDLY_ERROR = 'No pudimos cargar las publicaciones de la comunidad. Revisa tu conexión a internet y recarga la página. Mientras tanto puedes usar el Chat global.';

export async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await api.get<Post[]>('/posts');
    return data;
  } catch (error) {
    console.error('Error al consultar /posts de JSONPlaceholder:', error instanceof Error ? error.message : error);
    throw new Error(FRIENDLY_ERROR);
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const { data } = await api.get<User[]>('/users');
    return data;
  } catch (error) {
    console.error('Error al consultar /users de JSONPlaceholder:', error instanceof Error ? error.message : error);
    throw new Error(FRIENDLY_ERROR);
  }
}

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('');
}

// Une cada post con su autor, su zona y su versión en español para que la vista muestre el nombre en lugar del userId.
// Si getPosts o getUsers fallan, Promise.all rechaza con su mensaje amable y la ruta lo muestra en la vista.
export async function getFeed(): Promise<FeedPost[]> {
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);
  const usersById = new Map(users.map((user) => [user.id, user]));

  const featured = posts.filter((post) => (post.id - 1) % POSTS_BY_USER < POSTS_PER_USER);
  const original = showOriginalText();

  return featured.map((post) => {
    const author = usersById.get(post.userId);
    const translation = original ? undefined : POSTS_ES[post.id];
    return {
      ...post,
      title: translation?.title ?? post.title,
      body: translation?.body ?? post.body,
      authorName: author?.name ?? 'Usuario desconocido',
      authorUsername: author?.username ?? 'anonimo',
      authorCity: ZONES_BY_USER[post.userId] ?? 'Costa Rica',
      authorInitials: author ? initialsOf(author.name) : '?',
    };
  });
}
