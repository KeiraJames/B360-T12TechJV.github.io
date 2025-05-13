// Wait for the DOM to be fully loaded before executing script
document.addEventListener('DOMContentLoaded', function() {

    // --- Data ---
    const labels = ['Python', 'JavaScript', 'Java', 'C++', 'HTML', 'CSS'];
    const dataValues = [40, 35, 20, 15, 10, 12];
    const yourName = "Keira James"; 

    // --- Soft Brown Theme Chart Colors ---
    const backgroundColors = [
        'rgba(161, 136, 127, 0.7)', // Muted Brown
        'rgba(204, 177, 165, 0.7)', // Light Taupe
        'rgba(121, 85, 72, 0.7)',   // Richer Brown
        'rgba(188, 170, 164, 0.7)', // Dusty Rose Brown
        'rgba(215, 204, 200, 0.7)', // Very Light Brown/Beige
        'rgba(141, 110, 99, 0.7)'   // Medium Earthy Brown
    ];
    const borderColors = [
        'rgba(161, 136, 127, 1)',
        'rgba(204, 177, 165, 1)',
        'rgba(121, 85, 72, 1)',
        'rgba(188, 170, 164, 1)',
        'rgba(215, 204, 200, 1)',
        'rgba(141, 110, 99, 1)'
    ];

    // --- Doughnut Chart ---
    const ctxDoughnut = document.getElementById('doughnutChart');
    if (ctxDoughnut) {
        new Chart(ctxDoughnut.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hours Spent',
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1.5, // Slightly thicker border
                    hoverOffset: 6,   // More pronounced hover
                    hoverBorderColor: borderColors.map(color => color.replace('1)', '1)')), // Ensure opaque hover border
                    hoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#5d4037', // Dark brown legend text
                            font: {
                                size: 13
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: `Programming Language Popularity - ${yourName}`,
                        color: '#4e342e', // Darker brown title text
                        font: {
                            size: 17,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20 // More space below title
                        }
                    },
                    tooltip: { // Customize tooltips
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#4e342e',
                        bodyColor: '#5d4037',
                        borderColor: '#d7ccc8',
                        borderWidth: 1
                    }
                }
            }
        });
    } else {
        console.error("Doughnut chart canvas element not found!");
    }


    // --- Horizontal Bar Chart ---
    const ctxHorizontalBar = document.getElementById('horizontalBarChart');
    if (ctxHorizontalBar) {
        new Chart(ctxHorizontalBar.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Hours Spent Learning Last Month',
                    data: dataValues,
                    backgroundColor: backgroundColors, // Re-use the same brown palette
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours Spent',
                            color: '#5d4037',
                            font: { size: 13 }
                        },
                        ticks: { color: '#795548' }, // Axis numbers
                        grid: { color: '#e0e0e0' }   // Lighter grid lines
                    },
                    y: {
                         title: {
                            display: true,
                            text: 'Programming Language',
                            color: '#5d4037',
                            font: { size: 13 }
                        },
                        ticks: { color: '#795548' },
                        grid: { display: false } // Often cleaner to hide y-axis grid lines on horizontal bar
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Hours Spent Learning Languages - ${yourName}`,
                        color: '#4e342e',
                        font: {
                            size: 17,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: { // Customize tooltips
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#4e342e',
                        bodyColor: '#5d4037',
                        borderColor: '#d7ccc8',
                        borderWidth: 1
                    }
                }
            }
        });
    } else {
        console.error("Horizontal bar chart canvas element not found!");
    }
});
