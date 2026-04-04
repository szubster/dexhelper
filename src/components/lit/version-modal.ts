import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { GameVersion } from '../../store';

// We import the config types here without bringing in React
import { getGenerationConfig } from '../../utils/generationConfig';

const AlertTriangleIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

@customElement('lit-version-modal')
export class VersionModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Number }) generation = 1;
  // We can pass the versions as a JSON string to keep it strictly string-based for attribute usage,
  // or use Lit's property mapping for complex objects.
  @property({ type: Array }) versions: { id: string; label: string; dotColor: string }[] = [];

  createRenderRoot() {
    return this;
  }

  private handleVersionClick(versionId: string) {
    this.dispatchEvent(new CustomEvent('version-select', {
      detail: { versionId },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.isOpen) return null;

    // Use default versions if none provided
    const displayVersions = this.versions.length > 0
      ? this.versions
      : [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions];

    return html`
      <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-lg bg-zinc-900 rounded-[2.5rem] border border-zinc-800 p-10 space-y-8 text-center transition-all duration-300 animate-in zoom-in-95 fade-in"
        >
          <div class="space-y-2">
            <div class="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4">
              ${AlertTriangleIcon}
            </div>
            <h2 class="text-2xl font-display font-black uppercase tracking-tight text-white">Select Game Version</h2>
            <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">We couldn't confidently detect your game version. Please select it manually.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${displayVersions.map(v => html`
              <button
                @click=${() => this.handleVersionClick(v.id)}
                class="group relative overflow-hidden p-6 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-red-500/50 transition-all text-center"
              >
                <div class="relative z-10 flex flex-col items-center gap-3">
                  <div class="w-3 h-3 rounded-full shadow-lg ${v.dotColor}"></div>
                  <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-100 group-hover:text-red-400 transition-colors">${v.label}</span>
                </div>
              </button>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-version-modal': VersionModal;
  }
}
