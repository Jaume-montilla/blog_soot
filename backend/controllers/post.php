<?php
function connectPost($data)
{
    $pdo = new PDO("mysql:host=localhost;dbname=blog", 'jaume', 'jaume123');
    $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

    function admin($pdo, $cookieUser)
    {
        $puedes = false;
        $consulta = $pdo->prepare("SELECT ROL FROM USRS WHERE id = (SELECT UsrID FROM COOKIES WHERE Cookie = :cookieUser)");
        $consulta->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $consulta->execute();

        foreach ($consulta as $row) {
            if ($row && $row['ROL'] == "ADMIN") {
                $puedes = true;
            }
        }
    
        if ($puedes) {
            $articulos = [];
            $consulta = $pdo->query("SELECT ID, Title, InfoTxt, Rating, createdBy, IMG FROM ARTICLES;");
            foreach ($consulta as $row) {
                $articulos[] = [
                    'Title' => $row['Title'],
                    'InfoTxt' => $row['InfoTxt'],
                    'Rating' => $row['Rating'],
                    'createdBy' => $row['createdBy'],
                    'IMG' => $row['IMG'],
                    'ID' => $row['ID']
                ];
            }
    
            $usrs = [];
            $consulta = $pdo->query("SELECT ID, Name, Surname, eMail, ROL FROM USRS;");
            foreach ($consulta as $row) {
                $usrs[] = [
                    'ID' => $row['ID'],
                    'Name' => $row['Name'],
                    'Surname' => $row['Surname'],
                    'eMail' => $row['eMail'],
                    'ROL' => $row['ROL']
                ];
            }
    
            $response = [
                'articulos' => $articulos,
                'usrs' => $usrs
            ];
            return json_encode($response);
        }
    
        return json_encode(["error" => "Acceso denegado. Solo los administradores pueden realizar esta acción."]);
    }
    
    function comments($pdo, $articleId)
    {
        if ($articleId != 0) {
            $consulta = $pdo->prepare(
                "SELECT ID, UsrID, CreateDate, InfoTxt, IDRelated FROM COMMENTS 
                                   JOIN COMMENTSARTICLES ON COMMENTS.ID = COMMENTSARTICLES.IDComment 
                                   WHERE COMMENTSARTICLES.IDArticle = :articleId"
            );
            $consulta->bindParam(':articleId', $articleId, PDO::PARAM_INT);
            $consulta->execute();
            $comments = [];
            foreach ($consulta as $row) {
                $comments[] = [
                    'UserID' => $row['UsrID'],
                    'InfoTxt' => $row['InfoTxt'],
                    'ID' => $row['ID'],
                    'IDRelated' => $row['IDRelated'],
                    'Date' => $row['CreateDate']
                ];
            }
            return json_encode(["comentarios" => $comments]);
        } else {
            $comments = [];
            $consulta = $pdo->query("SELECT UsrID, InfoTxt, ID, IDRelated FROM COMMENTS ORDER BY CreateDate DESC;");
            foreach ($consulta as $row) {
                $comments[] = [
                    'UserID' => $row['UsrID'],
                    'InfoTxt' => $row['InfoTxt'],
                    'ID' => $row['ID'],
                    'IDRelated' => $row['IDRelated']
                ];
            }
            $response = [
                'comentarios' => $comments
            ];
            return json_encode($response);
        }
    }
    
    function articles($pdo, $id)
    {
        if ($id != 0) {
            $consulta = $pdo->prepare("SELECT ID, Title, InfoTxt, Rating, CreatedBy, DateCreated,  IMG FROM ARTICLES WHERE ID = :id");
            $consulta->bindParam(':id', $id, PDO::PARAM_INT);
            $consulta->execute();
            $articulos = [];
            foreach ($consulta as $row) {
                $articulos[] = [
                    'Title' => $row['Title'],
                    'InfoTxt' => $row['InfoTxt'],
                    'Rating' => $row['Rating'],
                    'createdBy' => $row['CreatedBy'],
                    'IMG' => $row['IMG'],
                'ID' => $row['ID'],
                'DateCreated' => $row["DateCreated"],
                ];
            }
            $response = [
                'articulos' => $articulos
            ];
            return json_encode($response);
        } else {
            $articulos = [];
            $consulta = $pdo->query("SELECT ID, Title, InfoTxt, Rating, createdBy, IMG FROM ARTICLES;");
            foreach ($consulta as $row) {
                $articulos[] = [
                    'Title' => $row['Title'],
                    'InfoTxt' => $row['InfoTxt'],
                    'Rating' => $row['Rating'],
                    'createdBy' => $row['createdBy'],
                    'IMG' => $row['IMG'],
                    'ID' => $row['ID']
                ];
            }
            $response = [
                'articulos' => $articulos
            ];
            return json_encode($response);
        }
    }
    
    function articlesRelated($pdo, $cookie)
    {
        $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error" => $userId ]);
            return;
        }
        $consulta = $pdo->prepare(
            "SELECT a.ID, a.Title, a.InfoTxt, a.IMG, a.DateCreated, a.Rating, a.CreatedBy 
                               FROM ARTICLES a INNER JOIN FAVORITE f ON a.ID = f.ArticleID WHERE f.UsrID = :userId"
        );
        $consulta->bindParam(':userId', $userId, PDO::PARAM_INT);
        $consulta->execute();
        $articulos = [];
        foreach ($consulta as $row) {
            $articulos[] = [
                'Title' => $row['Title'],
                'InfoTxt' => $row['InfoTxt'],
                'Rating' => $row['Rating'],
                'createdBy' => $row['CreatedBy'],
                'IMG' => $row['IMG'],
                'ID' => $row['ID'],
                'Date' => $row['DateCreated'],
            ];
        }
        $response = [
            'articulos' => $articulos
        ];
        return json_encode($response);
    }

    function isFav($pdo, $cookie, $articleId)
    {
        $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error" => $userId ]);
            return;
        }
    
        $result = $pdo->query("SELECT COUNT(*) AS favCount FROM ARTICLES a INNER JOIN FAVORITE f ON a.ID = f.ArticleID WHERE f.UsrID = ".$userId." AND f.ArticleID = ".$articleId .";");
        
        foreach ($result as $row) {
            $favExists = $row['favCount'];
        }
        
        if ($favExists > 0) {
            return json_encode(["exists" => true]);
        } else {
            return json_encode(["exists" => false]);
        }
    }
    
    function commentsRelated($pdo, $cookie)
    {
        $userId = getUserIdFromCookie($pdo, $cookie);
        if (!$userId) {
            echo json_encode(["error" => $userId ]);
            return;
        }
        $comments = [];
        $consulta = $pdo->prepare("SELECT UsrID, InfoTxt, ID, IDRelated, CreateDate FROM COMMENTS WHERE UsrID = :userId ORDER BY CreateDate DESC");
        $consulta->bindParam(':userId', $userId, PDO::PARAM_INT);
        $consulta->execute();
        foreach ($consulta as $row) {
            $comments[] = [
                'UserID' => $row['UsrID'],
                'InfoTxt' => $row['InfoTxt'],
                'ID' => $row['ID'],
            'IDRelated' => $row['IDRelated'],
            'Date' => $row['CreateDate']
            ];
        }
        $response = [
            'comentarios' => $comments
        ];
        return json_encode($response);
    }
    
    function reviews($pdo, $limit)
    {
        if ($limit != 0) {
        $reviews = [];
        $consulta = $pdo->prepare("SELECT ID, Title, InfoText, Rating, CreateDate, IDArticle, UsrID FROM REVIEWS ORDER BY CreateDate DESC LIMIT :limit;");
        $consulta->bindParam(':limit', $limit, PDO::PARAM_INT);
        $consulta->execute();
    } else {
        $consulta = $pdo->query("SELECT ID, Title, InfoText, Rating, CreateDate, IDArticle, UsrID FROM REVIEWS ORDER BY CreateDate DESC");

    }
        foreach ($consulta as $row) {
            $reviews[] = [
                'ID' => $row['ID'],
                'Title' => $row['Title'],
                'InfoText' => $row['InfoText'],
                'Rating' => $row['Rating'],
                'CreateDate' => $row['CreateDate'],
                'IDArticle' => $row['IDArticle'],
                'UsrID' => $row['UsrID']
            ];
        }
        
        $response = [
            'reviews' => $reviews
        ];
        return json_encode($response);
    }
    
    function getUserIdFromCookie($pdo, $cookieUser)
    {
        $consulta = $pdo->prepare("SELECT UsrID FROM COOKIES WHERE Cookie = :cookieUser");
        $consulta->bindParam(':cookieUser', $cookieUser, PDO::PARAM_STR);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        if ($row && $row['UsrID']) {
            return $row['UsrID'];
        }
        return false;
    }
    
    function user($pdo, $id, $cookie)
    {
        if ($cookie != 0) {
            $userId = getUserIdFromCookie($pdo, $cookie);
            if (!$userId) {
                echo json_encode(["error" => $userId ]);
                return;
            }
            $id = $userId;
        }
    
        $consulta = $pdo->prepare("SELECT Name FROM USRS WHERE ID = :id");
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        return json_encode(["name" => $row['Name']]);
    }
       
    switch ($data->what) {
    case 'ARTICLES':
        if ($data->user) {
            $return = articlesRelated($pdo, $data->cookie);              
        } elseif($data->art) {
            $return = isFav($pdo, $data->cookie, $data->articleID);
        }
        else {    
            $return = articles($pdo, $data->id);
        }
        echo $return;
        break;
    case 'USER': 
        $return = user($pdo, $data->id, $data->cookie);
        echo $return;
        break;
    case 'ADMIN':
        $return = admin($pdo, $data->cookie);
        echo $return;
        break;
    case 'COMMENTS':
        if ($data->user) {
            $return = commentsRelated($pdo, $data->cookie);
        } else {
            $return = comments($pdo, $data->id);
        }
        echo $return;
        break;

    case 'REVIEWS':
            $return = reviews($pdo, $data->limit);
        echo $return;
        break;
    default:
        echo json_encode(["error" => "Opción no disponible"]);
        break;
    }
    
}
?>
