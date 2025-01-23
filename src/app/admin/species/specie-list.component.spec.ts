import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecieListComponent } from './specie-list.component';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadSpecies, deleteSpecies } from '../../store/species/species.actions';


describe('SpecieListComponent', () => {
  let component: SpecieListComponent;
  let fixture: ComponentFixture<SpecieListComponent>;
  let store: MockStore;

  const initialState = {
    species: {
      list: [],
      loading: false,
      pageNumber: 0,
      totalPages: 1,
      totalElements: 0,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecieListComponent], // Import the standalone component
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(SpecieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSpecies action on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadSpecies({ page: 0, size: component.pageSize })
    );
  });



  it('should call nextPage() and dispatch loadSpecies action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.pageNumber = 0;
    component.totalPages = 2;
    component.nextPage();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadSpecies({ page: 1, size: component.pageSize })
    );
  });

  it('should call prevPage() and dispatch loadSpecies action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.pageNumber = 1;
    component.totalPages = 2;
    component.prevPage();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadSpecies({ page: 0, size: component.pageSize })
    );
  });

  it('should call deleteSpecies() and dispatch deleteSpecies action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const speciesId = '1';
    component.deleteSpecies(speciesId);
    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteSpecies({ id: speciesId })
    );
  });
});
