import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PermmisionsListComponent } from './src/app/componentes/permmisions-list/permmisions-list.component';
import { PermmisionsComponent } from './src/app/componentes/permmisions/permmisions.component';
import { DataservicesService } from './Servises/dataservices.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    PermmisionsListComponent,
    PermmisionsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [DataservicesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
