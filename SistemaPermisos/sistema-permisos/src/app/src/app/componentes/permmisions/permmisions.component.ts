import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataservicesService } from '../../../../Servises/dataservices.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-permmisions',
  templateUrl: './permmisions.component.html',
  styleUrls: ['./permmisions.component.css']
})
export class PermmisionsComponent implements OnInit {
 createPermmision:any = [];
 frmCreate:FormGroup;
  submitted = false;
  PermmisionTypeList: any = [];
  permmisionId:string;
  permmisionRoute :string;
  EditPermmision:any=[];
  isAdd:boolean = false;
  update:any;
 
  constructor(private dataservises: DataservicesService,
              private fb:FormBuilder,
              private router:Router,
              private route: ActivatedRoute
            
            ) 
              { }

  ngOnInit(): void {
  
    this.frmCreate = this.fb.group({
      id: [''],
      EmployeeName: ['',Validators.required],
      EmployeeLastName: ['', Validators.required],
      PermmisionTypeId: [Validators.required],
      PermmisionDate:['', Validators.required]
    });

    //CARGAR EL LISTADO DE LOS TIPOS DE PERMISOS
   this.GetPermmisionType();
   this.permmisionRoute = this.route.snapshot.params.id;
 
   if(this.permmisionRoute){
    
    this.isAdd = true;
    console.log(this.isAdd);
    this.dataservises.GetPermmisionsbyIdServices(parseInt(this.permmisionRoute))
    .subscribe((data:any)=> {
      this.EditPermmision  = data.data;
      
    });

   }else{
     this.isAdd = false;
   
   }

  }

//GUARDAR LOS PERMISOS 
 SavePermmision(){
delete this.frmCreate.value.id;
  this.submitted = true;
  if(this.frmCreate.invalid)
  {return;}
 
   this.dataservises.createServices(this.frmCreate.value).subscribe((reponse:any)=>{
    this.createPermmision = reponse.resp.data;
    this.permmisionId = reponse.resp.data.id;
    this.frmCreate.value.id = this.permmisionId;
      if(reponse.resp.data){
        Swal.fire({ title: 'Sucesss',
        text:reponse.message +''+ reponse.resp.data.id,
        confirmButtonText: 'Ok',      
        showLoaderOnConfirm: true,
         icon:'success'}).then((result)=>{
           if(result){
            this.permmisionId = reponse.resp.data.id
            console.log( this.permmisionId);
             this.router.navigate(['edit',this.permmisionId])
           }
         
         });
      }else{
        Swal.fire('error',
        'Error al guardar el permiso',
        'error');
      }
    }, (error)=> {   
      Swal.fire({ title: 'Error',
       text:error.error.message,
       confirmButtonText: 'Ok',      
       showLoaderOnConfirm: true,
        icon:'error'});
    });

  }

//OBTENER EL LISTADO DE LOS TIPOS DE PERMISOS
  GetPermmisionType(){
    let carga = this.dataservises.getPermmisionsTypeServices().subscribe((reponse:any)=>{
      this.PermmisionTypeList = reponse.data;
    });

  }


   ///FUNCCION PARA VALIDAR FORMULARIO DE LOS PERMISOS
   get f(){return this.frmCreate.controls}

  EditarPermmision(){
  this.dataservises.UpdateServices(this.frmCreate.value)
  .subscribe((reponse:any)=>{
    
    this.update = reponse;

    if(this.update){
        Swal.fire({ title: 'Sucesss',
        text:reponse.message,
        confirmButtonText: 'Ok',      
        showLoaderOnConfirm: true,
         icon:'success'}).then((result)=>{
           if(result){
             this.router.navigate(['/'])
           }
         
         });
      }else{
        Swal.fire('error',
        'Error al actualizar el permiso',
        'error');
      }
    }, (error)=> {   
      Swal.fire({ title: 'Error',
       text:error.error.message,
       confirmButtonText: 'Ok',      
       showLoaderOnConfirm: true,
        icon:'error'});
    });

  }


}
