<?php

function matrix_smeg_v_incident(array $matrix_smeg, $orient)
{
    if ($orient) {
        $kolv_verh_in_arr = count($matrix_smeg);

        $rebra_matrix = [];

        for ($i = 0; $i < $kolv_verh_in_arr; $i++) {
            for ($j = 0; $j < $kolv_verh_in_arr; $j++) {
                if ($matrix_smeg[$i][$j] == 1) {
                    $vrem_arr = [];
                    $vrem_arr['verh_1'] = $i;
                    $vrem_arr['verh_2'] = $j;
                    $rebra_matrix[] = $vrem_arr;
                }
            }
        }

        $kolv_rebr_in_arr = count($rebra_matrix);

//        for ($i = 0, $iMax = $kolv_rebr_in_arr; $i < $iMax; $i++) {
//            echo 'ребро a' . ($i + 1) . ' состоит из вершин ' . ($rebra_matrix[$i]['verh_1'] + 1) . ' и ' . ($rebra_matrix[$i]['verh_2'] + 1) . "\n";
//        }

        $matrix_incident = [];

        for ($i = 0; $i < $kolv_verh_in_arr; $i++) {
            for ($j = 0; $j < $kolv_rebr_in_arr; $j++) {
                $matrix_incident[$i][$j] = 0;
                if ($rebra_matrix[$j]["verh_1"] == $i) {
                    $matrix_incident[$i][$j] = 1;
                }
                if ($rebra_matrix[$j]["verh_2"] == $i) {
                    $matrix_incident[$i][$j] = -1;
                }
            }
        }

        return [
            "rebra_matrix" => $rebra_matrix,
            "matrix_incident" => $matrix_incident
        ];
    } else {
        $kolv_verh_in_arr = count($matrix_smeg);

        $rebra_matrix = [];

        for ($i = 0; $i < $kolv_verh_in_arr; $i++) {
            for ($j = $i; $j < $kolv_verh_in_arr; $j++) {
                if ($matrix_smeg[$i][$j] == 1) {
                    $vrem_arr = [];
                    $vrem_arr['verh_1'] = $i;
                    $vrem_arr['verh_2'] = $j;
                    $rebra_matrix[] = $vrem_arr;
                }
            }
        }

        $kolv_rebr_in_arr = count($rebra_matrix);

//        for ($i = 0, $iMax = $kolv_rebr_in_arr; $i < $iMax; $i++) {
//            echo 'ребро a' . ($i + 1) . ' состоит из вершин ' . ($rebra_matrix[$i]['verh_1'] + 1) . ' и ' . ($rebra_matrix[$i]['verh_2'] + 1) . "\n";
//        }

        $matrix_incident = [];

        for ($i = 0; $i < $kolv_verh_in_arr; $i++) {
            for ($j = 0; $j < $kolv_rebr_in_arr; $j++) {
                $matrix_incident[$i][$j] = 0;
                if (($rebra_matrix[$j]["verh_1"] == $i) || ($rebra_matrix[$j]["verh_2"] == $i)) {
                    $matrix_incident[$i][$j] = 1;
                }
            }
        }

        return [
            "rebra_matrix" => $rebra_matrix,
            "matrix_incident" => $matrix_incident
        ];
    }
}

function matrix_smeg_v_right_incident(array $matrix_smeg)
{
    $kolv_verh_in_arr = count($matrix_smeg);

    $matrix_right_incident = [];

    for ($i = 0; $i < $kolv_verh_in_arr; $i++) {
        $vrem_arr = [];
        for ($j = 0; $j < $kolv_verh_in_arr; $j++) {
            if ($matrix_smeg[$i][$j] == 1) {
                $vrem_arr[] = $j + 1;
            }
        }
        $matrix_right_incident[] = $vrem_arr;
    }

//    var_dump($matrix_right_incident);

    return $matrix_right_incident;
}

//$out['arr'] = [
//    [0, 1, 1, 1],
//    [1, 0, 0, 0],
//    [1, 0, 0, 1],
//    [1, 0, 1, 0],
//];
//$out['arr'] = [
//    [0, 1, 1, 0],
//    [0, 0, 0, 0],
//    [0, 0, 0, 0],
//    [1, 0, 1, 0],
//];
//$out['orient'] = false;
//$out['orient'] = true;
$out[] = json_decode(file_get_contents('php://input'));
//echo json_encode($out);

//var_dump($out);

$orient = $out[0]->orient;
$arr = $out[0]->arr;
$matrix_smeg = [];

foreach ($arr as $item) {
    $matrix_smeg[] = $item;
}

//echo json_encode($matrix_smeg);

$res_matrix_smeg_v_incident = matrix_smeg_v_incident($matrix_smeg, $orient);

$res_matrix_smeg_v_right_incident = matrix_smeg_v_right_incident($matrix_smeg);

echo json_encode([
    "incident" => $res_matrix_smeg_v_incident,
    "right_incident" => $res_matrix_smeg_v_right_incident
]);
