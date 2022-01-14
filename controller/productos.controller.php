<?php

require_once("../config/conexion.php");
require_once("../models/productos.model.php");

$productos = new Producto();

switch($_GET["op"]){
    
    case "listar":
        $datos=$productos->get_producto();
        $data=Array();
        foreach($datos as $row){
            $sub_array = array();
            $sub_array[] = $row["prod_nombre"];
            $sub_array[] = '<button type="button" onclick="editar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn tbn-outline-primary btn-icon"><div><i class="fa fa-edit"></i></div></button>';
            $sub_array[] = '<button type="button" onclick="eliminar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn tbn-outline-danger btn-icon"><div><i class="fa fa-trash"></i></div></button>';
            $data[]=$sub_array;
        }

        $results = array(
            "sEcho"=>1,
            "iTotalRecords"=>count($data),
            "iTotalisplayRecords"=>count($data),
            "aaData"=>$data);
        echo json_encode($results);
        
        break;
}
