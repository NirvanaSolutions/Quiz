import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NumberDirective } from './directive/numbers-only.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NumberDirective
  ]
})
export class SharedModule { }
