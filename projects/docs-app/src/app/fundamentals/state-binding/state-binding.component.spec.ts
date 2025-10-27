import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateBindingComponent } from './state-binding.component';

describe('StateBindingComponent', () => {
  let component: StateBindingComponent;
  let fixture: ComponentFixture<StateBindingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [StateBindingComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
