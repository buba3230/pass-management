import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { userEffects } from "../store/effects/user.effects";
import { reducers } from "../store/reducers/user.reducers";
import { RegistrationComponent } from "./registration.component";
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "../store/service/user.service";

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
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([userEffects])
    ],
    exports: [
        RegistrationComponent,
        HttpClientModule
    ],
    providers: [UserService]
})
export class RegistrationModule { }