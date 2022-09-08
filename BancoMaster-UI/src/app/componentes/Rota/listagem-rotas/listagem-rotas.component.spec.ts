import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemRotasComponent } from './listagem-rotas.component';

describe('ListagemRotasComponent', () => {
  let component: ListagemRotasComponent;
  let fixture: ComponentFixture<ListagemRotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemRotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
