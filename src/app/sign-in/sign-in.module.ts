import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in.component";


const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
    },
];

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        SignInComponent,
    ],
    providers: []
})
export class SignInModule { }