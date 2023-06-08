import { AnimationPlayer, AnimationMetadata, style, animate, AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFatBtn]'
})
export class FatBtnDirective {

  player?: AnimationPlayer;

  isBig = false;


  bigAnimation: AnimationMetadata[] = [
    style({ transform: 'scale(1)' }),
    animate('4000ms ease-in', style({ transform: 'scale(5)' })),
  ];

  smallAnimation : AnimationMetadata[] = [
    style({ transform: 'scale(5)' }),
    animate('4000ms ease-in', style({ transform: 'scale(1)' })),
  ];

  @HostListener('click', ['$event']) onClick($event: any){
    if (this.isBig) {
      this.startAnimation(this.smallAnimation)
    } else {
      this.startAnimation(this.bigAnimation)
    }
    this.isBig = !this.isBig;
  }


  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  startAnimation(animation: AnimationMetadata[]){
    if (this.player) {
      this.player.destroy();
    }
    const factory = this.builder.build(animation);
    const player = factory.create(this.el.nativeElement);
    player.play();
  }

}
