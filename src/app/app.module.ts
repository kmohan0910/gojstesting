import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridsterModule } from 'angular-gridster2';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';

@NgModule({
  declarations: [AppComponent, DiagramComponent],
  imports: [BrowserModule, GridsterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
