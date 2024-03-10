<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    // Define the dimensions for your chart
    const margin = { top: 20, right: 30, bottom: 40, left: 200 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    export let category;
    let data;
    let colors = ['#fcf9f5', '#024140', '#5e9b85', '#15688c', '#88b8c6'];

    // Load your CSV data
    onMount(async () => {
        data = await d3.csv('data/visas.csv', d => {
            d.value = +d[category]; // Dynamically convert string to number based on index
            return d;
        });
        createBarChart();
    });


    $: if (data) {
        console.log('category', category);
        updateBarChart();
    }

    let svg, x, y, bars, tooltip;

    function createBarChart() {
        // Create SVG and append it to body
        svg = d3.select('#bar-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Define the tooltip
        tooltip = d3.select('#tooltip');

        // X axis
        x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width]);
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .attr('class', 'x-axis')
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // Y axis
        y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(d => d.Education))
            .padding(.1);
        svg.append('g')
            .call(d3.axisLeft(y));

        // Bars with hover effect
        bars = svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', x(0))
            .attr('y', d => y(d.Education))
            .attr('width', d => x(d.value))
            .attr('height', y.bandwidth())
            .attr('fill', (d, i) => colors[i % colors.length])
            .on('mouseover', (event, d) => {
                tooltip.style('visibility', 'visible')
                    .text(`Value: ${d.value}`)
                    .style('top', (event.pageY - 10) + 'px')
                    .style('left', (event.pageX + 10) + 'px');
                d3.select(event.currentTarget) // Select the current rectangle
                    .attr('fill', '#a4d3d3'); // Change its fill color
            })
            .on('mousemove', (event) => {
                tooltip.style('top', (event.pageY - 10) + 'px')
                    .style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
                d3.select(event.currentTarget) // Select the current rectangle
                    .attr('fill', '#69b3a2'); // Change its fill color
            });
    }

    function updateBarChart() {
        // Process data based on new index
        data.forEach(d => {
            d.value = +d[category]; // Update value based on current index
        });

        // Update the X axis domain
        x.domain([0, d3.max(data, d => d.value)]);
        svg.select('.x-axis')
            .transition()
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // Update the bars
        bars.data(data)
            .transition()
            .attr('width', d => x(d.value));
    }
</script>
<div class="items-center customheight">
    <h3 class="w-full">Percentage breakdown of {category}</h3>
    <div id="bar-chart"></div>
    <div id="tooltip" style="position: absolute; visibility: hidden; padding: 10px; background: white; border: 1px solid #d9d9d9; border-radius: 5px; pointer-events: none; z-index: 10; color: #333"></div>
</div>

<style>
    .customheight {
        height: 420px
    }
</style>
