<?php

include_once("bfs-php.php");
include_once("Edge.php");

function topologich_decompose(array $graph, array $E)
{
    $V = [];

    $kolv_verh = count($graph);

    while ($graph != []) {
        for ($i = 0; $i < $kolv_verh; $i++) {
            if ($graph[$i] != []) {
                $R = [];
                for ($j = 0; $j < $kolv_verh; $j++) {
                    if (bfs($graph, $i, $j)) {
                        $R[] = $j;
                    }
                }

                $Q = [];
                for ($j = 0; $j < $kolv_verh; $j++) {
                    if (bfs($graph, $j, $i)) {
                        $Q[] = $j;
                    }
                }

                $V_vrem = array_intersect($R, $Q);
                $V_vrem = array_values($V_vrem);

                $V[] = $V_vrem;

                foreach ($V_vrem as $item) {
                    unset($graph[$item]);

                    foreach ($graph as $value) {
                        foreach ($value as $key => $elem) {
                            if ($elem == $item) {
                                unset($value[$key]);
                            }
                        }
                    }
                }
            }
        }
    }

    $G = [];

    $unused_E = $E;

    for ($i = 0, $iMax = count($V); $i < $iMax; $i++) {
        $vrem_arr = [];
        $vrem_arr[] = $V[$i];

        $vrem_arr_E = [];
        foreach ($E as $key => $item) {
            for ($m = 0, $mMax = count($V[$i]); $m < $mMax; $m++) {
                for ($k = 0, $kMax = count($V[$i]); $k < $kMax; $k++) {
                    if (($item->v1 == $V[$i][$m]) && ($item->v2 == $V[$i][$k])) {
                        $vrem_arr_E[] = $key;
                        unset($unused_E[$key]);
                    }
                }
            }
        }
        $vrem_arr_E = array_unique($vrem_arr_E);
        $vrem_arr_E = array_values($vrem_arr_E);
        $vrem_arr[] = $vrem_arr_E;

        $G[$i] = $vrem_arr;
    }

    $unused_E = array_values($unused_E);

    $matrix_incident = [];

    for ($i = 0, $iMax = count($unused_E); $i < $iMax; $i++) {
        for ($j = 0, $jMax = count($G); $j < $jMax; $j++) {
            $matrix_incident[$i][$j] = 0;
            for ($k = 0, $kMax = count($G[$j][0]); $k < $kMax; $k++) {
                if ($G[$j][0][$k] == $unused_E[$i]->v1) {
                    $matrix_incident[$i][$j] = 1;
                }
                if ($G[$j][0][$k] == $unused_E[$i]->v2) {
                    $matrix_incident[$i][$j] = -1;
                }
            }

        }
    }

    for ($i = 0, $iMax = count($matrix_incident); $i < $iMax; $i++) {
        for ($j = $i, $jMax = count($matrix_incident); $j < $jMax; $j++) {
            if (($matrix_incident[$i] == $matrix_incident[$j]) && ($i != $j)) {
                unset($matrix_incident[$j]);
            }
        }
    }

    $matrix_incident = array_values($matrix_incident);

    return [
        'G' => $G,
        'matrix_incident' => $matrix_incident,
    ];
}

$out[] = json_decode(file_get_contents('php://input'));

$arr = $out[0]->arr;

$kolv_verh = count($arr);

$graph = [];

for ($i = 0; $i < $kolv_verh; $i++) {
    $vrem_arr = [];
    for ($j = 0; $j < $kolv_verh; $j++) {
        if ($arr[$i][$j] == 1) {
            $vrem_arr[] = $j;
        }
    }
    $graph[$i] = $vrem_arr;
}

$matrix_smeg = $arr;

$E = [];

for ($i = 0; $i < $kolv_verh; $i++) {
    for ($j = 0; $j < $kolv_verh; $j++) {
        if ($matrix_smeg[$i][$j] == 1) {
            $edge = new Edge($i, $j);
            $E[] = $edge;
        }
    }
}

$matrix_result = topologich_decompose($graph, $E);

echo json_encode([
    'matrix_result' => $matrix_result,
    'E' => $E,
]);
