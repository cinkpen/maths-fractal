import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCheckboxModule, MdSliderModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdSliderModule],
  exports: [MdButtonModule, MdCheckboxModule, MdSliderModule],
  declarations: []
})

export class AngularMaterialModule { }
