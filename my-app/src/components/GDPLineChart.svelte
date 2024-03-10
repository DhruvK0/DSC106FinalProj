<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    export let index = 0; // Accepts index from parent
  
    let chart; // References the chart container
  
    // Example data - replace with your actual data loading logic
    let data = d3.csvParse(`Year,Doubled Immigration,Recent Immigration
2020,21,21
2025,24,23
2030,27,25
2035,31,28
2040,35,31
2045,41,34
2050,47,37`)
  
    onMount(() => drawChart());
  
    // Reactively update the chart when 'index' changes
    $: index, drawChart();
  
    function drawChart() {
      // Clear existing SVG to redraw
      d3.select(chart).select("svg").remove();
  
      const margin = { top: 10, right: 30, bottom: 30, left: 120 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  
      const svg = d3.select(chart)
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Set up the scales and axes
      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d['Doubled Immigration'], d['Recent Immigration']))])
        .range([height, 0]);
  
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format("d")));
      svg.append('g')
        .call(d3.axisLeft(y));

        // X-axis label
      svg.append("text")             
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`) // Adjusted for positioning
        .style("text-anchor", "middle")
        .text("Year");

      // Y-axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em") // Adjust spacing to the axis
        .style("text-anchor", "middle")
        .text("U.S GDP (Trillions of Dollars)");
  
      // Define line generators
      const lineGenerators = {
        'Doubled Immigration': d3.line().x(d => x(d.Year)).y(d => y(d['Doubled Immigration'])).curve(d3.curveMonotoneX),
        'Recent Immigration': d3.line().x(d => x(d.Year)).y(d => y(d['Recent Immigration'])).curve(d3.curveMonotoneX)
      };
  
      // Define colors for the lines
      const colors = {
        'Doubled Immigration': '#5e9b85',
        'Recent Immigration': '#024140'
      };
  
      // Conditionally draw lines
      if (index === 3) {
        // Draw only "Recent Immigration" line
        drawLine(svg, data, lineGenerators['Recent Immigration'], colors['Recent Immigration']);
      } else if (index === 4) {
        // Draw both lines
        Object.keys(lineGenerators).forEach(key => {
          drawLine(svg, data, lineGenerators[key], colors[key]);
        });
      }
    }
  
    // Function to draw a line
    function drawLine(svg, data, lineGenerator, color) {
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", lineGenerator)
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
        .transition()
          .duration(2000)
          .attr("stroke-dashoffset", 0);
    }
  </script>
  
  <div bind:this={chart}></div>
  