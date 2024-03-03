import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import "d3";
const StackedAreaChart_svelte_svelte_type_style_lang = "";
const css = {
  code: ".chart.svelte-qd3asf{width:800px;height:400px;margin:50px auto}h1.svelte-qd3asf{text-align:center;font-family:Arial;font-size:32px}h3.svelte-qd3asf{text-align:center;font-family:Arial;font-size:18px}",
  map: null
};
const StackedAreaChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `




<h1 class="svelte-qd3asf">Patent applications in the U.S. by the applicants&#39; regions of origin from 1965-2015</h1>
<h3 class="svelte-qd3asf">Hover over an area on the plot to see which region it represents.</h3>

<div class="chart svelte-qd3asf"></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>
    ${validate_component(StackedAreaChart, "StackedAreaChart").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
