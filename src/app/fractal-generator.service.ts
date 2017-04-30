import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subject } from 'rxjs/Subject'




@Injectable()
export class FractalGeneratorService {
  public latestValue: Observable<Point>;
  timer;
  intervalMS = 1;
  a: Point; b: Point; c: Point; startingPosition: Point; currentPosition: Point;
  observer: Observer<Point>;

  constructor() { }
  ngOnInit() {
  }

  init(a: Point, b: Point, c: Point, startingPosition: Point) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.startingPosition = startingPosition;
    this.currentPosition = startingPosition;

    this.latestValue = new Observable<Point>(observer => {
      this.observer = observer;
      this.setupNext();
    });
  }

  updatePosition() {
    let res = this.throwDice();
    switch (res) {
      case Dice.ONE: {
        this.currentPosition.x = this.currentPosition.x + ((this.a.x - this.currentPosition.x) / 2);
        this.currentPosition.y = this.currentPosition.y + ((this.a.y - this.currentPosition.y) / 2);

        //Move half way towards A
        break;
      }
      case Dice.TWO: {
        //Move half way towards B
        this.currentPosition.x = this.currentPosition.x + ((this.b.x - this.currentPosition.x) / 2);
        this.currentPosition.y = this.currentPosition.y + ((this.b.y - this.currentPosition.y) / 2);
        break;

      }
      case Dice.THREE: {
        //Move half way towards C
        this.currentPosition.x = this.currentPosition.x + ((this.c.x - this.currentPosition.x) / 2);
        this.currentPosition.y = this.currentPosition.y + ((this.c.y - this.currentPosition.y) / 2);
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
    let result = Math.random() * 3;
    if (result < 1)
      return Dice.ONE;

    else if (result < 2)
      return Dice.TWO;

    else
      return Dice.THREE;
  }

}


export class Point {
  constructor(public x, public y) {

  }

}


export enum Dice {
  ONE,
  TWO,
  THREE
}
