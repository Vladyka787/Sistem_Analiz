<?php

include_once("Edge.php");
include_once("Verh.php");

function matrix_smeg_v_incident(array $matrix_smeg)
{
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
}

function resenie(array $E, int $kolv_verh, array $verh)
{
    $v_use = [];
    $v_not_use = $verh;

    $new_number = 0;

    while ($v_not_use != []) {
        for ($i = 0, $iMax = count($v_not_use); $i < $iMax; $i++) {
            $k = 0;
            for ($j = 0, $jMax = count($E); $j < $jMax; $j++) {
                if ($E[$j]->v2 == $v_not_use[$i]->number_old) {
                    $k++;
                }
            }

            if ($k == 0) {
                $v_not_use[$i]->level = 0;
                $v_not_use[$i]->number_new = $new_number;
                $new_number++;
                $v_use[] = $v_not_use[$i];
                unset($v_not_use[$i]);
                $v_not_use = array_values($v_not_use);
            }
        }

        for ($j = 0, $jMax = count($v_use); $j < $jMax; $j++) {
            foreach ($E as $mValue) {
                if ($mValue->v1 == $v_use[$j]->number_old) {

                    for ($z = 0, $zMax = count($v_not_use); $z < $zMax; $z++) {
                        if ($v_not_use[$z]->number_old == $mValue->v2) {
                            $v_not_use[$z]->level = $v_use[$j]->level + 1;
                            $v_not_use[$z]->number_new = $new_number;
                            $new_number++;
                            $v_use[] = $v_not_use[$z];
                            unset($v_not_use[$z]);
                            $v_not_use = array_values($v_not_use);
                            break;
                        }

                    }
                }
            }
        }


    }

    return $verh;
}

$out[] = json_decode(file_get_contents('php://input'));
//echo json_encode($out);

//$arr = [
//    [0, 1, 1, 0],
//    [0, 0, 0, 0],
//    [0, 0, 0, 0],
//    [1, 0, 1, 0],
//];

$arr = $out[0]->arr;
$matrix_smeg = [];

foreach ($arr as $item) {
    $matrix_smeg[] = $item;
}

$kolv_verh = count($matrix_smeg[0]);

$verh = [];

for ($i = 0; $i < $kolv_verh; $i++) {
    $item = new Verh();
    $item->number_old = $i;
    $verh[] = $item;
}

$E = [];

for ($i = 0; $i < $kolv_verh; $i++) {
    for ($j = 0; $j < $kolv_verh; $j++) {
        if ($matrix_smeg[$i][$j] == 1) {
            $edge = new Edge($i, $j);
            $E[] = $edge;
        }
    }
}

$verh = resenie($E, $kolv_verh, $verh);

$new_matrix_smeg = [];

$E_new = [];

foreach ($E as $item) {
    $k1 = 0;
    $k2 = 0;
    $vrem = new Edge(-1, -1);
    foreach ($verh as $value) {
        if (($item->v1 == $value->number_old) && ($k1 == 0)) {
            $vrem->v1 = $value->number_new;
            $k1++;
        }
        if (($item->v2 == $value->number_old) && ($k2 == 0)) {
            $vrem->v2 = $value->number_new;
            $k2++;
        }
    }
    $E_new[] = $vrem;
}

for ($i = 0; $i < $kolv_verh; $i++) {
    for ($j = 0; $j < $kolv_verh; $j++) {
        $new_matrix_smeg[$i][$j] = 0;
    }
}

foreach ($E_new as $item) {
    $new_matrix_smeg[$item->v1][$item->v2] = 1;
}

$res_matrix_smeg_v_incident = matrix_smeg_v_incident($new_matrix_smeg);

$data = [
    'new_matrix_smeg' => $new_matrix_smeg,
    'matrix_smeg' => $matrix_smeg,
    'incident' => $res_matrix_smeg_v_incident,
    'verh' => $verh,
];

echo json_encode($data);