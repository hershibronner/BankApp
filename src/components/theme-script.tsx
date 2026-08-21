/**
 * Runs before first paint so the page never flashes the wrong theme. Kept as a
 * raw string because it must execute synchronously in <head>, ahead of React.
 */
const script = `(function(){try{var stored=localStorage.getItem('moneytrack:theme');var system=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',stored==='light'||stored==='dark'?stored:system)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
