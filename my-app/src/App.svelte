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
  import BrinImg from "./assets/sergeybrin.jpeg";
  import GroveImg from "./assets/andygrove.jpg";
  import MuskCompaniesImg from "./assets/muskcompanies.jpg";
  import OmidyarImg from "./assets/pierreomidyar.jpeg";
  import ytFoundersImg from "./assets/ytfounders.jpg";

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
  <div class="aspect-w-16 aspect-h-9 h-full flex items-center justify-center mb-20">
    <iframe width="960" height="540" src="https://www.youtube.com/embed/cFTcc8Ashbw?si=4GOL2d99UuEUsQAA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  <HeaderOne/> 
  <!-- <Bar/>  -->
  <!-- <h2 class="flex items-center justify-center">1965: Immigration and Nationality Act</h2> -->
  <LineChart/>
  <div class="h-20"></div>
  <h2 class="flex items-center justify-center pr-40 pl-40 mb-20">In 1965 the Immigration and Nationality Act was passed, repealing the long standing national-origin quotas which primarily favored immigrants from Western and Northern Europe. The new system favored immigrant families, which allowed well-educated families from non-European countries to establish themselves and create a foothold for their families to immigrate.</h2>

  <StackedAreaChart />
  <!-- Andy Grove -->
  <div class="flex items-center flex-col mb-20 mt-20">
    <div class="flex items-center"> <!-- Use flex to align items in a row -->
        <div class="flex flex-col items-center"> <!-- Use flex-col to stack text vertically -->
            <p class="text-center text-2xl">Andy Grove, a Hungarian immigrant, served as the CEO of </p> 
            <p class="text-center text-2xl"> Intel from 1987-1998 and played a key role in the development and production of microprocessors.</p> 
        </div>
        <img src={GroveImg} alt='grove' class="w-1/2 border-l-2 border-transparent pl-0 pr-10"/> <!-- pl-0: 0px left padding -->
    </div>
</div>

<!-- Pierre Omidyar -->
<div class="flex items-center flex-col mb-20">
  <div class="flex items-center"> <!-- Use flex to align items in a row -->
      <img src={OmidyarImg} alt='omidyar' class="w-1/2 border-l-2 border-transparent pl-10 pr-20"/> <!-- pr-10: 10px right padding -->
      <div class="flex flex-col items-center"> <!-- Use flex-col to stack text vertically -->
          <p class="text-center text-2xl text-orange">Pierre Omidyar, an immigrant from France, founded</p>           
          <p class="text-center text-2xl text-orange">eBay, a leading online marketplace, in 1995.</p>           
      </div>
  </div>
</div>

<!-- Sergey Brin -->
<div class="flex items-center flex-col mb-20">
  <div class="flex items-center"> <!-- Use flex to align items in a row -->
      <div class="flex flex-col items-center"> <!-- Use flex-col to stack text vertically -->
        <p class="text-center text-2xl">Sergey Brin, a Russian immigrant, co-founded</p>
        <p class="text-center text-2xl">Google, one of the world's most influential technology companies, in 1998.</p> 
      </div>
      <img src={BrinImg} alt='brin' class="w-1/2 border-l-2 border-transparent pl-5 pr-10"/> <!-- pl-0: 0px left padding -->
  </div>
</div>

<!-- Elon Musk -->
<div class="flex items-center flex-col mb-20">
  <div class="flex items-center"> <!-- Use flex to align items in a row -->
      <img src={MuskCompaniesImg} alt='muskcompanies' class="w-1/2 border-l-2 border-transparent pl-10 pr-5"/> <!-- pr-10: 10px right padding -->
      <div class="flex flex-col items-center"> <!-- Use flex-col to stack text vertically -->
          <p class="text-center text-2xl text-orange">Elon Musk, an immigrant from South Africa, founded</p> 
          <p class="text-center text-2xl text-orange">several successful companies including</p> 
          <p class="text-center text-2xl text-orange">PayPal (1998), SpaceX (2002), and Tesla (2003).</p> 
          
      </div>
  </div>
</div>

<!-- YouTube Founders -->
<div class="flex items-center flex-col mb-20">
  <div class="flex items-center"> <!-- Use flex to align items in a row -->
      <div class="flex flex-col items-center"> <!-- Use flex-col to stack text vertically -->
        <p class="text-center text-2xl">Steve Chen and Jawed Karim, immigrants from China and Germany respectively, co-founded YouTube, a popular</p>
        <p class="text-center text-2xl">video-sharing platform, in 2005.</p> 
      </div>
      <img src={ytFoundersImg} alt='ytfounders' class="w-2/3 border-l-2 border-transparent pl-0 pr-10"/> <!-- pl-0: 0px left padding -->
  </div>
</div>
<p class="text-center text-3xl ml-40 mr-40">These are just a few examples of the many immigrants who have made significant contributions to innovation and technology in the United States.</p>

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
        <h2>CA immigrants suffer from generally low education levels, with just 32% of them having a Bachelor's degree or better in comparison to 38% of their US-born counterparts. Furthermore, a whopping 29% of CA immigrants do not have a high school degree, in comparison to the 7% for US-born Californians.</h2>
      </section>
      <section class="pointer-events-all custom-height bg-opacity-50 text-black p-4 mb-8">
        <h2>The tides are beginning to shift, with 52% of recent CA immigrants attaining a Bachelor's degree or better. Though a significant proportion of recent immigrants do not have a high school degree (17%), the trend in education of immigrants is positive -- and will only lead to more innovation in the future.</h2>
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
        <h2>Projection: $47 trillion in GDP at doubled the current rate of immigration. That's a 27% increase in U.S. GDP.</h2>
      </section>
    </div>

  </Scroller>
  <div class="flex items-center justify-center mt-40">
    <img src={BidenImg} alt='biden' class="flex items center justify-center w-1/2"/>
  </div>
  
  <Biden/>
</main>

<style>
  .custom-height {
  height: 500px;
}
</style>