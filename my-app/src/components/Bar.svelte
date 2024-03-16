

<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    // Import D3 in the onMount function
    const d3 = await import('d3');

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 810 - margin.left - margin.right,
      height = 405 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = await d3.csv(
      'https://gist.githubusercontent.com/DhruvK0/dc9201df3bc6da4787741b9d956b9bab/raw/28828aa5f3cee9038fbe7460a3e9f40b60bf6cf3/fortune.csv'
    );

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d) => d.industry);

    // Add X axis
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2]);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 110]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#39274F', '#DA9969', '#4daf4a']);

    // stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(data);

    //create legend
    svg.append("circle").attr("cx",70).attr("cy",40).attr("r", 6).style("fill", "#39274F")
    svg.append("circle").attr("cx",70).attr("cy",70).attr("r", 6).style("fill", "#DA9969")
    svg.append("text").attr("x", 90).attr("y", 40).text("Non-Immigrant Founded Companies").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 90).attr("y", 70).text("Immigrant Founded Companies").style("font-size", "15px").attr("alignment-baseline","middle")


    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.industry))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
  });
</script>

<div id="my_dataviz"></div>
