

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.72247386.js","_app/immutable/chunks/index.019f7634.js"];
export const stylesheets = ["_app/immutable/assets/2.f6138430.css"];
export const fonts = [];
