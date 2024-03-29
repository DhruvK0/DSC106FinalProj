<script>
  import {
    csv,
    extent,
    scaleLinear,
    scaleTime,
    line,
    curveNatural,
    timeFormat,
  } from "d3";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Axis from "./Axis.svelte";
  let dataset = [];
  const row = function (data) {
    data.amt = +data.amt;
    data.year = new Date(data.year);
    return data;
  };
  onMount(async () => {
    dataset = await csv(
      "https://gist.githubusercontent.com/DhruvK0/cbd9deb696dcc7e7df909be4c2b05467/raw/49feb03d8e44cfe4c257b12a664a302b82140317/immigrant_trend.csv",
      row
    ).then((data) => {
      return data;
    });
  });
  const margin = { top: 15, bottom: 50, left: 100, right: 20 };
  const width = 900,
    height = 600;
  const innerHeight = height - margin.top - margin.bottom,
    innerWidth = width - margin.left - margin.right;
  const tickFormat = (value) => timeFormat("%a")(value);
  $: xScale = scaleTime()
    .domain(extent(dataset, (d) => d.year))
    .range([0, innerWidth])
    .nice();
  $: yScale = scaleLinear()
    .domain(extent(dataset, (d) => d.amt))
    .range([innerHeight, 0])
    .nice();
  $: line_gen = line()
    .curve(curveNatural)
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.amt))(dataset);
  $: verticalLineData =
    dataset.length > 0 && yScale
      ? [
          {
            year: new Date(1965, 0, 1),
            amt: yScale.domain()[0],
          },
          {
            year: new Date(1965, 0, 1),
            amt: yScale.domain()[1],
          },
        ]
      : [];

  $: verticalLine =
    verticalLineData.length > 0
      ? line()
          .x((d) => xScale(d.year))
          .y((d) => yScale(d.amt))(verticalLineData)
      : "";
</script>

<main class="flex items-center justify-center">
  <svg {width} {height} >
    <g transform={`translate(${margin.left},${margin.top})`}>
      <Axis {innerHeight} {margin} scale={xScale} position="bottom" />
      <Axis {innerHeight} {margin} scale={yScale} position="left" />
      <text transform={`translate(${-80},${innerHeight / 2}) rotate(-90)`}
        >Number of Immigrants</text
      >
      <path d={line_gen}/>
      {#each dataset as data, i}
        <circle
          cx={xScale(data.year)}
          cy={yScale(data.amt)}
          r="3"
          in:fly={{ duration: 5000, delay: i * 15 }}
        >
          <title>Year: {timeFormat("%Y")(data.year)}, Number of Immigrants: {data.amt}</title>
        </circle>
      {/each}
      <text x={innerWidth / 2} y={innerHeight + 35}>Year</text>
      <text x={width / 2 - margin.left} y={300} text-anchor="middle" class="chart-title">1965: Immigration and Nationality Act</text>
      <path d={verticalLine} class="path2"/>

    </g>
  </svg>
</main>

<style>
  circle {
    fill: #137880;
  }
  path {
    fill: transparent;
    stroke: rgb(18, 153, 90);
    stroke-width: 2.5;
    stroke-linejoin: round;
    stroke-dasharray: 4400;
    stroke-dashoffset: 0;
    animation: draw 25s ease;
  }
  .path2 {
    fill: transparent;
    stroke: rgb(197, 197, 197);
    stroke-width: 2.5;
    stroke-linejoin: round;
    stroke-dasharray: 4400;
    stroke-dashoffset: 0;
    animation: draw 25s ease;
  }
  @keyframes draw {
    from {
      stroke-dashoffset: 4400;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
</style>