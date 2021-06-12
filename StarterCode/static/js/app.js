function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json("StarterCode/static/js/samples.json").then((data) => {

    let nameID = data.names;
    console.log(nameID)
    // Use D3 to select the dropdown menu
    
    nameID.forEach((element) => {
        dropdownMenu
        .append('option')
        .text(element)
        .property('value', element);
    });
    optionChanged('940')


})
};


init();

function optionChanged(id) {
    d3.json("StarterCode/static/js/samples.json").then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == id);
    let result = resultArray[0];

    let ids = result.otu_ids;
    let labels = result.otu_labels;
    let value = result.sample_values;

    let yticks = ids.slice(0, 10).reverse();
    let barData = [
      {
        y: yticks, 
        x: value.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
    }
];

    let barLayout = {
    title: "Top 10",
    margin: { t: 30, l: 150 }
};

    Plotly.newPlot("bar", barData, barLayout);


    let bubbleChart = {
        title: "Bubble Chart",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
  };
    let bubbleData = [
        {
        x: ids,
        y: value,
        text: labels,
        mode: "markers",
        marker: {
            size: value,
            color: ids,
            colorscale: "Peach"
        }
        }
  ];

    Plotly.newPlot("bubble", bubbleData);

});


    }