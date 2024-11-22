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
  created_at: Date;

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


