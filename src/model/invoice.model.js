const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/index')
const users = require('./user.model')
const orders = require('./order.model')

const invoice = sequelize.define('invoice',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        user_id :{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        order_id : {
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        invoice_id : {
            type:DataTypes.STRING,
            allowNull:true, 
            unique:true,
        },
    },
    {
        tableName:'invoice',
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        hooks:{
            afterCreate:async (value,options)=>{
                if(value.id){
                    console.log(value.id)
                    value.invoice_id = `INV-${String(value.id).padStart(5,'0')}`
                    await value.save({transaction: options.transaction})
                }
            }
        }

    })


    users.hasMany(invoice,{foreignKey:'user_id',as:"invoices_user"})
    orders.hasOne(invoice,{foreignKey:'order_id',as:"invoices_order"})

    invoice.belongsTo(users,{foreignKey:'user_id',as:"user_invoices"})
    invoice.belongsTo(orders,{foreignKey:'order_id',as:"order_invoices"})

module.exports =  invoice 