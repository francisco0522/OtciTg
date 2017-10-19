import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciativaProyectosPage } from './iniciativa-proyectos';

@NgModule({
  declarations: [
    IniciativaProyectosPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciativaProyectosPage),
  ],
})
export class IniciativaProyectosPageModule {}
