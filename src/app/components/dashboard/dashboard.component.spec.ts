/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Input, Component } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

import { StocksService } from '../../services/stocks.service';
import { StubStocksService } from '../../services/stocks.service.stub';

@Component({
  selector: 'app-summary',
  template: '<div class="mdl-card">{{stock}}</div>'
})
class StubSummaryComponent {
  @Input() stock;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        StubSummaryComponent,
      ],
      providers: [
        { provide: StocksService, useClass: StubStocksService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    expect(component.stocks).toBeFalsy();
    fixture.detectChanges();
    expect(component.stocks).toBeTruthy();
  });

});
