import {Column, DataType, Table} from "sequelize-typescript";
import {ModelAttributeColumnReferencesOptions} from "sequelize/types/model";
import {CrudMixin} from "../utils/models/models";
import {Account} from "../account/account.model";

@Table({
    tableName: 'settings', // Explicitly set the table name to 'accounts'
})
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

    @Column({
        type: DataType.ENUM('string', 'number', 'boolean', 'json'),
        })
    data_type: 'string' | 'number' | 'boolean' | 'json';

    @Column({
        type:  DataType.NUMBER,
        references: {
            model: Account,
            key: 'id',
        } as ModelAttributeColumnReferencesOptions,
    })
    account_id: number;
}
