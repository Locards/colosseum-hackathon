import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT id, title, description, "imageUrl"
  from coupon
  UNION
  SELECT id, title, description, "imageUrl"
  from quest
  UNION
  SELECT id, title, description, "imageUrl"
  from affiliate
  `,
})
export class SpecialOffer {
  @ViewColumn()
  id: number;
  @ViewColumn()
  title: string;
  @ViewColumn()
  description: string;
  @ViewColumn()
  imageUrl: string;
}
