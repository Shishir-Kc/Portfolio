// The scrollcraft engine (src/scrollcraft/scrollcraft.js) is a vendored,
// unmodified classic script that assigns window.ScrollCraft.
export {};

interface ScrollCraftInstance {
  layout(): void;
  read(): void;
}

declare global {
  interface Window {
    ScrollCraft: {
      mount(root?: Element | Document | string, opts?: { lerp?: number }): ScrollCraftInstance;
      instances: ScrollCraftInstance[];
    };
  }
}
