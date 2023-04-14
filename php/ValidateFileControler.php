<?php
$contentJson = $_POST['contentJson'];
$uniqueToken = $_POST['tkn'];
if(isset($contentJson) && isset($uniqueToken)){
    $myfile = fopen('./temp/prdTemp.json', "w") or die("Unable to open file!");
    fwrite($myfile, $contentJson);
    fclose($myfile);
    echo 'Archivo creado correctamente';
}else{
    header("HTTP/1.1 401 Unauthorized");
}
?>