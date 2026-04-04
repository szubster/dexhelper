import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// SVG Definitions matching Lucide-react
const LayoutGridIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`;
const DatabaseIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`;
const SparklesIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`;
const SettingsIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/></svg>`;

@customElement('lit-bottom-nav')
export class BottomNav extends LitElement {
  @property({ type: String }) pathname = '/';

  // Render in Light DOM to inherit global Tailwind styles directly
  createRenderRoot() {
    return this;
  }

  private handleLinkClick(e: Event, path: string) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-click', { detail: { path } }));
  }

  private handleSettingsClick() {
    this.dispatchEvent(new CustomEvent('settings-click'));
  }

  render() {
    const isDex = this.pathname === '/' || this.pathname.startsWith('/pokemon');
    const isStorage = this.pathname === '/storage';
    const isAssistant = this.pathname === '/assistant';

    // Calculate position for the active pill background (using standard CSS logic instead of motion layoutId)
    // 4 items + settings button = 5 items total.
    let leftPercent = '0%';
    if (isDex) leftPercent = '4%';
    else if (isStorage) leftPercent = '24%';
    else if (isAssistant) leftPercent = '44%';
    else leftPercent = '64%'; // Default/fallback - hidden or offscreen logic if needed

    return html`
      <nav class="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-t border-white/5 px-6 pb-[env(safe-area-inset-bottom,20px)] pt-3 sm:hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div class="flex justify-around items-center max-w-sm mx-auto relative px-2">

          <!-- Active Indicator Background using standard CSS transition instead of motion -->
          <div
            class="absolute h-12 w-[22%] bg-[var(--theme-primary)]/10 rounded-2xl border border-[var(--theme-primary)]/20 -z-10 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
            style="left: ${leftPercent};"
          ></div>

          <a
            href="/"
            @click=${(e: Event) => this.handleLinkClick(e, '/')}
            class="flex flex-col items-center gap-1 transition-all duration-300 py-1 ${isDex ? 'text-[var(--theme-primary)]' : 'text-zinc-500'}"
          >
            <div class="transition-transform active:scale-80 ${isDex ? 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]' : ''}">
              ${LayoutGridIcon}
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Pokedex</span>
          </a>

          <a
            href="/storage"
            @click=${(e: Event) => this.handleLinkClick(e, '/storage')}
            class="flex flex-col items-center gap-1 transition-all duration-300 py-1 ${isStorage ? 'text-[var(--theme-primary)]' : 'text-zinc-500'}"
          >
            <div class="transition-transform active:scale-80 ${isStorage ? 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]' : ''}">
              ${DatabaseIcon}
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Storage</span>
          </a>

          <a
            href="/assistant"
            @click=${(e: Event) => this.handleLinkClick(e, '/assistant')}
            class="flex flex-col items-center gap-1 transition-all duration-300 py-1 ${isAssistant ? 'text-[var(--theme-primary)]' : 'text-zinc-500'}"
          >
            <div class="transition-transform active:scale-80 ${isAssistant ? 'drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.5)]' : ''}">
              ${SparklesIcon}
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Assistant</span>
          </a>

          <button
            @click=${this.handleSettingsClick}
            class="flex flex-col items-center gap-1 transition-all duration-300 py-1 text-zinc-500 hover:text-zinc-300"
          >
            <div class="transition-transform active:scale-80">
              ${SettingsIcon}
            </div>
            <span class="text-[8px] font-black uppercase tracking-[0.2em]">Menu</span>
          </button>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-bottom-nav': BottomNav;
  }
}
