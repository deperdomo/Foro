<?php
require_once("BBDD_CTRLR.php");
if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        

        case "cargar_temas":
            $sql = "SELECT t.*, count(m.men_tema_id) AS contador 
            FROM temas t 
            left JOIN mensajes m on t.tema_id = m.men_tema_id
            GROUP BY t.tema_id
            ORDER BY tema_id";
            $datos['sql']=$sql;
            $datos["datos"] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);      
            break; 

        case "MensajeTema":
            $id_tema = $_REQUEST['id_tema'];
            $sql = "SELECT m.*,u.*,u.usu_foto as foto FROM mensajes m
            left JOIN temas t on t.tema_id = m.men_tema_id
            left JOIN usuarios u on m.men_usu_id = u.usu_id
            WHERE men_tema_id = $id_tema";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);
            break;

        case "eliminar_un_mensaje":
            $id_mensaje = $_REQUEST['id_mensaje'];
            $sql = "DELETE FROM mensajes WHERE men_id = $id_mensaje";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            // Devuelvo a JS los registros modificados
            echo json_encode($datos);
            break;
    
        case "Cargar_Votos":
            $id_mensaje = $_REQUEST['id_mensaje'];
            $sql = "SELECT IFNULL(SUM(voto_positivo), 0) as votos_positivos, IFNULL(SUM(voto_negativo), 0) as votos_negativos,
            IFNULL(SUM(voto_positivo), 0) - IFNULL(SUM(voto_negativo), 0) as total
            FROM votos
                        WHERE men_id = $id_mensaje
                        GROUP BY men_id";
            $datos['sql']=$sql;
            $datos["datos"] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);      
            break; 

        case "like":
            $men_id = $_REQUEST['men_id'];
            $sql = "INSERT INTO votos (voto_id, usu_id, men_id, voto_positivo, voto_negativo) VALUES 
            (null, '12', $men_id , 1, 0)";
    
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;

        case "dislike":
            $men_id = $_REQUEST['men_id'];
            $sql = "INSERT INTO votos (voto_id, usu_id, men_id, voto_positivo, voto_negativo) VALUES 
            (null, '12', $men_id , 0, 1)";
    
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;


        case "ControlLogin":
            // Recuperar parametros
            $alias = $_REQUEST['alias'];
            $password = $_REQUEST['password'];
            // Preparo el SQL   
            $sql = "SELECT * FROM usuarios WHERE usu_alias = '$alias' AND usu_password=md5('$password')";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break; 

        case "ControlRegistro":
            $alias = $_REQUEST['alias'];
            $password = $_REQUEST['password'];
            $foto = $_REQUEST['foto'];
            $nombre = $_REQUEST['nombre'];
            $sql = "INSERT INTO usuarios (usu_admin, usu_alias, usu_foto,usu_id, usu_nombre, usu_password) VALUES
            ( 0, '$alias', '$foto', null, '$nombre', md5('$password'))";
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;


        case "NuevoMensaje":
                $mensaje = $_REQUEST['mensaje'];
                $fechaYHoraInput = $_REQUEST['fechaYHoraInput'];
                $usu_id = $_REQUEST['usu_id'];
                $tema_id = $_REQUEST['tema_id'];

                $sql = "INSERT INTO mensajes (men_fecha_hora, men_id, men_mensaje, men_tema_id, men_usu_id) VALUES
                ('$fechaYHoraInput',null,'$mensaje',$tema_id,$usu_id)";

                $datos['sql']=$sql;
                // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
                // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
                //  si no es i devuelve el nº de registros procesados
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
                // Devuelvo a JS los datos codificados como JSON
                echo json_encode($datos);  
                break;

        case "crear_un_tema":
            $nombre_mensaje = $_REQUEST['nombre_mensaje'];  
            $sql = "INSERT INTO temas VALUES(null,'$nombre_mensaje')";   
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;                

        case "eliminar_un_tema":
            $id_tema = $_REQUEST['id_tema'];  
            $sql = "DELETE FROM temas WHERE tema_id = $id_tema";   
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;                


    }             
}   
        


// 'SELECT c.cat_id,c.cat_nombre,count(f.foto_cat_id) AS contador from categorias c 
// JOIN fotos f on f.foto_cat_id = c.cat_id
// GROUP BY foto_cat_id
// ORDER by c.cat_id'


// "SELECT * from categorias ORDER by cat_id"
