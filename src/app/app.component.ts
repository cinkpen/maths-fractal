import { Component } from '@angular/core';
import { FractalGeneratorService } from './fractal-generator.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [FractalGeneratorService]
})
export class AppComponent {
  title = 'app works!';
}
