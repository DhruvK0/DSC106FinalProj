<script>
  // import ScrollyTeller from '../components/ScrollyTeller.svelte'
  import Scroller from "@sveltejs/svelte-scroller";
  import StackedAreaChart from "./components/StackedAreaChart.svelte";
  import Lorem from "./components/Lorem.svelte";
  import TitleCard from "./assets/TitleCard.svelte";
  import LineChart from "./components/LineChart.svelte";
  import PatentChart from "./components/PatentChart.svelte";

  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;
</script>

<main>
  <TitleCard/>
  <h1 class="flex items-center justify-center mb-10">A Change in Immigration</h1>
  <LineChart/>
  <h2 class="flex items-center justify-center ml-80 mr-80 mb-20">In 1965 the Immigration and Nationality Act was passed, repealing the long standing national-origin quotas which primarily favored immigrants from Western and Northern Europe. The new system favored immigrant families, which allowed well-educated families from non-European countries to establish themselves and create a foothold for their families to immigrate.</h2>
  
  <Lorem /> 
  <Scroller
    bind:top
    bind:threshold
    bind:bottom
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background" class="bg-orange-100 border-t-2 border-b-2 border-orange-500 p-4 text-lg overflow-hidden">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress class="w-full" value="{count ? (index + 1) / count : 0}"></progress>

      <p>offset in current section</p>
      <progress class="w-full" value="{offset || 0}"></progress>

      <p>total progress</p>
      <progress class="w-full" value="{progress || 0}"></progress>
    </div>

    <div slot="foreground" class="pointer-events-none" style="padding-left: 50%;">
      <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 1</section>
      <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 2</section>
      <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 3</section>
      <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 4</section>
      <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 5</section>
    </div>
  </Scroller>
  <StackedAreaChart />
  <div class="h-80"></div>
  <Scroller
    bind:top
    bind:threshold
    bind:bottom
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background" class="bg-orange-100 border-t-2 border-b-2 border-orange-500 p-4 mb-20 mt-20 text-lg overflow-hidden">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress class="w-full" value="{count ? (index + 1) / count : 0}"></progress>

      <p>offset in current section</p>
      <progress class="w-full" value="{offset || 0}"></progress>

      <p>total progress</p>
      <progress class="w-full" value="{progress || 0}"></progress>

      <PatentChart {index}/>
    </div>

    <div slot="foreground" class="pointer-events-none mt-10" style="padding-left: 50%;">
      <section class="pointer-events-all custom-height bg-opacity-50 bg-black text-white p-4 mb-8">section 1</section>
      <section class="pointer-events-all custom-height bg-opacity-50 bg-black text-white p-4 mb-8">section 2</section>
      <section class="pointer-events-all custom-height bg-opacity-50 bg-black text-white p-4 mb-8">section 3</section>
      <section class="pointer-events-all custom-height bg-opacity-50 bg-black text-white p-4 mb-8">section 4</section>
      <section class="pointer-events-all custom-height bg-opacity-50 bg-black text-white p-4 mb-8">section 5</section>
    </div>

  </Scroller>
  <Lorem />
</main>

<style>
  .custom-height {
  height: 1000px;
}
</style>