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

        fetch('handler1laba5.php/?Verh=' + Verh.value, {
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

        let kolv_verh = elem_matrix.length;

        for (let j = 0; j < kolv_verh; j++) {
            if (!arr[j]) {
                arr[j] = [];
            }
            arr[j].push(elem_matrix[j].value.split(","));
        }

        // console.log(elem_matrix);
        console.log(arr);

        let data = {
            arr: arr
        };

        fetch("handler2laba5.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);

                let matrix_smeg = result.matrix_smeg;
                let summ_matrix_smeg = result.summ_matrix_smeg;
                let matrix_sviaz = result.matrix_sviaz;

                let elem = document.getElementById('matrix_smeg');

                let html_summ_matrix_smeg = "<hr><p> Матрица смежности(суммарная): <br>";

                summ_matrix_smeg.forEach(function (strk, i, summ_matrix_smeg) {
                    if (i === 0) {
                        html_summ_matrix_smeg = html_summ_matrix_smeg + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            html_summ_matrix_smeg = html_summ_matrix_smeg + `<input type="text" style="width: 3em" value="${j + 1}">`;
                        });
                        html_summ_matrix_smeg = html_summ_matrix_smeg + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        if (j === 0) {
                            html_summ_matrix_smeg = html_summ_matrix_smeg + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_summ_matrix_smeg = html_summ_matrix_smeg + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_summ_matrix_smeg = html_summ_matrix_smeg + "<br>";
                });

                html_summ_matrix_smeg = html_summ_matrix_smeg + "</p>";


                let html_matrix_sviaz = "<p> Матрица связности: <br>";

                matrix_sviaz.forEach(function (strk, i, matrix_sviaz) {
                    if (i === 0) {
                        html_matrix_sviaz = html_matrix_sviaz + `<input type="text" style="width: 3em" value='\'>`;
                        strk.forEach(function (item, j, strk) {
                            html_matrix_sviaz = html_matrix_sviaz + `<input type="text" style="width: 3em" value="${j + 1}">`;
                        });
                        html_matrix_sviaz = html_matrix_sviaz + `<br>`;
                    }
                    strk.forEach(function (item, j, strk) {
                        if (j === 0) {
                            html_matrix_sviaz = html_matrix_sviaz + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_matrix_sviaz = html_matrix_sviaz + `<input type="text" style="width: 3em; background-color: lightblue" value="${item}">`;
                    });
                    html_matrix_sviaz = html_matrix_sviaz + "<br>";
                });

                html_matrix_sviaz = html_matrix_sviaz + "</p>";

                elem.insertAdjacentHTML('afterend', html_matrix_sviaz);
                elem.insertAdjacentHTML('afterend', html_summ_matrix_smeg);

            });

    })

})