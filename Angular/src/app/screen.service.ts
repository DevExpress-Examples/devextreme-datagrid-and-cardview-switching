import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(() => this.changed.next(true));
  }

  private isSmallScreen(): boolean {
    const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
    const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);

    return isSmall || isXSmall;
  }

  public get sizes(): Record<string, boolean> {
    return {
      'screen-small': this.isSmallScreen(),
    };
  }
}
