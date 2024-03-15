import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiziComponent } from './dizi.component';

describe('DiziComponent', () => {
  let component: DiziComponent;
  let fixture: ComponentFixture<DiziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiziComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
