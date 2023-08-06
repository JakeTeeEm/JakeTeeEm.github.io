const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthDayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

async function createHtmlTable() {
    let chart = document.getElementById('chart_data');

    for (let i = 0; i < 12; i++) {
        let monthDiv = document.createElement('div');

        monthDiv.id = monthNames[i];

        for (let j = 0; j <= monthDayCounts[i]; j++) {
            let childDiv;

            if (j === 0) {
                childDiv = document.createElement('p');

                childDiv.appendChild(document.createTextNode(monthNames[i]));
            } else {
                childDiv = document.createElement('div');


                let pDiv = document.createElement('p');

                pDiv.appendChild(document.createTextNode(`${j}`));


                childDiv.appendChild(pDiv);
            }

            monthDiv.appendChild(childDiv);
        }

        chart.appendChild(monthDiv);
    }
}

(async function main() {
    // Get if leap year
    const date = new Date();

    if (date.getFullYear() % 4 === 0) {
        monthDayCounts[1] = 29;
    }

    // Create actually shown data table
    await createHtmlTable();


    let chartData = await fetch('./chartData.json')
        .then(async (res) => {
            return await res.json();
        })
        .catch(async (err) => {
            console.log(err);
        });

    console.log(chartData);


    // Update chart to show if stream or not
    let chart = document.getElementById('chart_data').children;

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < monthDayCounts[i]; j++) {
            if (j < monthDayCounts[i]) {
                for (let k = 0;; k++) {
                    let chartDate = {
                        year: 2023,
                        month: i + 1,
                        day: j + 1
                    }

                    if (k >= chartData.data.length) {
                        chart[i].children[j + 1].className = 'no_data';

                        break;
                    }
                    else if (chartData.data[k].day.year === chartDate.year && chartData.data[k].day.month === chartDate.month && chartData.data[k].day.day === chartDate.day) {
                        if (chartData.data[k].live === true) {
                            chart[i].children[j + 1].className = 'live';

                            chart[i].children[j + 1].addEventListener('click', functionOnClick);
                        } else {
                            chart[i].children[j + 1].className = 'offline';
                        }

                        console.log(chartDate);
                        break;
                    }
                }
            }
        }
    }

    for (let i = 0; i < 12; i++) {

        let dataInMonth = false;

        for (let j = 0; j < monthDayCounts[i]; j++) {
            if (chart[i].children[j + 1].className !== 'no_data') {
                dataInMonth = true;
            }
        }

        if (dataInMonth === false) {
            chart[i].children[0].className = 'no_data';
        }
    }
})();

async function functionOnClick() {
    alert('meow');
}