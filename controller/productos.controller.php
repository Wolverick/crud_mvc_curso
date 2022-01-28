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
            $sub_array[] = '<button type="button" onclick="editar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn btn-outline-primary btn-icon"><div><i class="fa fa-edit"></i></div></button>';
            $sub_array[] = '<button type="button" onclick="eliminar('.$row["prod_id"].');" id="'.$row["prod_id"].'" class="btn btn-outline-danger btn-icon"><div><i class="fa fa-trash"></i></div></button>';
            $data[]=$sub_array;
        }

        $results = array(
            "sEcho"=>1,
            "iTotalRecords"=>count($data),
            "iTotalisplayRecords"=>count($data),
            "aaData"=>$data);
        echo json_encode($results);
        
        break;
        
    case "guardaryeditar":
        $datos=$productos->get_producto_x_id($_POST["prod_id"]);
        if(empty($_POST["prod_id"])){

            if(is_array($datos)==true and count($datos)==0){
                $productos->insert_producto($_POST["prod_nombre"]);
            }

        }else{

            $productos->update_producto($_POST["prod_id"],$_POST["prod_nombre"]);

        }
        break;
    case "mostrar":
        $datos=$productos->get_producto_x_id($_POST["prod_id"]);
        if(is_array($datos)==true and count($datos)>0){
            foreach($datos as $row)
            {
                $output["prod_id"] = $row["prod_id"];
                $output["prod_nombre"] = $row["prod_nombre"];
            }
        }
        break;

    case "eliminar":
        $productos->delete_producto($_POST["prod_id"]);
       
        break;
        
}
