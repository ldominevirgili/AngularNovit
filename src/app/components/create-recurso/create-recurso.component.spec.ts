import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecursoComponent } from './create-recurso.component';

describe('CreateRecursoComponent', () => {
  let component: CreateRecursoComponent;
  let fixture: ComponentFixture<CreateRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
