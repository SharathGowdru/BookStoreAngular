import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogindisplayComponent } from './userlogindisplay.component';

describe('UserlogindisplayComponent', () => {
  let component: UserlogindisplayComponent;
  let fixture: ComponentFixture<UserlogindisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlogindisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlogindisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
