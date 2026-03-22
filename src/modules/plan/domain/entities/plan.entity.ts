import { BaseEntityType } from '../../../../core/types/base-entity.type';
import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { v4 as uuidv4 } from 'uuid';

interface PlanProps extends BaseEntityType {
  name: string;
  description?: string;
  discountLimit?: number;
  hasUnlimitedUsage: boolean;
  creditAmount?: number;
  trialDays?: number;
  isActive: boolean;
}

export type CreatePlanProps = {
  name: string;
  description?: string;
  discountLimit?: number;
  hasUnlimitedUsage: boolean;
  creditAmount?: number;
  trialDays?: number;
  isActive: boolean;
};

export type UpdatePlanProps = Partial<CreatePlanProps>;

export class Plan extends AggregateRoot {
  private name: string;
  private description?: string;
  private discountLimit?: number;
  private hasUnlimitedUsage: boolean;
  private creditAmount?: number;
  private trialDays?: number;
  private isActive: boolean;

  constructor(props: PlanProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    this.name = props.name;
    this.description = props.description;
    this.discountLimit = props.discountLimit;
    this.hasUnlimitedUsage = props.hasUnlimitedUsage;
    this.creditAmount = props.creditAmount;
    this.trialDays = props.trialDays;
    this.isActive = props.isActive;
  }

  static create(props: CreatePlanProps): Plan {
    const name = props.name;
    const description = props.description;
    const discountLimit = props.discountLimit;
    const hasUnlimitedUsage = props.hasUnlimitedUsage;
    const creditAmount = props.creditAmount;
    const trialDays = props.trialDays;
    const isActive = props.isActive;

    return new Plan({
      id: uuidv4(),
      name,
      description,
      discountLimit,
      hasUnlimitedUsage,
      creditAmount,
      trialDays,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  update(props: UpdatePlanProps) {
    if (props.name) this.name = props.name;
    if (props.description) this.description = props.description;
    if (props.discountLimit) this.discountLimit = props.discountLimit;
    if (props.hasUnlimitedUsage)
      this.hasUnlimitedUsage = props.hasUnlimitedUsage;
    if (props.creditAmount) this.creditAmount = props.creditAmount;
    if (props.trialDays) this.trialDays = props.trialDays;
    if (props.isActive) this.isActive = props.isActive;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
  setName(newName: string) {
    this.name = newName;
  }

  getDescription(): string | undefined {
    return this.description;
  }
  setDescription(newDescription: string) {
    this.description = newDescription;
  }

  getDiscountLimit(): number | undefined {
    return this.discountLimit;
  }
  setDiscountLimit(newDiscountLimit: number) {
    this.discountLimit = newDiscountLimit;
  }

  getHasUnlimitedUsage(): boolean {
    return this.hasUnlimitedUsage;
  }
  setHasUnlimitedUsage(newHasUnlimitedUsage: boolean) {
    this.hasUnlimitedUsage = newHasUnlimitedUsage;
  }

  getCreditAmount(): number | undefined {
    return this.creditAmount;
  }
  setCreditAmount(newCreditAmount: number) {
    this.creditAmount = newCreditAmount;
  }

  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
}
