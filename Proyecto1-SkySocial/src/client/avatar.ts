// Iniciales y color del avatar a partir del nombre, igual que los autores del feed
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  return words
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('');
}

export function avatarVariant(name: string): number {
  let hash = 0;
  for (const char of name.trim().toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return (hash % 10) + 1;
}

// Quita la variante anterior y aplica la que corresponde al nombre
export function paintAvatar(element: HTMLElement, name: string): void {
  element.textContent = initialsOf(name);
  element.className = element.className.replace(/\bavatar--\d+\b/g, '').trim();
  if (name.trim()) element.classList.add(`avatar--${avatarVariant(name)}`);
}
