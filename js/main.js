// import '/node_modules/bootstrap/dist/js/bootstrap.min.js'

let priceChart = document.querySelector('#priceCanvas')
let statisticsChart = document.querySelector('#statisticsCanvas')
let priceChartFunc, statisticsChartFunc

if (priceChart) priceChartInit()

function priceChartInit() {
    const config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'June', 'August'],
            datasets: [{
                data: [0, 100, 90, 150, 140, 220, 120, 90, 140],
                fill: true,
                pointBackgroundColor: '#6F4FF2',
                pointBorderWidth: 4,
                backgroundColor: '#f0edfe',
                borderColor: '#6F4FF2',
                tension: 0.1
            }]
        },

        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: "#6F4FF2"
                    }
                },
                y: {
                    min: 0,
                    max: 350,
                    ticks: {
                        stepSize: 50
                    },
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: "#6F4FF2"
                    }
                }
            },
        }
    }

    priceChartFunc = new Chart(priceChart, config)

}

if (statisticsChart) statisticsChartInit()

function statisticsChartInit() {
    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart, legend, options) {

        }
    }

    const config = {
        type: 'doughnut',
        data: {
            labels: ['Artwork Sold', 'Artwork CanCel'],
            datasets: [{
                data: [180, 180],
                backgroundColor: [
                    '#6f4fef',
                    '#f0edfe'
                ],
                hoverOffset: 4,
                cutout: 100,
                borderWidth: 2
            }]
        },

        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    fullSize: true,
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 14
                        },
                    }
                }
            }
        },
        plugins: [legendMargin]
    }
    statisticsChartFunc = new Chart(statisticsChart, config)
}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

const themeToggler = document.querySelector('.theme-toggler')

themeToggler.addEventListener('click', themeToglerInit)

function themeToglerInit(event) {
    let currentThemeBtn
    let themeToggler = this

    if (event.target.id === 'themeToggler') {
        currentThemeBtn = themeToggler.querySelector(`#${themeToggler.dataset.theme}`)
    } else {
        currentThemeBtn = event.target
    }

    const chooseTheme = (themeToggler, currentThemeBtn, themeBtnId) => {
        let secondThemeBtn

        const changeColorsChart = (firstColor, secondColor) => {
            if (!priceChartFunc || !statisticsChartFunc) return
            priceChartFunc.data.datasets[0].backgroundColor = firstColor
            statisticsChartFunc.data.datasets[0].backgroundColor[1] = secondColor

            priceChartFunc.update()
            statisticsChartFunc.update()
        }

        const setThemeBtn = (currentThemeBtn, secondThemeBtn) => {
            currentThemeBtn.style.cssText = 'display:none !important';
            secondThemeBtn.style.cssText = 'display:inline !important';
        }

        if (themeBtnId === 'moonTheme') {
            document.body.classList.add('darkTheme')
            changeColorsChart('#704ff232', '#1D1932')
            secondThemeBtn = themeToggler.querySelector('#sunTheme')
        } else {
            document.body.classList.remove('darkTheme')
            secondThemeBtn = themeToggler.querySelector('#moonTheme')
            changeColorsChart('#f0edfe', '#f0edfe')
        }

        secondThemeBtn.parentNode.dataset.theme = secondThemeBtn.id
        setThemeBtn(currentThemeBtn, secondThemeBtn)

    }

    chooseTheme(themeToggler, currentThemeBtn, currentThemeBtn.id)
}