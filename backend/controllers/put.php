<?php
function connectPut($allData)
{
    $pdo = new PDO("mysql:host=localhost;dbname=dbanem", 'user', 'pwd');
    $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
    function sanear_datos($allData)
    {
        $allData = trim($allData);
        $allData = stripslashes($allData);
        $allData = htmlspecialchars($allData);
        return $allData;
    }
    
    function haveAccess($pdo, $cookieUser)
    {
        $consulta = $pdo->prepare("SELECT ROL FROM USRS WHERE id = (SELECT UsrID FROM COOKIES WHERE Cookie LIKE :cookieUser)");
        $consulta->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        return $row && $row['ROL'] == "ADMIN";
    }
    
    function encrypt($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }
    
    function verify($password, $hash)
    {
        if (password_verify($password, $hash)) {
            return true;
        } else {
            return false;
        }
    }
    
    function getUserIdFromCookie($pdo, $cookieUser)
    {
        $consulta = $pdo->prepare("SELECT UsrID FROM COOKIES WHERE Cookie LIKE :cookieUser");
        $consulta->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['UsrID'] : false;
    }
    
    function createComment($pdo, $txt, $idArt, $cookieUser, $IDRelated)
    {
        $txt = sanear_datos($txt);
        $idArt = sanear_datos($idArt);

        $userId = getUserIdFromCookie($pdo, $cookieUser);
        if (!$userId) {
            echo json_encode(["error" => $userId]);
            return;
        }
        if($IDRelated) {
            $pdo->query("INSERT INTO COMMENTS (UsrID, InfoTxt, CreateDate, IDRelated) VALUES ('" . $userId . "', '" . $txt . "', NOW(), ".$IDRelated .");");
        }else{
            
            $pdo->query("INSERT INTO COMMENTS (UsrID, InfoTxt, CreateDate) VALUES ('" . $userId . "', '" . $txt . "', NOW());");
        }

        $result = $pdo->query("SELECT ID FROM COMMENTS WHERE UsrID = " . $userId . " AND InfoTxt LIKE '" . $txt . "' ORDER BY CreateDate;");
        $commentId = 0;
        foreach ($result as $row) {
            $commentId = $row['ID'];
        }
        $pdo->query(
            "INSERT INTO COMMENTSARTICLES (IDComment, IDArticle) VALUES ('" . $commentId . "', '" . $idArt . "');"
        );
        echo json_encode(["success" => true, "message" => "Comentario insertado correctamente y asociado al artÃ­culo"]);
    }
    
    function editArticle($pdo, $id, $newTxt, $field, $cookieUser)
    {
        if (!haveAccess($pdo, $cookieUser)) {
            echo json_encode(["error" => "Acceso denegado. Solo los administradores pueden realizar esta acción."]);
            return;
        }
    
        $id = sanear_datos($id);
        $newTxt = sanear_datos($newTxt);
        $field = sanear_datos($field);
    
        $consulta = $pdo->prepare("UPDATE ARTICLES SET $field = :newTxt WHERE ID = :id");
        $consulta->bindParam(':newTxt', $newTxt, PDO::PARAM_STR);
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
    
        echo json_encode(['success' => true, 'message' => 'artículo editado']);
    }
    
    function createArticle($pdo, $title, $infoTxt, $img, $cookieUser)
    {
        if (!haveAccess($pdo, $cookieUser)) {
            echo json_encode(["error" => "Acceso denegado. Solo los administradores pueden realizar esta acción."]);
            return;
        }
    
        $userId = getUserIdFromCookie($pdo, $cookieUser);
        if (!$userId) {
            echo json_encode(["error" => $userId ]);
            return;
        }
    
        $title = sanear_datos($title);
        $infoTxt = sanear_datos($infoTxt);
        $img = sanear_datos($img);
    
        $consulta = $pdo->prepare("INSERT INTO ARTICLES (Title, CommentID, InfoTxt, IMG, CreatedBy) VALUES (:title, NULL, :infoTxt, :img, :userId)");
        $consulta->bindParam(':title', $title, PDO::PARAM_STR);
        $consulta->bindParam(':infoTxt', $infoTxt, PDO::PARAM_STR);
        $consulta->bindParam(':img', $img, PDO::PARAM_STR);
        $consulta->bindParam(':userId', $userId, PDO::PARAM_INT);
        $consulta->execute();
    
        echo json_encode(['success' => true, 'message' => 'artículo creado']);
    }
    
    function editUsr($pdo, $id, $rol)
    {
        $id = sanear_datos($id);
        $rol = sanear_datos($rol);
    
        $consulta = $pdo->prepare("UPDATE USRS SET ROL = :rol WHERE ID = :id");
        $consulta->bindParam(':rol', $rol, PDO::PARAM_STR);
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
    
        echo json_encode(['success' => true, 'message' => 'usuario editado']);
    }
    
    function createUsr($pdo, $name, $surname, $mail, $pwd, $rol, $edad)
    {
        $name = sanear_datos($name);
        $surname = sanear_datos($surname);
        $mail = sanear_datos($mail);
        $pwd = encrypt($pwd);
        $rol = sanear_datos($rol);
        $edad = sanear_datos($edad);
    
        $consulta = $pdo->prepare("INSERT INTO USRS (Name, Surname, eMail, Passwd, ROL, Edad) VALUES (:name, :surname, :mail, :pwd, :rol, :edad)");
        $consulta->bindParam(':name', $name, PDO::PARAM_STR);
        $consulta->bindParam(':surname', $surname, PDO::PARAM_STR);
        $consulta->bindParam(':mail', $mail, PDO::PARAM_STR);
        $consulta->bindParam(':pwd', $pwd, PDO::PARAM_STR);
        $consulta->bindParam(':rol', $rol, PDO::PARAM_STR);
        $consulta->bindParam(':edad', $edad, PDO::PARAM_INT);
        $consulta->execute();
    
        echo json_encode(['success' => true, 'message' => 'usuario creado']);
    }
    
    function createAndCheck($pdo, $name, $surname, $mail, $pwd, $rol, $edad)
    {
        $consulta = $pdo->prepare("SELECT COUNT(*) FROM USRS WHERE eMail LIKE :mail");
        $consulta->bindParam(':mail', $mail, PDO::PARAM_STR);
        $consulta->execute();
        foreach ($consulta as $row) {
            $emailExists = $row['COUNT(*)'];
        }
        if ($emailExists > 0) {
            echo json_encode(["error" => "El correo electrónico ya está registrado."]);
            return false;
        }
    
        return createUsr($pdo, $name, $surname, $mail, $pwd, $rol, $edad);
    }
    
    function chekUser($pdo, $nombre, $password)
    {
        $consulta = $pdo->prepare("SELECT ID, eMail, Passwd, ROL FROM USRS WHERE eMail = :nombre");
        $consulta->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $consulta->execute();
        $exist = -1;
        $cookie = null;
        foreach($consulta as $row){
            if ($row && verify($password, $row['Passwd']) && $nombre == $row['eMail']) {
                $exist = $row['ID'];
            }
        }
        if ($exist != -1) {
            $cookie = createCookie($pdo, $exist);
        }
    
        if ($cookie) {
            echo json_encode(['exist' => true, 'cookie' => $cookie]);
        } else {
            echo json_encode(['exist' => false, 'message' => 'Credenciales incorrectas o usuario no encontrado.']);
        }
    }
    
    function createCookie($pdo, $id)
    {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $cadenaAleatoria = '';
    
        $consulta = $pdo->prepare("SELECT Cookie FROM COOKIES WHERE UsrID = :id");
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        if ($row && $row['Cookie']) {
            return $row['Cookie'];
        }
    
        for ($i = 0; $i < 49; $i++) {
            $cadenaAleatoria .= $caracteres[random_int(0, strlen($caracteres) - 1)];
        }
    
        $consulta = $pdo->prepare("INSERT INTO COOKIES (UsrID, Cookie) VALUES (:id, :cookie)");
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->bindParam(':cookie', $cadenaAleatoria, PDO::PARAM_STR);
        $consulta->execute();
    
        return $cadenaAleatoria;
    }
    
    function addfav($pdo, $artid, $cookie)
    {
        $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error" => $userId ]);
            return;
        }
    
        $consulta = $pdo->prepare("INSERT INTO FAVORITE (UsrID, ArticleID) VALUES (:userId, :artid)");
        $consulta->bindParam(':userId', $userId, PDO::PARAM_INT);
        $consulta->bindParam(':artid', $artid, PDO::PARAM_INT);
        $consulta->execute();
    
        echo json_encode(['success' => true, 'message' => 'articulo añadido a favoritos']);
    }

    function updateRating($pdo, $cookie, $id, $rating)
    {
            $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error user not found" => $userId ]);
            return;
        }
        $comments = [];
        $consulta = $pdo->prepare("SELECT Rating, RatedCount FROM ARTICLES WHERE ID = :articleId");
        $consulta->bindParam(':articleId', $id, PDO::PARAM_INT);
        $consulta->execute();
        foreach ($consulta as $row) {
            $ratingDB =  $row['Rating'];
                $count = $row['RatedCount'];
        }
                    
        $newRating = (($ratingDB*$count)+$rating)/($count+1);
        $count = $count+1;
        $update = $pdo->prepare("UPDATE ARTICLES SET Rating = :rating, RatedCount = :count WHERE ID = :id");
        $update->bindParam(':rating', $newRating, PDO::PARAM_INT);
        $update->bindParam(':count', $count, PDO::PARAM_INT);
        $update->bindParam(':id', $id, PDO::PARAM_INT);
        $update->execute();
                
        echo json_encode(['success' => true, 'message' => 'articulo añadido a favoritos']);
        $response = [
            'comentarios' => $comments
        ];
        return json_encode($response);
    }
    function createReview($pdo, $title, $infoText, $rating, $cookie, $idArticle)
    {

         $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error user not found" => $userId ]);
            return;
        }


        $title = sanear_datos($title);
        $infoText = sanear_datos($infoText);
        $rating = sanear_datos($rating);
        $idArticle = sanear_datos($idArticle);
        
        $consulta = $pdo->prepare(
            "INSERT INTO REVIEWS (Title, InfoText, Rating, UsrID, IDArticle, CreateDate) 
                                   VALUES (:title, :infoText, :rating, :usrID, :idArticle, NOW())"
        );
        
        $consulta->bindParam(':title', $title, PDO::PARAM_STR);
        $consulta->bindParam(':infoText', $infoText, PDO::PARAM_STR);
        $consulta->bindParam(':rating', $rating, PDO::PARAM_INT); 
        $consulta->bindParam(':usrID', $userId, PDO::PARAM_INT);
        $consulta->bindParam(':idArticle', $idArticle, PDO::PARAM_INT);
        $consulta->execute();
        return json_encode(['success' => true, 'message' => 'Reseña creada']);
    }

    switch ($allData->what) {
    case 'ARTICLES':
        if ($allData->do == "CREATE") {
            $return = createArticle($pdo, $allData->title, $allData->info, $allData->img, $allData->cookie);
        } elseif ($allData->do == "EDIT") {
            $return = editArticle($pdo, $allData->id, $allData->newInfo, $allData->field, $allData->cookie);
        } else {
            $return = 'error, operación no válida para artículo';
        }
        echo $return;
        break;
    case 'COMMENTS':
        if ($allData->do == "CREATE") {
            $return = createComment($pdo, $allData->txt, $allData->id, $allData->cookie, $allData->related);
        } 
        else {
            $return = 'error, ooperacion no valida para comment';
        }
            echo $return;
        break;
    case 'USRS':
        if ($allData->do == "CREATE") {
            $return = createAndCheck($pdo, $allData->name, $allData->surname, $allData->mail, $allData->pwd, $allData->rol, $allData->age);
        } elseif ($allData->do == "EDIT") {
            $return = editUsr($pdo, $allData->id, $allData->newInfo, $allData->cookie);
        } elseif ($allData->do == 'CHECK') {
            $return = chekUser($pdo, $allData->usr, $allData->pwd);
        } else {
            echo "opción errónea";
        }
        echo $return;
        break;
    case 'REVIEW':
        if ($allData->do == "CREATE") {
            $return = createReview($pdo, $allData->title, $allData->info, $allData->rating, $allData->cookie, $allData->idArticle);           
        }
           echo $return;
        break;
    case 'CHECKADMIN':
        $return = haveAccess($pdo, $allData->cookie);
        echo json_encode(["userIde" => $return]);
        break;
    case 'ADDFAV':
        $return = addfav($pdo, $allData->artId, $allData->cookie);
        break;
    case 'RATING':
        $return = updateRating($pdo, $allData->cookie, $allData->id, $allData->rating);
        echo $return;
        break;
    default:
        echo 'opción no disponible';
        break;

    }

}
?>
