import { Component, OnInit } from '@angular/core';
import { FractalGeneratorService, Point } from '../fractal-generator.service'
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/observable'
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-fractal-viewer',
  templateUrl: './fractal-viewer.component.html',
  styleUrls: ['./fractal-viewer.component.css']
 
})
export class FractalViewerComponent implements OnInit {

  private subscription: Subscription;

  public points : Point[] = [];

  constructor(public fractalGeneratorService:FractalGeneratorService){}

  ngOnInit(){
    let width = 900;
    let height = 900;
    this.fractalGeneratorService.init(new Point(width/2,0), new Point(width,height), new Point(0,height), new Point(width/2, height/2));

    this.subscription = this.fractalGeneratorService.latestValue.
                          map(p=> JSON.parse(JSON.stringify(p))).
                          subscribe(p=> {
                            this.points.push(p);
                          });
  }

}