import * as moment from 'moment';
import { AssetDetailResponse, AssetResponse, Category, Stage } from './index';

export class Asset {
  // details
  id: number;
  name: string;
  description: string;
  identifier: string;

  // stock
  remarks: number;
  quantity: number;
  measureUnit: string;
  estimatedAmount: number;
  estimatedAmountCurrency: string;

  // relation keys
  categoryId: number;
  subcategoryId: number;
  stageId: number;

  // relation objects
  category: Category;
  subcategory: Category;
  stage: Stage;

  dateAdded: moment.Moment;
  addedBy: string;
  dateChanged: moment.Moment;
  changedBy: string;

  constructor() {
  }

  get value(): string {
    return this.estimatedAmount ? `${this.estimatedAmount} ${this.estimatedAmountCurrency}` : undefined;
  }

  setCategory(aCategory: Category) {
    this.category = aCategory;
  }

  setSubcategory(aSubcategory: Category) {
    this.subcategory = aSubcategory;
  }

  setStage(aStage: Stage) {
    this.stage = aStage;
  }

  get categoryName(): string {
    return this.category.name || undefined;
  }

  get subcategoryName(): string {
    return this.subcategory.name || undefined;
  }

  get stageName(): string {
    return this.stage.name || undefined;
  }

  fromAssetResponseJson(aJson: AssetResponse) {
    this.id = aJson.assetId;
    this.name = aJson.assetName;
    this.identifier = aJson.assetIdentifier;
    this.estimatedAmount = aJson.estimatedAmount;
    this.estimatedAmountCurrency = aJson.estimatedAmountCurrency;
  }

  fromAssetDetailResponseJson(aJson: AssetDetailResponse) {
    this.id = aJson.id;
    this.name = aJson.name;
    this.description = aJson.description;
    this.identifier = aJson.identifier;
    this.remarks = aJson.remarks;
    this.quantity = aJson.quantity;
    this.measureUnit = aJson.measureUnit;
    this.estimatedAmount = aJson.estimatedAmount;
    this.estimatedAmountCurrency = aJson.estimatedAmountCurrency;
    this.dateAdded = moment(aJson.addedDate);
    this.addedBy = aJson.userCodeAdd;
    this.dateChanged = moment(aJson.lastChangedDate);
    this.changedBy = aJson.userCodeLastChange;
  }

  toJson(): AssetResponse {
    return {
      assetId: this.id,
      assetName: this.name,
      assetIdentifier: this.identifier,
      assetCategory: this.category.description,
      assetSubcategory: this.subcategory.description,
      currentStage: this.stage.name,
      estimatedAmount: this.estimatedAmount,
      estimatedAmountCurrency: this.estimatedAmountCurrency,
    } as AssetResponse;
  }
}