import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiziIzleComponent } from './dizi-izle.component';

describe('DiziIzleComponent', () => {
  let component: DiziIzleComponent;
  let fixture: ComponentFixture<DiziIzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiziIzleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiziIzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
