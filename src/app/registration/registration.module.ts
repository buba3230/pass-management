import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./registration.component";

const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent,
    },
];

@NgModule({
    declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RegistrationComponent
    ],
    providers: []
})
export class RegistrationModule { }