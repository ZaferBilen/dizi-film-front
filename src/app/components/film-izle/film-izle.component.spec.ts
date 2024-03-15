import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmIzleComponent } from './film-izle.component';

describe('FilmIzleComponent', () => {
  let component: FilmIzleComponent;
  let fixture: ComponentFixture<FilmIzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmIzleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmIzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
