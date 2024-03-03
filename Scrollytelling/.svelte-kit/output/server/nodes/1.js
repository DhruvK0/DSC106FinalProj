

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ee9e1d72.js","_app/immutable/chunks/index.019f7634.js","_app/immutable/chunks/singletons.c0fbb7f7.js"];
export const stylesheets = [];
export const fonts = [];
