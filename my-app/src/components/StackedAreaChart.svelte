<!-- StackedAreaChart.svelte -->
<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    onMount(() => {
        d3.csv("data/patents_grouped.csv").then(function(data) {
            const margin = { top: 10, right: 30, bottom: 30, left: 30 };
            const width = 800 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            const svg = d3.select(".chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Transpose the data
            const transposedData = [];
            Object.keys(data[0]).forEach(year => {
                if (year !== 'Region') {
                    const total = data.reduce((acc, row) => acc + (+row[year]), 0);
                    const yearData = { year };
                    data.forEach(row => {
                        yearData[row.Region] = +row[year] / total;
                    });
                    transposedData.push(yearData);
                }
            });

            // Define the keys for the stack
            const keys = Object.keys(transposedData[0]).slice(1);

            // Define the color scale
            const color = d3.scaleOrdinal()
                .domain(keys)
                .range(["#fcf9f5", "#024140", "#5e9b85", "#15688c", "#88b8c6", "#39274f", "#da9969"]);

            // Create the stack
            const stack = d3.stack()
                .keys(keys)
                .order(d3.stackOrderNone)
                .offset(d3.stackOffsetNone);

            const series = stack(transposedData);

            // Create scales for the x and y axes
            const x = d3.scaleBand()
                .domain(transposedData.map(d => d.year))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, 1]) // Change the domain to [0, 1] for percentage
                .range([height - margin.bottom, margin.top]);

            // Create the area function
            const area = d3.area()
                .x(d => x(d.data.year) + x.bandwidth() / 2)
                .y0(d => y(d[0]))
                .y1(d => y(d[1]));

            const tooltip = d3.select(".chart")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("position", "absolute");

            // Add the areas to the chart
            svg.selectAll(".area")
                .data(series)
                .join("path")
                .attr("class", "area")
                .attr("fill", d => color(d.key))
                .attr("d", area)
                .on("click", (event, d) => {
                    const mouseX = d3.pointer(event, svg.node())[0]; // Ensure you reference the correct element for pointer events
                    const hoveredYear = x.domain().find(year => {
                        const start = x(year);
                        const end = start + x.bandwidth();
                        return mouseX >= start && mouseX < end;
                    });
                    if (hoveredYear) {
                        const yearData = d.find(data => data.data.year === hoveredYear);
                        tooltip.html(`Region: ${d.key}<br>Year: ${hoveredYear}<br>Percentage: ${d3.format(".0%")(yearData[1] - yearData[0])}`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 20) + "px")
                            .style("opacity", 1);
                    }
                })
                .on("mouseover", (event, d) => {
                    let newcolor = d3.hsl(color(d.key));
                    newcolor.l -= 0.1;
                    d3.select(event.currentTarget)
                        .attr("fill", newcolor);
                    tooltip.style("opacity", 1);
                    d3.select(event.currentTarget).attr("stroke", "black");

                    const mouseX = d3.pointer(event, this)[0]; // Get the mouse's x position relative to the SVG.
                    const hoveredYear = x.domain().find(year => {
                        const start = x(year);
                        const end = start + x.bandwidth();
                        return mouseX >= start && mouseX <= end;
                    });
                    const yearData = d.find(d => d.data.year === hoveredYear);

                    tooltip.html("Region: " + d.key + "<br>" + "Year: " + hoveredYear + "<br>" + "Percentage: " + d3.format(".0%")(yearData[1] - yearData[0]))
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px").style("color", "black");
                })
                .on("mousemove", (event) => {
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", (event, d) => {
                    d3.select(event.currentTarget)
                        .attr("fill", color(d.key));
                    d3.select(event.currentTarget).attr("stroke", "none");
                    tooltip.style("opacity", 0);
                })
                .append("title")
                .text(d => d.key);

            // Add the x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("transform", "rotate(-45)");

            // Create the y-axis with percentage format
            const yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".0%")); // Format ticks as percentages

            // Add the y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis);

            // Add the x-axis label
            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2)
                .attr("y", height + margin.top + 20)
                .attr("text-anchor", "middle")
                .text("Year");

            // Add the y-axis label
            svg.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -height / 2)
                .attr("y", -margin.left)
                .attr("dy", "1em")
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "middle")
                .text("Percentage of Patents");

        }).catch(function(error) {
            console.log(error);
        });
    });
</script>

<style>
    /* Add your custom styles here */
    /* body {
        font-family: Arial, sans-serif;
    } */
    .chart {
        width: 800px;
        height: 400px;
        margin: 50px auto;
    }
    /* .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }
    .axis text {
        font-size: 12px;
    }
    .area {
        fill-opacity: 0.8;
    }
    .legend {
        font-size: 12px;
    } */
    h1 {
        text-align: center;
        font-family: Arial;
        font-size:32px;
    }
    /* h2 {
        text-align: center;
        font-family: Arial;
        font-size:24px;
    } */
    h3 {
        text-align: center;
        font-family: Arial;
        font-size:18px;
    }

    .tooltip {
        opacity: 0; /* Initially hidden */
        text-align: center;
        color: black;
    }
</style>

<h1>Patent applications in the U.S. by the applicants' regions of origin from 1965-2015</h1>
<h3>Hover over an area on the plot for more detail. Click to update tooltip.</h3>

<div class="chart"></div>
