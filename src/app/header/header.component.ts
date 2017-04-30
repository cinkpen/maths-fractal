import { Component, OnInit } from '@angular/core';
import {FractalGeneratorService} from '../fractal-generator.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fractalGeneratorService:FractalGeneratorService) { }

  ngOnInit() {
  }

}
