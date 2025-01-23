import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecieCreateComponent } from './specie-create.component';
import { AdminSpecyService } from '../services/admin-specy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

// Import Jasmine types explicitly
declare var jasmine: {
  createSpyObj: (baseName: string, methodNames: string[]) => any
};

describe('SpecieCreateComponent', () => {
  let component: SpecieCreateComponent;
  let fixture: ComponentFixture<SpecieCreateComponent>;
  let mockSpecieService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockSpecieService = jasmine.createSpyObj('AdminSpecyService', ['createSpecies', 'updateSpecie', 'getSpecieById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      paramMap: of(new Map([['id', '123']]))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SpecieCreateComponent],
      providers: [
        { provide: AdminSpecyService, useValue: mockSpecieService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecieCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.specieForm.valid).toBeFalsy();
  });

  it('should validate form fields', () => {
    const form = component.specieForm;

    form.patchValue({
      name: 'AB',
      category: '',
      minimumWeight: -1,
      difficulty: '',
      points: 0
    });

    expect(form.get('name')?.valid).toBeFalsy();
    expect(form.get('category')?.valid).toBeFalsy();
    expect(form.get('minimumWeight')?.valid).toBeFalsy();
    expect(form.get('difficulty')?.valid).toBeFalsy();
    expect(form.get('points')?.valid).toBeFalsy();
  });

  it('should create a specie successfully', () => {
    const specieData = {
      name: 'Test Specie',
      category: 'SEA',
      minimumWeight: 50,
      difficulty: 'RARE',
      points: 100
    };

    mockSpecieService.createSpecies.and.returnValue(of({}));

    component.specieForm.patchValue(specieData);
    component.onSubmit();

    expect(mockSpecieService.createSpecies).toHaveBeenCalledWith(specieData);
    expect(component.successMessage).toContain('created successfully');
  });

  it('should handle creation error', () => {
    const specieData = {
      name: 'Test Specie',
      category: 'SEA',
      minimumWeight: 50,
      difficulty: 'RARE',
      points: 100
    };

    mockSpecieService.createSpecies.and.returnValue(throwError(() => new Error('Creation failed')));

    component.specieForm.patchValue(specieData);
    component.onSubmit();

    expect(mockSpecieService.createSpecies).toHaveBeenCalledWith(specieData);
    expect(component.errorMessage).toContain('Failed to create specie');
  });
});
