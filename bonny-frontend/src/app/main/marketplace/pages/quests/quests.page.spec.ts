import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestsPage } from './quests.page';

describe('QuestsPage', () => {
  let component: QuestsPage;
  let fixture: ComponentFixture<QuestsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
