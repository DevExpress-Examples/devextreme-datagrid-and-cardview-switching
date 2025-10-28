import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxCardViewModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { ScreenService } from './screen.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe', 'isMatched']);
    breakpointObserverSpy.observe.and.returnValue(of({ matches: false, breakpoints: {} }));
    breakpointObserverSpy.isMatched.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DxDataGridModule,
        DxCardViewModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        ScreenService,
        { provide: BreakpointObserver, useValue: breakpointObserverSpy }
      ],
    }).compileComponents();

    mockBreakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
