import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

import { ModelAttributeColumnReferencesOptions } from 'sequelize/types/model';

@Table
export class CrudMixin extends Model {
  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
  })
  deleted_at: Date;
}

@Table
export class Account extends CrudMixin {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;
}

@Table
export class Setting extends CrudMixin {
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  value: string;

  @Column
  data_type: string;

  @Column({
    references: {
      model: Account,
      key: 'id',
    } as ModelAttributeColumnReferencesOptions,
  })
  account_id: number;
}
