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
  import Biden from "./assets/biden.svelte";
  import BidenImg from "./assets/biden.png";
  import HeaderThree from "./assets/HeaderThree.svelte";

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
  <!-- <h2 class="flex items-center justify-center">1965: Immigration and Nationality Act</h2> -->
  <LineChart/>
  <div class="h-20"></div>
  <h2 class="flex items-center justify-center pr-40 pl-40 mb-20">In 1965 the Immigration and Nationality Act was passed, repealing the long standing national-origin quotas which primarily favored immigrants from Western and Northern Europe. The new system favored immigrant families, which allowed well-educated families from non-European countries to establish themselves and create a foothold for their families to immigrate.</h2>

  <StackedAreaChart />
  <div class="h-20"></div>
  <HeaderThree/>
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
      <div class="flex items-left justify-left">
          <!-- <VisaChart category="US-born Californians"/> -->
          <VisaChart {category}/>
      </div>
        
      {/if}
      {#if index === 3 || index === 4}
      <div class="flex items-left justify-left">
          <GdpLineChart {index}/>
      </div>
      {/if}
      {#if index === 2}
      <div class="flex items-left justify-left">
          <Bar/>
      </div>
      {/if}
    </div>

    <div slot="foreground" class="mt-10" style="padding-left: 50%;">
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>32% of CA immigrants have Bachelor's degrees, in comparison to 38% of US-born Californians</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>52% of recent CA immigrants have Bachelor's degrees.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>
          Breakdown of immigrants / US-born founders of fortune 500 companies:
        </h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>Projection: $37 trillion in GDP at current rate of immigration.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>Projection: $47 trillion in GDP at doubled the current rate of immigration</h2>
      </section>
    </div>

  </Scroller>
  <div class="flex items-center justify-center">
    <img src={BidenImg} alt='biden' class="flex items center justify-center w-1/2"/>
  </div>
  
  <Biden/>
</main>

<style>
  .custom-height {
  height: 500px;
}
</style>