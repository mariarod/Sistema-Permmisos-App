
import { Component, OnInit } from '@angular/core';
import { DataservicesService } from 'src/app/Servises/dataservices.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
//import $.JQuery from 'jquery';
@Component({
  selector: 'app-permmisions-list',
  templateUrl: './permmisions-list.component.html',
  styleUrls: ['./permmisions-list.component.css']
})
export class PermmisionsListComponent implements OnInit {

  PermmisionList:any = [];
  PermisionbTypeList :any = [];
  PermmisionTypeId : number;
  //DeletePermmsions:any = [];
  //Id:number = this.activeRoute.snapshot.params.id
  dataTable : any;
  dtOptions: DataTables.Settings = {};
  constructor(private services:DataservicesService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    //Listado de permisos
    this.services.GetAllPermmisionServices().subscribe((reponse:any)=>{
      this.PermmisionList = reponse.data;    
       
      });

    const table: any = $('table');
      this.dataTable = table.DataTable();
   
  }


  GetDeletePermision(id){
    Swal.fire({
      title: 'Eliminar',
      text: "Esta seguro que desea eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result)=> {
       if(result.value){
    this.services.DeletePermmisionServices(id).subscribe((reponse:any)=>{
        reponse.data;
      Swal.fire({ title: 'Sucesss',
      text:reponse.message,
      confirmButtonText: 'Ok',      
      showLoaderOnConfirm: true,
       icon:'success'
     });
     this.ngOnInit();
    })
       }
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text:error.error.mensaje,
        confirmButtonText: 'Ok',      
        showLoaderOnConfirm: true,
        icon:'error'
      });  


    })
    
  
  }

  

}
