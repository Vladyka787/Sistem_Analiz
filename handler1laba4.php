<?php
$n = $_GET['Verh'];
?>
<div id="matrix_smeg">
    <?php
    for ($i = 0; $i < $n; $i++) {
        ?>
        <div>
            <?php
            for ($j = 0; $j < $n; $j++) {
                ?>
                <input
                    type="text" size="1" id="<?php echo "mass_str_" . ($i + 1) . "|mass_stlb_" . ($j + 1) ?>"
                    value="<?php echo 0 ?>"
                >
                <?php
            }
            ?>
        </div>
        <?php
    }
    ?>
</div>