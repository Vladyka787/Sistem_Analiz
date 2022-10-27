<?php

function matrix_left_incident_to_smeg(array $matrix_left_incident)
{
    $matrix_incident = [];

    $kolv_verh = count($matrix_left_incident);

    foreach ($matrix_left_incident as $item) {
        $vrem_arr = [];
        for ($i = 0; $i < $kolv_verh; $i++) {
            if (in_array($i + 1, $item)) {
                $vrem_arr[] = 1;
            } else {
                $vrem_arr[] = 0;
            }
        }
        $matrix_incident[] = $vrem_arr;
    }

    for ($i = 0; $i < $kolv_verh; $i++) {
        for ($j = $i; $j < $kolv_verh; $j++) {
            $vrem = $matrix_incident[$i][$j];
            $matrix_incident[$i][$j] = $matrix_incident[$j][$i];
            $matrix_incident[$j][$i] = $vrem;
        }
    }

    return $matrix_incident;
}

function matrix_kvadr_umnog(array $A_k, array $A)
{ // Считает только подобные квадраты к примеру: 4х4 и 4х4

    $result = [];
    $kolv_verh = count($A);

    for ($l = 0; $l < $kolv_verh; $l++) {
        $res_vrem = [];
        for ($m = 0; $m < $kolv_verh; $m++) {
            $res = 0;
            for ($n = 0; $n < $kolv_verh; $n++) {
                $res += $A_k[$l][$n] * $A[$n][$m];
            }
            $res_vrem[] = $res;
        }
        $result[] = $res_vrem;
    }

    return $result;
}

function rasschet_summ_matrix_smeg(array $matrix_smeg)
{
    $matrix_itog = $matrix_smeg;

    $stepen = count($matrix_smeg);

    $ost = $stepen;
    while ($ost != 1) {
        $matrix_itog = matrix_kvadr_umnog($matrix_itog, $matrix_smeg);
//        $matrix_smeg = matrix_kvadr_umnog([[5,8,9],[4,5,3],[4,8,6]], [[8,6,3],[1,3,3],[1,6,5]]);
        $ost--;
    }

    return $matrix_itog;
}

function rasschet_matrix_sviaz(array $summ_matrix_smeg)
{
    $matrix_sviaz = [];

    $kolv_verh = count($summ_matrix_smeg);

    for ($i = 0; $i < $kolv_verh; $i++) {
        $vrem_arr = [];
        for ($j = 0; $j < $kolv_verh; $j++) {
            if ($summ_matrix_smeg[$i][$j] >= 1) {
                $vrem_arr[] = 1;
            } else {
                $vrem_arr[] = 0;
            }
        }
        $matrix_sviaz[] = $vrem_arr;
    }

    return $matrix_sviaz;
}

$out[] = json_decode(file_get_contents('php://input'));

$arr = $out[0]->arr;


$matrix_left_incident = [];

foreach ($arr as $item) {
    foreach ($item as $value) {
        $matrix_left_incident[] = $value;
    }
}

$matrix_smeg = matrix_left_incident_to_smeg($matrix_left_incident);

$summ_matrix_smeg = rasschet_summ_matrix_smeg($matrix_smeg);

$matrix_sviaz = rasschet_matrix_sviaz($summ_matrix_smeg);

echo json_encode([
    "matrix_smeg" => $matrix_smeg,
    "summ_matrix_smeg" => $summ_matrix_smeg,
    "matrix_sviaz" => $matrix_sviaz,
]);