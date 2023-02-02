

var ctx = document.getElementById('graph');
var myChart = new Chart(ctx,{ 
    type: 'bar',
    //data: data,
    options: {
        scales:{ 
            yAxes:[{ 
                ticks: { 
                    beginAtZero:true 
                } 
            }] 
        } 
    }
});

const labels = ['00h', '08h', '16h', '24h'];
 

const dataset4 = {
    label: "Concentración sin riesgo",
    data: [0, 0, 7, 0],
    fill: false,
    tension: 0.1,
    backgroundColor: 'rgba(54,235,84,0.5)', // Color de fondo
};

const dataset2 = {
    label: "Concentración elevada",
    data: [0, 25, 0, 0],
    fill: false,
    tension: 0.1,
    backgroundColor: 'rgba(235,214,54,0.5)', // Color de fondo
};

const dataset1 = {
    label: "Peligro",
    data: [0, 0, 0, 40],
    fill: false,
    tension: 0.1,
    backgroundColor: 'rgba(235,54,54,0.5)', // Color de fondo
};
 
 
const graph = document.querySelector("#grafica");
 
const data = {
    labels: labels,
    datasets: [dataset1,dataset2,dataset4]
};
 
const config = {
    type: 'bar',
    data: data,
};
 
new Chart(graph, config);