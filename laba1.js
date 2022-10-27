document.addEventListener("DOMContentLoaded", function () {

    let getKolvoVerh = document.getElementById('get_kolvo_verh');

    getKolvoVerh.addEventListener('click', function (event) {
        event.preventDefault();

        // console.log("Выбрали количество вершин");
        let kolvoVerh = document.getElementById('data_kolvo');
        let Verh = kolvoVerh.querySelector("input");
        let arr = [];
        arr['kolvoVerh'] = Verh.value;

        // console.log(Verh.value);

        fetch('handler1laba1.php/?Verh=' + Verh.value, {
            method: 'GET',
            credentials: "include"
        })
            .then(result => result.text())
            .then((result) => {
                let elem = document.getElementById('matrix_smeg');
                if (elem) {
                    elem.remove();
                    document.getElementById('data_kolvo').insertAdjacentHTML('afterend', result);
                } else {
                    document.getElementById('data_kolvo').insertAdjacentHTML('afterend', result);
                }

                document.getElementById('solutionClick').removeAttribute('disabled');
            })

    })

    let reshenie = document.getElementById('solutionClick');

    reshenie.addEventListener('click', function (eventTwo) {
        eventTwo.preventDefault();

        console.log('Решение');

        let matrix = document.getElementById('matrix_smeg');

        let elem_matrix = matrix.querySelectorAll("div > input");

        let arr = [];

        let sqrt = Math.sqrt(elem_matrix.length);

        for (let i = 0; i < sqrt; i++) {
            for (let j = 0; j < sqrt; j++) {
                if (!arr[i]) {
                    arr[i] = [];
                }
                arr[i].push(elem_matrix[i * sqrt + j].value);
                // console.log(elem_matrix[i * sqrt + j].value);
            }
        }

        let orient = matrix.querySelector("p > input");
        // console.log(orient["checked"]);

        // console.log(elem_matrix);
        // console.log(arr);

        let data = {
            arr: arr,
            orient: orient["checked"]
        };

        fetch("handler2laba1.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((result) => {

                console.log(result);

                let incident = result.incident;
                let matrix_incident = incident.matrix_incident;
                let rebra_matrix = incident.rebra_matrix;
                let right_incident = result.right_incident;

                console.log(incident);
                console.log(matrix_incident);
                console.log(rebra_matrix);
                console.log(right_incident);

                let elem = document.getElementById('matrix_smeg');

                let html_rebra = "<p>";
                for (let i = 0; i < rebra_matrix.length; i++) {
                    if (i === 0) {
                        html_rebra = html_rebra + "<hr>";
                    }
                    html_rebra = html_rebra + "ребро а" + (i + 1) + " соединяет вершины: " + (rebra_matrix[i].verh_1 + 1) + " и " + (rebra_matrix[i].verh_2 + 1) + "<br>";
                }
                html_rebra = html_rebra + "</p>";

                let html_matrix_incident = "<p> Матрица инцидентности: <br>";

                matrix_incident.forEach(function (strk, i, matrix_incident) {
                    if (i === 0) {
                        html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value="a${j + 1}">`;
                        });
                        html_matrix_incident = html_matrix_incident + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        // html_matrix_incident = html_matrix_incident + item + " ";
                        if (j === 0) {
                            html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_matrix_incident = html_matrix_incident + "<br>";
                });

                html_matrix_incident = html_matrix_incident + "</p>";

                let html_right_incident = "<p> Множество правых инциденций: <br>";

                right_incident.forEach(function (strk, i, right_incident) {
                    html_right_incident = html_right_incident + "G+(" + (i + 1) + ") = ( ";
                    strk.forEach(function (item, j, strk) {
                        html_right_incident = html_right_incident + item + " ";
                    });
                    html_right_incident = html_right_incident + ")<br>";
                });

                html_right_incident = html_right_incident + "</p>";

                elem.insertAdjacentHTML('afterend', html_right_incident);
                elem.insertAdjacentHTML('afterend', html_matrix_incident);
                elem.insertAdjacentHTML('afterend', html_rebra);
            });

    })
})