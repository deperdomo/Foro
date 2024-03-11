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
            $id_mensaje = $_REQUEST['mensaje_id'];
            $sql = "SELECT m.*,u.*,u.usu_foto as foto FROM mensajes m
            JOIN temas t on t.tema_id = m.men_tema_id
            JOIN usuarios u on m.men_usu_id = u.usu_id
            WHERE men_tema_id = $id_mensaje";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);
            break;









            



        case "CargarCategorias":
            //Preparo el  sql
            $sql = "SELECT c.cat_id,c.cat_nombre,count(f.foto_cat_id) AS contador from categorias c 
            JOIN fotos f on f.foto_cat_id = c.cat_id
            GROUP BY foto_cat_id
            ORDER by c.cat_id";
            $datos["sql"]= $sql;
          //Ejecuto el SQL guardando el resultado
            $datos["datos"] = BBDD_CTRLR::Consultas($sql);
            // devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);      
            break; 

        case "FotoCategoria":
            $id_foto = $_REQUEST['foto_id'];
            $sql = "SELECT f.foto_foto FROM fotos f 
			JOIN categorias c on f.foto_cat_id = c.cat_id
            WHERE c.cat_id = $id_foto";
            $datos['sql']=$sql;
            // Ejecuto el SQL guardando el resultado
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
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
