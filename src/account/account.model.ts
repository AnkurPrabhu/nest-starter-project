import {Column, DataType, Table} from "sequelize-typescript";
import {CrudMixin} from "../utils/models/models";

@Table({
    tableName: 'accounts', // Explicitly set the table name to 'accounts'
})
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