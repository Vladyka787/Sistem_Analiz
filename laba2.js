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

        fetch('handler1laba2.php/?Verh=' + Verh.value, {
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

        fetch("handler2laba2.php", {
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

                let verh = result.verh;
                let matrix_smeg = result.matrix_smeg;
                let new_matrix_smeg = result.new_matrix_smeg;

                let elem = document.getElementById('matrix_smeg');

                let html_rebra = "<p>";
                for (let i = 0; i < rebra_matrix.length; i++) {
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
                        if (j === 0) {
                            html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_matrix_incident = html_matrix_incident + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_matrix_incident = html_matrix_incident + "<br>";
                });

                html_matrix_incident = html_matrix_incident + "</p>";

                let html_new_matrix_smeg = "<p> Матрица смежности(после): <br>";

                new_matrix_smeg.forEach(function (strk, i, new_matrix_smeg) {
                    if (i === 0) {
                        html_new_matrix_smeg = html_new_matrix_smeg + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            verh.forEach(function (value, k, verh) {
                                if (value.number_new === j) {
                                    html_new_matrix_smeg = html_new_matrix_smeg + `<input type="text" style="width: 3em" value="${j + 1}(${value.number_old + 1})">`;
                                }
                            })

                        });
                        html_new_matrix_smeg = html_new_matrix_smeg + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        if (j === 0) {
                            verh.forEach(function (value, k, verh) {
                                if (value.number_new === i) {
                                    html_new_matrix_smeg = html_new_matrix_smeg + `<input type="text" style="width: 3em" value="${i + 1}(${value.number_old + 1})">`;
                                    // html_new_matrix_smeg = html_new_matrix_smeg + `<input type="text" style="width: 3em" value="${j + 1}(${value.number_old + 1})">`;
                                }
                            })
                        }
                        html_new_matrix_smeg = html_new_matrix_smeg + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_new_matrix_smeg = html_new_matrix_smeg + "<br>";
                });

                html_new_matrix_smeg = html_new_matrix_smeg + "</p>";

                let html_matrix_smeg = "<hr><p> Матрица смежности(до): <br>";

                matrix_smeg.forEach(function (strk, i, matrix_smeg) {
                    if (i === 0) {
                        html_matrix_smeg = html_matrix_smeg + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            html_matrix_smeg = html_matrix_smeg + `<input type="text" style="width: 3em" value="${j + 1}">`;
                        });
                        html_matrix_smeg = html_matrix_smeg + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        if (j === 0) {
                            html_matrix_smeg = html_matrix_smeg + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_matrix_smeg = html_matrix_smeg + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_matrix_smeg = html_matrix_smeg + "<br>";
                });

                html_matrix_smeg = html_matrix_smeg + "</p>";

                let html_level = "<p> Иерархические уровни: <br>";

                verh.forEach(function (item, i, verh) {
                    if (i === 0) {
                        html_level = html_level + `<input type="text" style="width: 3em" value='\'>`;
                        html_level = html_level + `<input type="text" style="width: 6em" value='Вершины'><br>`;
                    }
                    for (let j = 0; j < 2; j++) {
                        if (j === 0) {
                            let count = 0;
                            verh.forEach(function (el, k, verh) {
                                if (el.level === i) {
                                    count++;
                                }
                            });
                            if (count > 0) {
                                html_level = html_level + `<input type="text" style="width: 3em" value='${i + 1}'>`;
                            }
                        } else {
                            let count = 0;
                            verh.forEach(function (el, k, verh) {
                                if (el.level === i) {
                                    html_level = html_level + `<input type="text" style="width: 3em; background-color: lightblue;"  value='${el.number_old + 1}'>`;
                                    count++;
                                }
                            });
                            if (count > 0) {
                                html_level = html_level + `<br>`;
                            }
                        }
                    }
                });

                html_level = html_level + "</p>";

                elem.insertAdjacentHTML('afterend', html_matrix_incident);
                elem.insertAdjacentHTML('afterend', html_rebra);
                elem.insertAdjacentHTML('afterend', html_new_matrix_smeg);
                elem.insertAdjacentHTML('afterend', html_level);
                elem.insertAdjacentHTML('afterend', html_matrix_smeg);

            });

    })

})