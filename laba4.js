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

        fetch('handler1laba4.php/?Verh=' + Verh.value, {
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

        fetch("handler2laba4.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((result) => {
                console.log(result);

                let itog = result;

                let elem = document.getElementById('matrix_smeg');

                let html_res = "<hr><p>Матрица наим расст: <br>";

                itog.forEach(function (ras, i, itog) {
                    if (i === 0) {
                        html_res = html_res + `<input type="text" style="width: 3em" value='\'>`;
                        ras.forEach(function (item, j, ras) {
                            html_res = html_res + `<input type="text" style="width: 3em" value="${j + 1}">`;
                        });
                        html_res = html_res + `<br>`;
                    }
                    ras.forEach(function (dva, j, ras) {
                        if (j === 0) {
                            html_res = html_res + `<input type="text" style="width: 3em" value="${i + 1}">`;
                        }
                        html_res = html_res + `<input type="text" style="width: 3em; background-color: lightblue" value="${dva[0]}">`;
                    });
                    html_res = html_res + "<br>";
                })

                html_res = html_res + "</p>";

                let html_putb = "<p>Пути: <br>";

                itog.forEach(function (ras, i, itog) {
                    i
                    ras.forEach(function (dva, j, ras) {

                        html_putb = html_putb + `${i + 1}-${j + 1}: `;
                        dva[1].forEach(function (putb, k, dva) {
                            html_putb = html_putb + `${putb + 1} `
                        })
                        html_putb = html_putb + "<br>";
                    });
                    html_putb = html_putb + "<br>";
                })

                html_putb = html_putb + "</p>";

                elem.insertAdjacentHTML('afterend', html_putb);
                elem.insertAdjacentHTML('afterend', html_res);

            });

    })

})