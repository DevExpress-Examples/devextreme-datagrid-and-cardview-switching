import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxCardViewModule } from 'devextreme-angular';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ScreenService } from './screen.service';

describe('AppComponent', () => {
  let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver> = jasmine.createSpyObj('BreakpointObserver', ['observe', 'isMatched']);

  beforeEach(async () => {
    mockBreakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: {} }));
    mockBreakpointObserver.isMatched.and.returnValue(false);

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
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
