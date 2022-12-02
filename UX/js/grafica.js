

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

const labels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
 
const dataset1 = {
    label: "Peligro",
    data: [10, 55, 60, 120, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 1, 90, 80, 70, 0, 0],
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset2 = {
    label: "Concentración elevada",
    data: [5, 44, 55, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 1, 90, 80, 70, 0, 0, 0],
    borderColor: 'rgba(69, 248, 84, 0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset3 = {
    label: "Concentración baja",
    data: [20, 40, 55, 120, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 90, 80, 70, 0, 0, 0],
    borderColor: 'rgba(69, 140, 248, 0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset4 = {
    label: "Concentración sin riesgo",
    data: [18, 40, 20, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 1, 0, 90, 80, 70, 0, 0],
    borderColor: 'rgba(245, 40, 145, 0.8)',
    fill: false,
    tension: 0.1
};
 
const graph = document.querySelector("#grafica");
 
const data = {
    labels: labels,
    datasets: [dataset1,dataset2,dataset3,dataset4]
};
 
const config = {
    type: 'line',
    data: data,
};
 
new Chart(graph, config);