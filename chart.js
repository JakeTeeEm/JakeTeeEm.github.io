const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthDayCounts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

async function createHtmlTable() {
    let chart = document.getElementById('chart_data');

    for (let i = 0; i < 12; i++) {
        let monthDiv = document.createElement('div');

        monthDiv.id = monthNames[i];

        for (let j = 0; j < 32; j++) {
            let childDiv;

            if (j === 0) {
                childDiv = document.createElement('p');

                childDiv.appendChild(document.createTextNode(monthNames[i]));
            } else {
                childDiv = document.createElement('div');


                let pDiv = document.createElement('p');

                if (j <= monthDayCounts[i]) {
                    pDiv.appendChild(document.createTextNode(`${j}`));
                }


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
        for (let j = 0; j < 31; j++) {
            if (j < monthDayCounts[i]) {
                for (let k = 0;; k++) {
                    let dateUNIX = Date.parse(`${monthNames[i]} ${j + 1}, 2023`) + 3600000;

                    if (k >= chartData.data.length) {
                        chart[i].children[j + 1].classList.add('no_data');

                        break;
                    }
                    else if (dateUNIX === chartData.data[k].day) {
                        if (chartData.data[k].live === true) {
                            chart[i].children[j + 1].classList.add('live');

                            chart[i].children[j + 1].addEventListener('hover', functionOnClick);
                        } else {
                            chart[i].children[j + 1].classList.add('offline');
                        }

                        break;
                    }
                }
            } else {
                chart[i].children[j + 1].classList.add('invalid');
            }
        }
    }
})();

async function functionOnClick() {
    alert('meow');
}