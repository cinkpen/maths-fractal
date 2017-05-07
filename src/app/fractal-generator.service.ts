import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subject } from 'rxjs/Subject'




@Injectable()
export class FractalGeneratorService {
  public latestValue: Observable<Point>;
  timer;
  intervalMS = 1;
  a: Point; b: Point; c: Point; d: Point; e: Point; f: Point; startingPosition: Point; currentPosition: Point;
  observer: Observer<Point>;

  constructor() { }
  ngOnInit() {
  }

  init(a: Point, b: Point, c: Point,
    d: Point, e: Point, f: Point,
    startingPosition: Point) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;

    this.startingPosition = startingPosition;
    this.currentPosition = startingPosition;

    this.latestValue = new Observable<Point>(observer => {
      this.observer = observer;
      this.setupNext();
    });
  }

  updatePosition() {
    let res = this.throwDice();

    let newA = new Point(this.currentPosition.x + ((this.a.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.a.y - this.currentPosition.y) / (2)));
    let newB = new Point(this.currentPosition.x + ((this.b.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.b.y - this.currentPosition.y) / (2)));
    let newC = new Point(this.currentPosition.x + ((this.c.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.c.y - this.currentPosition.y) / (2)));

    let newD = new Point(this.currentPosition.x + ((this.d.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.d.y - this.currentPosition.y) / (2)));
    let newE = new Point(this.currentPosition.x + ((this.e.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.e.y - this.currentPosition.y) / (2)));
    let newF = new Point(this.currentPosition.x + ((this.f.x - this.currentPosition.x) / 2), this.currentPosition.y + ((this.f.y - this.currentPosition.y) / (2)));
    switch (res) {
      case Dice.A: {
        this.currentPosition = newA;
        //Move half way towards A
        break;
      }
      case Dice.B: {
        //Move half way towards B
        this.currentPosition = newB;
        break;

      }
      case Dice.C: {
        //Move half way towards C
        this.currentPosition = newC;
        break;

      }
      case Dice.D: {
        this.currentPosition = newD;
        break;

      }
      case Dice.E: {
        this.currentPosition = newE;
        break;

      }
      case Dice.F: {
        this.currentPosition = newF;
        break;

      }
      default:
        {
          throw Error("Problem occurred here");
        }
    }
    this.observer.next(this.currentPosition);
  }

  setupNext() {
    this.timer = setTimeout(() => {
      this.updatePosition();
      this.setupNext();
    }, this.intervalMS);

  }




  throwDice(): Dice {
    let result = Math.random() * 5;
    if (result < 0) {
      result = Math.random() * 3;
      if (result < 1)
        return Dice.D;
      else if (result < 2)
        return Dice.E;
      else
        return Dice.F;
    }
    else {
      result = Math.random() * 3;
      if (result < 1)
        return Dice.A;
      else if (result < 2)
        return Dice.B;
      else
        return Dice.C;
    }


  }

}


export class Point {
  constructor(public x, public y) {

  }

}


export enum Dice {
  A, B, C, D, E, F
}
