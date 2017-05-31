
$(document).ready(function(){
    var arrayServicios = [];
    var arrayCategorias = [];
    var arrayListView = [];
    var elementoLista;
    var servicio;
    var imagen;


    // Implementación de Funciones

        //Verificar si exite memoria
        init();

        //Seleccionar la Imagen
        $('.ser_Image').click(function(event){
            console.log($(this).attr('src'));
            imagen = ($(this).attr('src'));
        });

        // Guardar Nuevo Servicio
        $('#btn_AgregarServicio').click(function(event){
            event.preventDefault();
            crearServicio();
            limpiarInputsCrear();
            window.location.href ="#home";
            impirimirServicios();
            location.reload();
        });
        // Abrir datos de un servicio
         $(".verServicio").live("click", function() {
              var id = "";
              var urlId = link = $(this).attr('href');
              var id = urlId.substr(urlId.indexOf("="), urlId.length-1);
                  id=id.replace("=",'');
            abrirServicio(id);
        });
        // Abrir edición de un servicio
        $(".editarServicio").live("click", function() {
              var id = "";
              var urlId = link = $(this).attr('href');
              var id = urlId.substr(urlId.indexOf("="), urlId.length-1);
                  id=id.replace("=",'');
            abrirEdicionServicio(id);
        });
        // Editar Servicio
        $('#btn_EditarServicio').live("click", function() {
            editarServicio(imagen);
            impirimirServicios();
            updateLocalStorage();
            window.location.href ="#home"
            location.reload();
           
        });

        //Eliminar Servicio
         $('#btn_EliminarServicio').click(function() {
            eliminarServicio();
            updateLocalStorage();
            
        });



    // Funciones


    function updateLocalStorage(){
        localStorage.setItem('servicios',JSON.stringify(arrayServicios));
        localStorage.setItem('categorias',JSON.stringify(arrayCategorias));
       
    }


    function init(){
        //  localStorage.removeItem('servicios');
        //localStorage.clear();
        // console.log(localStorage.servicios);
        if(localStorage.getItem('servicios')!= undefined && localStorage.getItem('categorias')!=undefined){
            // console.log(localStorage.servicios);
            arrayServicios = JSON.parse(localStorage.servicios);
            arrayCategorias = JSON.parse(localStorage.categorias);
            impirimirServicios();
        }
        else{

            $("#cont_Inicio").replaceWith(
                "<h2>No hay Servicios Agregados </h2>"
            );
        }
    }


     function crearServicio(){
         if(imagen === null){
             imagen = "images/servicios/hospital.png";
         }
         servicio = new Object();
             servicio.id = $('#txt_ID').val();
             servicio.nombre = $('#txt_Nombre').val();
             servicio.imagen = imagen;
             servicio.descripcion = $('#txt_Descripcion').val();
             servicio.correo = $('#txt_Mail').val();
             servicio.domicilio = $('#txt_Domicilio').val();
             servicio.categoria = $('#txt_Categoria').val();
             servicio.nota = $('#txt_Nota').val();

             arrayServicios.push(servicio);
             arrayCategorias.push(servicio.categoria);
            
           
            arrayCategorias = arrayCategorias.filter(function(value, index, array){
                return array.indexOf(value) == index;
            });
            
            impirimirServicios();
            updateLocalStorage();

            
    }


    function impirimirServicios(){
        // $('#listaServicios').empty();
        console.log("Imprimiendo" + arrayServicios);
        if(arrayServicios.length <=0 || arrayServicios === null){
             $("#cont_Inicio").replaceWith(
                "<h2>No hay Servicios Agregados </h2>"
            );
            arrayCategorias.splice(0);
            return;
        }
        var contenido = '';
         
        var ul=$("#mainColl");
        ul.empty();
        for(var i = 0; i<arrayCategorias.length; i++){
            var collapsible= $('<div data-role="collapsible">');
            collapsible.append('<h2>'+ arrayCategorias[i]+ '</h2>');
                
            var list = $('<ul data-role="listview" data-divider-theme="b" data-filter="true" data-filter-placeholder="Buscar Servicios..."   data-split-theme="a" data-inset="true" >');
            list.append('<li data-role="list-divider">Servicios</li>');
                    
            for(var j =0;j <arrayServicios.length; j++){
                if(arrayServicios[j].categoria === arrayCategorias[i] ){
                     list.append('<li >'+
                                        '<a href=\"#pag_InfoServicio?id='+arrayServicios[j].id+'\" class="verServicio">' + arrayServicios[j].nombre +
                                        '<a href="#pag_EditarServicio?id='+arrayServicios[j].id+'" class="editarServicio">Editar</a> </a>'+
                                        
                                '</li>');
                }
               
                
            }
            collapsible.append(list);
            ul.append(collapsible);
            ul.trigger('create');
        }
    }

   function abrirServicio(id){
    //    console.log(id);
    var contenedor = $('#contenedor_Servicio');
    var servicioBuscado = arrayServicios.filter(function (value) {
                                            return value.id == id
                                        });
    contenedor.empty();
    console.log(servicioBuscado[0].imagen);
    
    contenedor.append('<center><div class="imageContainer">'+
                    //  '<img src="'+servicioBuscado[0].imagen+'" alt="" class="ser_Image">'+
                      '</div>'+
                      '<p><b> ID : </b>'+ servicioBuscado[0].id + '</p>'+
                      '<p><b> Nombre : </b> '+ servicioBuscado[0].nombre + '</p>'+
                      '<p><b> Correo : </b> '+ servicioBuscado[0].correo + '</p>'+
                      '<p><b> Domicilio : </b> '+ servicioBuscado[0].domicilio + '</p>'+
                      '<p><b> Categoría : </b> '+ servicioBuscado[0].categoria + '</p>'+
                      '<p><b> Descripción : </b> '+ servicioBuscado[0].descripcion + '</p>'+
                      '<p><b> Nota : </b> '+ servicioBuscado[0].nota + '</p>'
    );
   }


   function abrirEdicionServicio(id){
       var contenedor = $("#cont_EditarServicio");
       var servicioBuscado = arrayServicios.filter(function (value) {
                                            return value.id == id
                                        });
        console.log(servicioBuscado);
      $('#txt_EditarID').val(servicioBuscado[0].id);
      $('#txt_EditarNombre').val(servicioBuscado[0].nombre);
      
      imagen = servicioBuscado[0].imagen;
      console.log(servicioBuscado[0].imagen);
      $('#txt_EditarMail').val(servicioBuscado[0].correo);
      $('#txt_EditarDescripcion').val(servicioBuscado[0].descripcion);
      $('#txt_EditarDomicilio').val(servicioBuscado[0].domicilio);
      $('#txt_EditarCategoria').val(servicioBuscado[0].categoria);
      $('#txt_EditarNota').val(servicioBuscado[0].nota);

    
      
       
    
   }

   function editarServicio(imagen){
        console.log("imagen" + imagen);
       var id = $('#txt_EditarID').val();
    //    console.log(id);
    for(i = 0; i<arrayServicios.length; i++ ){
        if(arrayServicios[i].id===id){
        
             arrayServicios[i].nombre = $('#txt_EditarNombre').val();
             arrayServicios[i].imagen = imagen
             arrayServicios[i].descripcion = $('#txt_EditarDescripcion').val();
             arrayServicios[i].correo = $('#txt_EditarMail').val();
             arrayServicios[i].domicilio = $('#txt_EditarDomicilio').val();
             arrayServicios[i].categoria = $('#txt_EditarCategoria').val();
             arrayServicios[i].nota = $('#txt_EditarNota').val();             
             return;
        }
    }

     console.log(arrayServicios);
            impirimirServicios();
            updateLocalStorage();
            window.location.href="#home";

           
   }


   function eliminarServicio(){

       if(arrayServicios.length === 1){
           arrayServicios.splice(0);
           arrayCategorias.splice(0);
           localStorage.clear();
       }else{
            var id = $('#txt_EditarID').val();
            for(i = 0; i<arrayServicios.length; i++ ){
                if(arrayServicios[i].id===id){
                    arrayServicios.splice(i,i);
                    console.log(arrayServicios.splice(i,i));
                }
            }
           
       }

            console.log(arrayServicios);
            impirimirServicios();
            updateLocalStorage();
            window.location.href="#home";
      
       
   }


   function limpiarInputsCrear(){
       $('#txt_EditarID').val('');
      $('#txt_EditarNombre').val('');
      imagen = '';
      $('#txt_EditarMail').val('');
      $('#txt_EditarDescripcion').val('');
      $('#txt_EditarDomicilio').val('');
      $('#txt_EditarCategoria').val('');
      $('#txt_EditarNota').val('');
   }
});



