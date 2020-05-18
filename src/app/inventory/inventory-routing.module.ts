import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './components/reception/reception.component';
import { RegisterReceptionComponent } from './components/register-reception/register-reception.component';


const routes: Routes = [
  {path: 'reception', pathMatch: 'full', component: ReceptionComponent},
  {path: 'reception/register', pathMatch: 'full', component: RegisterReceptionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
