

var ctx = document.getElementById('graph');
var myChart = new Chart(ctx,{ 
    type: 'line',
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

const labels = ['00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
 
const dataset1 = {
    label: "Peligro",
    data: [0, 0, 0 ,0 , 0, 0, 40, 70, 60, 80, 100, 110, 95, 90, 90, 70, 40, 2, 1 ,2 ,1 ,2 , 0, 0],
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset2 = {
    label: "Concentración elevada",
    data: [0, 0, 0, 0, 0, 0, 0, 60, 50, 70, 90, 90, 95, 80, 60, 3, 2, 1, 3, 3, 2, 1, 0],
    borderColor: 'rgb(247,126,0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset3 = {
    label: "Concentración baja",
    data: [110, 115, 100, 120, 100, 90, 90, 70, 60, 50, 40, 30, 20, 10, 5, 4, 3, 2, 55, 100, 80, 90, 55, 60],
    borderColor: 'rgba(69, 140, 248, 0.8)',
    fill: false,
    tension: 0.1
};
 
const dataset4 = {
    label: "Concentración sin riesgo",
    data: [60, 70, 65, 80, 90, 80, 100, 80, 50, 0, 0, 0, 3, 5, 4, 3, 2, 1, 50, 90, 80, 70, 65, 70],
    borderColor: 'rgb(111,245,0.8)',
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