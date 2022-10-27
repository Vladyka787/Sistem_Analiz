<head>
    <script src="laba2.js"></script>
</head>
<p>Лаборатория №2 <a href="index.php">К меню</a></p>
<p>Начнем с теории. Порядковая функция на ориентированном графе без контуров разбивает множество вершин графа на непересекающиеся подмножества, упорядоченные так, что если вершина входит в подмножество с номером i, то следующая за ней вершина входит в подмножество с номером большим чем i. Полученные непересекающиеся подмножества вершин называются иерархическими уровнями.</p>
<?php

?>
<p id="message_kolvo">Введите количество вершин в матрице смежности</p>
<p id="data_kolvo">
    <input type="number" size="1" min="2" max="15" value="2">
    <button id="get_kolvo_verh">Выбрать</button>
    <button id="solutionClick" style="padding-left: 3px" disabled="disabled">Решение</button>
</p>
<?php