import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';



export const routes: Routes = [
    {path: 'Calcula', component: CalculatorComponent},
    {path: '**', component: CalculatorComponent},
    {path: '', redirectTo: '/Calcula', pathMatch: 'full'},
];
