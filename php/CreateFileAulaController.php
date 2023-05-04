<?php
if(isset($_POST['fileName']) && isset($_POST['contentFile'])){
    $headers = getallheaders();
    print_r($headers);
    $fileName = $_POST['fileName'];
    $contentFile = $_POST['contentFile'];
    $myfile = fopen('./temp/Aula_' . $fileName . '.json', "w") or die("Unable to open file!");
    fwrite($myfile, $contentFile);
    fclose($myfile);
    echo 'Archivo creado correctamente';
}else{
    header("HTTP/1.1 401 Unauthorized");
}

?>