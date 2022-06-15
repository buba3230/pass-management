import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { userEffects } from "../store/effects/user.effects";
import { reducers } from "../store/reducers/user.reducers";
import { UserService } from "../store/service/user.service";
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
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([userEffects])
    ],
    exports: [
        SignInComponent,
        HttpClientModule
    ],
    providers: [UserService]
})
export class SignInModule { }