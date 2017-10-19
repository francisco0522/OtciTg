import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EjecutadosProyectosPage } from './ejecutados-proyectos';

@NgModule({
  declarations: [
    EjecutadosProyectosPage,
  ],
  imports: [
    IonicPageModule.forChild(EjecutadosProyectosPage),
  ],
})
export class EjecutadosProyectosPageModule {}
