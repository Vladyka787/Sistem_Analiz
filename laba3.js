document.addEventListener("DOMContentLoaded", function () {

    let getKolvoVerh = document.getElementById('get_kolvo_verh');

    getKolvoVerh.addEventListener('click', function (event) {
        event.preventDefault();

        console.log("Выбрали количество вершин");
        let kolvoVerh = document.getElementById('data_kolvo');
        let Verh = kolvoVerh.querySelector("input");
        let arr = [];
        arr['kolvoVerh'] = Verh.value;

        // console.log(Verh.value);

        fetch('handler1laba3.php/?Verh=' + Verh.value, {
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

        // console.log(elem_matrix);
        console.log(arr);

        let data = {
            arr: arr
        };

        fetch("handler2laba3.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);

                let G = result.matrix_result.G;
                let matrix_incident = result.matrix_result.matrix_incident;
                let E = result.E;

                console.log(G);
                console.log(matrix_incident);
                console.log(E);

                let elem = document.getElementById('matrix_smeg');

                let html_G = "<p>Подграфы: <br>"
                G.forEach(function (obj, i, G) {
                    html_G = html_G + `G(${i + 1}): `;
                    html_G = html_G + `V( `;
                    obj[0].forEach(function (val, j, obj) {
                            html_G = html_G + `${val + 1} `;
                        }
                    )
                    ;
                    html_G = html_G + `) `;

                    html_G = html_G + `E( `;
                    obj[1].forEach(function (val, j, obj) {
                            html_G = html_G + `${val + 1} `;
                        }
                    )
                    ;
                    html_G = html_G + `) <br>`;

                });
                html_G = html_G + "</p>"

                let html_E = "<hr><p> Дуги: <br>"

                E.forEach(function (obj, i, E) {
                    html_E = html_E + `#${i + 1}: из ${obj.v1 + 1} в ${obj.v2 + 1} <br>`
                });
                html_E = html_E + `</p>`

                let html_matrix_incident = "<p> Матрица инцидентности: <br>";

                matrix_incident.forEach(function (strk, i, matrix_incident) {
                    if (i === 0) {
                        html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value="G(${j + 1})">`;
                        });
                        html_matrix_incident = html_matrix_incident + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        if (j === 0) {
                            html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value="a${i + 1}">`;
                        }
                        html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_matrix_incident = html_matrix_incident + "<br>";
                });

                html_matrix_incident = html_matrix_incident + "</p>";

                elem.insertAdjacentHTML('afterend', html_matrix_incident);
                elem.insertAdjacentHTML('afterend', html_G);
                elem.insertAdjacentHTML('afterend', html_E);

                //    черта-Е-Граф-Матрица инцидентности
            });

    })

})