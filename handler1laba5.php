<?php
$n = $_GET['Verh'];
?>
<div id="matrix_smeg">
    <p>Ввод производится через ,</p>
    <?php
    for ($j = 0; $j < $n; $j++) {
        ?>
        G-(<?php echo $j + 1 ?>)=
        <input
                type="text" size="1" value="<?php echo 0 ?>"
        ><br>
        <?php
    }
    ?>
</div>