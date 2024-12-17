<?php
function connectDel($what, $id, $cookie)
{
    // Conexión PDO
    $host = $_ENV["MYSQL_HOST"];
    $user = $_ENV["MYSQL_USER"];
    $pwd = $_ENV["MYSQL_PASSWORD"];
    $db = $_ENV["MYSQL_DB"];
    $port = $_ENV["MYSQL_PORT"];
    $pdo = new PDO("mysql:host=".$host.";port=".$port." dbname=".$db, $user, $pwd);
    $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
    
    // Función para verificar acceso del usuario
    function haveAccess($pdo, $cookieUser)
    {
        $stmt = $pdo->prepare("SELECT ROL FROM USRS WHERE id = (SELECT UsrID FROM COOKIES WHERE Cookie = :cookieUser)");
        $stmt->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row && $row['ROL'] == "ADMIN";
    }

    // Función para obtener el ID de usuario desde el cookie
    function getUserIdFromCookie($pdo, $cookieUser)
    {
        $stmt = $pdo->prepare("SELECT UsrID FROM COOKIES WHERE Cookie = :cookieUser");
        $stmt->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row['UsrID'] : false;
    }

    // Función para eliminar comentarios
    function delComments($pdo, $id, $cookieUser)
    {
        if (!haveAccess($pdo, $cookieUser)) {
            echo json_encode(['success' => false, 'message' => 'Acceso denegado. Solo los administradores pueden eliminar comentarios.']);
            return;
        }

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM COMMENTS WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            echo json_encode(['success' => false, 'message' => 'Comentario no encontrado.']);
            return;
        }

        $stmt = $pdo->prepare("DELETE FROM COMMENTS WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Comentario eliminado']);
    }

    // Función para eliminar artículos
    function delArticles($pdo, $id, $cookieUser)
    {
        if (!haveAccess($pdo, $cookieUser)) {
            echo json_encode(['success' => false, 'message' => 'Acceso denegado. Solo los administradores pueden eliminar artículos.']);
            return;
        }

        // Verificar existencia del artículo
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM ARTICLES WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            echo json_encode(['success' => false, 'message' => 'Artículo no encontrado.']);
            return;
        }

        // Eliminar comentarios asociados al artículo
        $stmt = $pdo->prepare("DELETE FROM COMMENTS WHERE ID IN(SELECT IDComment FROM COMMENTSARTICLES WHERE IDArticle = :id)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Eliminar artículos de la tabla FAVORITE
        $stmt = $pdo->prepare("DELETE FROM FAVORITE WHERE ArticleID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Eliminar el artículo
        $stmt = $pdo->prepare("DELETE FROM ARTICLES WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Artículo eliminado']);
    }

    // Función para eliminar usuarios
    function delUsers($pdo, $id, $cookieUser)
    {
        if (!haveAccess($pdo, $cookieUser)) {
            echo json_encode(['success' => false, 'message' => 'Acceso denegado. Solo los administradores pueden eliminar usuarios.']);
            return;
        }

        // Verificar existencia del usuario
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM USRS WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
            return;
        }

        // Eliminar usuario
        $stmt = $pdo->prepare("DELETE FROM USRS WHERE ID = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado']);
    }

    // Función para remover de favoritos
    function removeFav($pdo, $artid, $cookie)
    {
        $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(['success' => false, 'message' => 'No se encontró el usuario para este cookie.']);
            return;
        }

        // Eliminar artículo de favoritos
        $stmt = $pdo->prepare("DELETE FROM FAVORITE WHERE UsrID = :userID AND ArticleID = :artID");
        $stmt->bindParam(':userID', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':artID', $artid, PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Artículo eliminado de favoritos']);
    }

    // Determinar acción según el tipo
    switch ($what) {
    case 'COMMENTS':
        delComments($pdo, $id, $cookie);
        break;
    case 'ARTICLES':
        delArticles($pdo, $id, $cookie);
        break;
    case 'USERS':
        delUsers($pdo, $id, $cookie);
        break;
    case 'REMOVEFAV':
        removeFav($pdo, $id, $cookie);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Opción no disponible']);
        break;
    }
}
?>
