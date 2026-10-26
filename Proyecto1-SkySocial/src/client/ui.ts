// Interacción visual de la interfaz: tema, navegación entre módulos y efectos.
// Se carga en el <head> sin defer para aplicar el tema antes del primer pintado.
(() => {
  type Theme = 'light' | 'dark';

  const THEME_KEY = 'skysocial-theme';
  const root = document.documentElement;

  function readSavedTheme(): Theme | null {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  }

  function saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Sin almacenamiento disponible el tema solo dura la sesión actual
    }
  }

  function applyTheme(theme: Theme): void {
    root.dataset.theme = theme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(readSavedTheme() ?? (prefersDark ? 'dark' : 'light'));

  // Un efecto que falla no debe impedir que funcionen los demás
  function safe(init: () => void, name: string): void {
    try {
      init();
    } catch (error) {
      console.error(`No se pudo iniciar ${name}:`, error);
    }
  }

  function initThemeToggle(): void {
    const button = document.querySelector<HTMLButtonElement>('.theme-toggle');
    if (!button) return;

    button.addEventListener('click', () => {
      const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      saveTheme(next);

      if (!document.startViewTransition) {
        applyTheme(next);
        return;
      }

      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      const transition = document.startViewTransition(() => applyTheme(next));
      transition.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      });
    });
  }

  function initModules(): void {
    const nav = document.querySelector<HTMLElement>('.nav');
    const indicator = nav?.querySelector<HTMLElement>('.nav__indicator');
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav__link'));
    const modules = Array.from(document.querySelectorAll<HTMLElement>('.module'));
    if (!nav || !indicator || links.length === 0) return;

    root.classList.add('js-tabs');

    // Cada sección tiene su propio alto; recordar el scroll anterior puede dejar la vista en blanco
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    function moveIndicator(link: HTMLElement): void {
      nav!.style.setProperty('--nav-x', `${link.offsetLeft}px`);
      nav!.style.setProperty('--nav-w', `${link.offsetWidth}px`);
    }

    function activate(id: string): void {
      links.forEach((link) => link.classList.toggle('is-active', link.dataset.module === id));
      modules.forEach((module) => module.classList.toggle('is-active', module.id === id));

      const activeLink = links.find((link) => link.dataset.module === id);
      if (activeLink) moveIndicator(activeLink);
    }

    // Cualquier enlace con data-module navega, no solo los del menú
    document.querySelectorAll<HTMLAnchorElement>('a[data-module]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const id = trigger.dataset.module ?? 'feed';
        activate(id);
        history.replaceState(null, '', `#${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const initial = location.hash.slice(1);
    activate(modules.some((module) => module.id === initial) ? initial : 'feed');

    const refresh = (): void => {
      const active = links.find((link) => link.classList.contains('is-active'));
      if (active) moveIndicator(active);
    };
    window.addEventListener('resize', refresh);
    document.fonts?.ready.then(refresh);
  }

  // Luz radial que sigue al cursor dentro de las tarjetas
  function initSpotlight(): void {
    document.querySelectorAll<HTMLElement>('.glass--interactive').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    });
  }

  // Inclinación 3D suave con interpolación para que el movimiento no sea brusco
  function initTilt(): void {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const MAX_DEG = 6;
    document.querySelectorAll<HTMLElement>('.weather').forEach((card) => {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let frame: number | null = null;

      card.classList.add('has-tilt');

      const loop = (): void => {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        card.style.setProperty('--rx', `${currentX.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${currentY.toFixed(2)}deg`);
        // Valores de -1 a 1 para el parallax de las capas del sol y las nubes
        card.style.setProperty('--tilt-x', (currentY / (MAX_DEG / 2)).toFixed(3));
        card.style.setProperty('--tilt-y', (-currentX / (MAX_DEG / 2)).toFixed(3));

        const moving = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
        frame = moving ? requestAnimationFrame(loop) : null;
      };

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        targetX = -py * MAX_DEG;
        targetY = px * MAX_DEG;
        frame ??= requestAnimationFrame(loop);
      });

      card.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        frame ??= requestAnimationFrame(loop);
      });
    });
  }

  // Cuenta desde cero hasta el valor real; el HTML ya trae el número final por si falla
  function initCountUp(): void {
    const DURATION = 1300;

    document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((element) => {
      const raw = element.dataset.countTo ?? '';
      const target = Number.parseFloat(raw);
      if (Number.isNaN(target)) return;

      const decimals = raw.split('.')[1]?.length ?? 0;
      const start = performance.now();

      const step = (now: number): void => {
        const progress = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    });
  }

  // Iniciales y color del avatar a partir del nombre, igual que los autores del feed
  function initialsOf(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '?';
    return words
      .slice(0, 2)
      .map((word) => word[0]!.toUpperCase())
      .join('');
  }

  function avatarVariant(name: string): number {
    let hash = 0;
    for (const char of name.trim().toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
    return (hash % 10) + 1;
  }

  // Vista previa del avatar y contador de caracteres del formulario
  function initComposer(): void {
    const name = document.querySelector<HTMLInputElement>('.composer__name');
    const text = document.querySelector<HTMLTextAreaElement>('.composer__text');
    const avatar = document.querySelector<HTMLElement>('.composer__avatar');
    const count = document.querySelector<HTMLElement>('.composer__count');
    if (!name || !text || !avatar || !count) return;

    const renderAvatar = (): void => {
      avatar.textContent = initialsOf(name.value);
      avatar.className = avatar.className.replace(/\bavatar--\d+\b/g, '').trim();
      if (name.value.trim()) avatar.classList.add(`avatar--${avatarVariant(name.value)}`);
    };

    const renderCount = (): void => {
      count.textContent = `${text.value.length} / ${text.maxLength}`;
      count.classList.toggle('is-near', text.value.length >= text.maxLength * 0.9);
    };

    name.addEventListener('input', renderAvatar);
    text.addEventListener('input', renderCount);
    renderAvatar();
    renderCount();
  }

  document.addEventListener('DOMContentLoaded', () => {
    safe(initThemeToggle, 'el cambio de tema');
    safe(initModules, 'la navegación');
    safe(initSpotlight, 'el efecto de luz');
    safe(initTilt, 'la inclinación 3D');
    safe(initCountUp, 'el contador');
    safe(initComposer, 'el formulario');
  });
})();
