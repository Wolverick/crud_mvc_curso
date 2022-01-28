var tabla;

function init(){
    //Llamamos al formulario
    $('#producto_form').on("submit",function(e){
        guardaryeditar(e);
    });

}

$(document).ready(function(){
    tabla=$('#producto_data').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons:[
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdf'
                ],

        "ajax":{
            url: '../../controller/productos.controller.php?op=listar',
            type: "get",
            dataType: "json",
            error: function(e){
                console.log(e.responseText);
            }
        },

        "bDestroy": true,
        "responsive": true,
        "bInfo": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningun dato disponible en esta tabla",
            "sInfo": "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadigRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria":{
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    }).DataTable();
});

function guardaryeditar(e){
    //Prevenimos que se de click dos veces al boton de guardar
    e.preventDefault();
    //Variable form_data
    var formData = new FormData($("#producto_form")[0]);

    $.ajax({
        //Ruta de controlador con la opcion
        url: "../../controller/productos.controller.php?op=guardaryeditar",
        //Tipo de accion
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            console.log(datos);
            $('#producto_form')[0].reset();
            $("#modalmnt").modal('hide');
            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Registro!',
                'Registro creado correctamente.',
                'success'
            )
        }
    });
}

function editar(prod_id){
    console.log(prod_id);
}

function eliminar(prod_id){

    swal.fire({
        title: "CRUD",
        text: "Desea eliminar el registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminalo",
        cancelButtonText: "No, Cancelalo",
        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){

            $.post("../../controller/productos.controller.php?op=eliminar",{prod_id:prod_id},function (data){
                $('#producto_data').DataTable().ajax.reload();
            });

            
            

            swal.fire(
                'Eliminado!',
                'El registro se elimino correctamente.',
                'success'
            )
        }
    })

}

$(document).on("click","#btnnuevo", function(){
    $('#mdltitulo').html('Nuevo Registro');
    $('#modalmnt').modal('show');
});

init();
