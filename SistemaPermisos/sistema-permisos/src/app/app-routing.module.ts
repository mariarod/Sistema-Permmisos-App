import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermmisionsListComponent } from './src/app/componentes/permmisions-list/permmisions-list.component';
import { PermmisionsComponent } from './src/app/componentes/permmisions/permmisions.component';


const routes: Routes = [
{ path:'', component:PermmisionsListComponent },
{ path:'create', component:PermmisionsComponent},
{path:'edit/:id', component:PermmisionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
