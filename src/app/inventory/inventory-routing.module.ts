import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './components/reception/reception.component';
import { RegisterReceptionComponent } from './components/register-reception/register-reception.component';
import { AuthGuard } from '../login/guards/auth.guard';


const routes: Routes = [
  {path: 'reception', pathMatch: 'full', component: ReceptionComponent, canActivate: [AuthGuard]},
  {path: 'reception/register', pathMatch: 'full', component: RegisterReceptionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
