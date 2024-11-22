'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction(); // Start a transaction
        try {
            // Create 'accounts' table
            await queryInterface.createTable(
                'accounts',
                {
                    id: {
                        type: Sequelize.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    created_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.fn('NOW'),
                    },
                    updated_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.fn('NOW'),
                    },
                    deleted_at: {
                        type: Sequelize.DATE,
                        allowNull: true,
                    },
                },
                { transaction } // Pass the transaction object
            );

            // Create 'settings' table
            await queryInterface.createTable(
                'settings',
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    value: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    data_type: {
                        type: Sequelize.ENUM('string', 'number', 'boolean', 'json'),
                        allowNull: false,
                    },
                    account_id: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'accounts', // Table name should match the casing used when creating the table
                            key: 'id',
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'SET NULL',
                        allowNull: true,
                    },
                    created_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.fn('NOW'),
                    },
                    updated_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.fn('NOW'),
                    },
                    deleted_at: {
                        type: Sequelize.DATE,
                        allowNull: true,
                    },
                },
                { transaction } // Pass the transaction object
            );

            // Commit the transaction
            await transaction.commit();
        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction(); // Start a transaction
        try {
            // Drop 'settings' table first due to foreign key dependency
            await queryInterface.dropTable('settings', { transaction });
            await queryInterface.dropTable('accounts', { transaction });

            // Commit the transaction
            await transaction.commit();
        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            throw error;
        }
    },
};
