    const { DataTypes } = require('sequelize')
    const { sequelize } = require('../config/index')
    const userModel = require('./user.model')

    const orders = sequelize.define('orders',
        {
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            user_id :{
                type:DataTypes.INTEGER,
                allowNull:true,
            },
            order_id:{
                type:DataTypes.STRING,
                allowNull:true,
                unique:true,
            },
            items:{
                type:DataTypes.JSON,
                allowNull:false,
            },
            amount:{
                type:DataTypes.DECIMAL(25,2),
                allowNull:false,
            },
            ordered_address:{
                type:DataTypes.STRING,
                allowNull:true,
                
            }
        },
        {
            tableName:'orders',
            timestamps:true,
            createdAt:'created_at',
            updatedAt:'updated_at',
            hooks:{
                afterCreate: async (value,options)=>{
                    if(value.id){
                        console.log(value.id)
                        value.order_id = 'ORD-'+String(value.id).padStart(5, '0')
                        await value.save({transaction: options.transaction})
                    }
                }
            }
    })


    userModel.hasMany(orders,{foreignKey:'user_id', as:"orders"})
    orders.belongsTo(userModel,{foreignKey:'user_id', as:"user"})

        module.exports =  orders 