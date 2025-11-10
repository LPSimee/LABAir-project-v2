import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeListComponent } from './shoe-list.component';

describe('ShoeListComponent', () => {
  let component: ShoeListComponent;
  let fixture: ComponentFixture<ShoeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
