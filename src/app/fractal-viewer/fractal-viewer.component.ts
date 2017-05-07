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
    let a = new Point(width/2,0);
    let b = new Point(0,height)
    let c = new Point(width, height);

    let d = new Point(100, 2*height/4);
    let e = new Point(width/2-50, 2*height/4+200);
    let f = new Point(width/2, height-100);
    
    this.fractalGeneratorService.init(a,b,c,
    d,e,f,
     new Point(width/2, height/2));

    this.subscription = this.fractalGeneratorService.latestValue.
                          map(p=> JSON.parse(JSON.stringify(p))).
                          subscribe(p=> {
                            this.points.push(p);
                          });
  }

  calcRGB(x,y){
    let r = Math.round(x/900 * 255);
    let g = Math.round(y/900 * 255);
    return "rgba(" + r + "," + g + ",200, 1)"
  }

}