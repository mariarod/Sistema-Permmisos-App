import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Permmision } from 'src/model/Permmision';
import { Observable } from 'rxjs';
import { PermmisionType } from 'src/model/PermmisionType';

@Injectable({
  providedIn: 'root'
})
export class DataservicesService {
apiUrl:string = 'http://localhost:63171/api/Permmissions/';
permmisionTypeUrl : string = 'http://localhost:63171/api/PermmissionType/GetAll';

  constructor(private _http: HttpClient) { }


//services create permmisions
createServices(permission:Permmision): Observable<Permmision[]>{
 let url = this.apiUrl + 'addPermmision'

 let httpheaders = new HttpHeaders();
 let options = {
   headers : httpheaders
 };

return this._http.post<Permmision[]>(url, permission, options)

}

//Services update permmisions
UpdateServices(permission:Permmision): Observable<Permmision[]>{
  let url = this.apiUrl + 'updatePermision'
 
  let httpheaders = new HttpHeaders();
  let options = {
    headers : httpheaders
  };
 
 return this._http.put<Permmision[]>(url, permission, options);
 }

 //services get permmisions by Id
 GetPermmisionsbyIdServices(id : number){
  return this._http.get(this.apiUrl +'getPermmisionById?id='+ id); 
  }

  // Services delete permmisions
  DeletePermmisionServices(id:number){
    return this._http.delete(this.apiUrl +'deletePermission?id='+ id); 
  }

  //get all permmisions list
 GetAllPermmisionServices(){
    return this._http.get(this.apiUrl +'GetAll'); 
    }

//services get list permmisions type
getPermmisionsTypeServices(){
  return this._http.get(this.permmisionTypeUrl); 
  }

}
