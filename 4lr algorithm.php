<?php

function volnovoiAlg(array $matrix, $start, $finish)
{
    $kolv_verh = count($matrix);

    $volni_metki = [];

    for ($i = 0; $i < $kolv_verh; $i++) {
        $volni_metki[] = -1;
    }

    $volni_metki[$start] = 0;

    $starii_front_volni = [$start];
    $novii_front_volni = [];

    while ($starii_front_volni) {
        $sosedi = [];

        foreach ($starii_front_volni as $item) {
            for ($j = 0; $j < $kolv_verh; $j++) {
                if ($matrix[$item][$j] == 1) {
                    if (!in_array($j, $sosedi)) {
                        $sosedi[] = $j;
                    }
                }
            }
        }

        foreach ($sosedi as $item) {
            if ($volni_metki[$item] == -1) {
                $novii_front_volni[] = $item;
            }
        }

        if ($novii_front_volni) {
            $level = max($volni_metki) + 1;
            foreach ($novii_front_volni as $item) {
                $volni_metki[$item] = $level;
            }
        }

        if ($volni_metki[$finish] != -1) {
            $starii_front_volni = [];
        } else {
            $starii_front_volni = $novii_front_volni;
            $novii_front_volni = [];
        }
    }

    $putb = [];
    if ($volni_metki[$finish] != -1) {
        $putb = [$finish];
        $dlina = count($volni_metki);
        $level = $volni_metki[$finish];
        while (!in_array($start, $putb)) {
            for ($i = 0; $i < $dlina; $i++) {
                if ($volni_metki[$i] == ($level - 1)) {
                    if ($matrix[$i][end($putb)]) {
                        if ($level != 0) {
                            $putb[] = $i;
                            $level--;
                        }
                    }
                }
            }
        }
    }

    if ($volni_metki[$finish] != -1) {
        return
            [
                $volni_metki[$finish],
                $putb,
            ];
    } else {
        return [
            "INF",
            $putb
        ];
    }
}

//$arr = [
//    [0, 10, 30, 50, 10],
//    ["INF", 0, "INF", "INF", "INF"],
//    ["INF", "INF", 0, "INF", 10],
//    ["INF", 40, 20, 0, "INF"],
//    [10, "INF", 10, 30, 0],
//];

//$arr = [
//    [0, 10, 15, "INF"],
//    ["INF", 0, 8, 3],
//    ["INF", "INF", 0, 6],
//    ["INF", "INF", "INF", 0],
//];

$arr = [
    [0, 10, 15, "INF"],
    ["INF", 0, 8, "INF"],
    ["INF", "INF", 0, 6],
    ["INF", "INF", "INF", 0],
];

$kolv_verh = count($arr);

for ($i = 0; $i < $kolv_verh; $i++) {
    for ($j = 0; $j < $kolv_verh; $j++) {
        if ($arr[$i][$j] == "INF") {
            $arr[$i][$j] = 0;
        }
        if ($arr[$i][$j] > 0) {
            $arr[$i][$j] = 1;
        }
    }
}

$itog = [];

for ($i = 0; $i < $kolv_verh; $i++) {
    for ($j = 0; $j < $kolv_verh; $j++) {
        if ($i == $j) {
            $itog[$i][$j] = [
                0,
                [$i]
            ];
        } else {
            $itog[$i][$j] = volnovoiAlg($arr, $i, $j);
        }
    }
}

echo 1;