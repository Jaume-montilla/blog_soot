<?php
{
      header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, DELETE, PUT');
function usrPermission()
{    
		include 'controllers/post.php';
		include 'controllers/delete.php';
		include 'controllers/put.php';
    $metodo = $_SERVER['REQUEST_METHOD'];
    $datos = file_get_contents('php://input');
    $datosClean = json_decode($datos);

    if ($metodo == "PUT") {
        $articlesInfo = connectPut($datosClean);
        echo $articlesInfo;
    }
    if ($metodo == 'DELETE') {
			$what = $datosClean -> what;
			$id = $datosClean -> id;
			$cookie = $datosClean->cookie;
			connectDel($what, $id, $cookie);
    }
    if ($metodo == 'POST') {
        connectPost($datosClean);
    }
}            
      usrPermission();
}
?>
