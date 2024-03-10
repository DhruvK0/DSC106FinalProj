<script>
  // import ScrollyTeller from '../components/ScrollyTeller.svelte'
  import Scroller from "@sveltejs/svelte-scroller";
  import StackedAreaChart from "./components/StackedAreaChart.svelte";
  import Lorem from "./components/Lorem.svelte";
  import TitleCard from "./assets/TitleCard.svelte";
  import HeaderOne from "./assets/HeaderOne.svelte";
  import LineChart from "./components/LineChart.svelte";
  import VisaChart from "./components/VisaChart.svelte";
  import GdpLineChart from "./components/GDPLineChart.svelte";
  import Bar from "./components/Bar.svelte";
  import Container from "./components/Container.svelte";
    import Counter from "./lib/Counter.svelte";
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;
  let category = "CA Immigrants";
  $: {
    if (index == 0) {
      category = "CA Immigrants";
    } else {
      category = "Recent CA Immigrants"
    }
  }
</script>

<main>
  <TitleCard/>
  <div class="flex items-center justify-center m-40 text-4xl">Immigration in the United States serves as a dynamic force shaping innovation. The infusion of the world's smartest minds, from pioneers to skilled professionals, sparks creativity and propels industries forward. This melting pot of perspectives fosters breakthroughs in technology, medicine, and the arts. The enduring relationship between immigration and innovation defines the unique tapestry of progress in the United States.</div>
  <HeaderOne/> 
  <!-- <Bar/>  -->
  <Scroller
    bind:top
    bind:threshold
    bind:bottom
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background" class="p-4 text-lg overflow-hidden">
      <!-- <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress class="w-full" value="{count ? (index + 1) / count : 0}"></progress>

      <p>offset in current section</p>
      <progress class="w-full" value="{offset || 0}"></progress>

      <p>total progress</p>
      <progress class="w-full" value="{progress || 0}"></progress> -->

      {#if index === 0}
      <div class="flex items-left justify-left">
        <!-- <LineChart/> -->
        <Bar />
      </div>
        
      {/if}
      {#if index === 1}
      <div class="flex items-left justify-left">
          <LineChart/>
      </div>
      {/if}
    </div>

    <div slot="foreground" class="pointer-events-none mb-40" style="padding-left: 50%;">
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 m-20">
          <h2 class="flex items-center justify-center">Here we can see the current Fortune 500 companies broken down into sectors. The purple sections represent the amount of companies that are founded by American born founders. The orange sections represent the amount of companies founded by immigrants or children of immigrants.</h2>
        </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 ml-20 mt-40 pb-40">
          <h2 class="flex items-center justify-center">In 1965 the Immigration and Nationality Act was passed, repealing the long standing national-origin quotas which primarily favored immigrants from Western and Northern Europe. The new system favored immigrant families, which allowed well-educated families from non-European countries to establish themselves and create a foothold for their families to immigrate.</h2>
      </section>
      <!-- <section class="pointer-events-all h-80 bg-opacity-50 text-white p-4 m-20">section 4</section> -->
      <!-- <section class="pointer-events-all h-80 bg-opacity-50 bg-black text-white p-4 mb-8">section 5</section> -->
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
    <div slot="background">
      <!-- <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress class="w-full" value="{count ? (index + 1) / count : 0}"></progress>

      <p>offset in current section</p>
      <progress class="w-full" value="{offset || 0}"></progress>

      <p>total progress</p>
      <progress class="w-full" value="{progress || 0}"></progress> -->

      {#if index === 0 || index === 1}
      <div class="items-left justify-left">
          <!-- <VisaChart category="US-born Californians"/> -->
          <VisaChart {category}/>
      </div>
        
      {/if}
      {#if index === 2 || index === 3}
      <div class="items-left justify-left">
          <GdpLineChart {index}/>
      </div>
      {/if}
    </div>

    <div slot="foreground" class="mt-10" style="padding-left: 50%;">
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>CA immigrants suffer from generally low education levels, with just 32% of them having a Bachelor's degree or better in comparison to 38% of their US-born counterparts.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>The tides have shifted since, with 52% of recent CA immigrants attaining a Bachelor's degree or better.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>We're currently projected for a GDP of $37 trillion by 2050</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>...but a GDP of $47 trillion if we double the immigration rate.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>With Biden recently advocating for a bill that will raise the cap on immigrant visas by 250,000 every 5 years, the U.S. recognizes this and is looking to help fuel our growth in innovation.</h2>
      </section>
    </div>

  </Scroller>
</main>

<style>
  .custom-height {
  height: 500px;
}
</style>