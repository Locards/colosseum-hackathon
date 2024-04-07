import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffiliatesPage } from './affiliates.page';

describe('AffiliatesPage', () => {
  let component: AffiliatesPage;
  let fixture: ComponentFixture<AffiliatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AffiliatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
