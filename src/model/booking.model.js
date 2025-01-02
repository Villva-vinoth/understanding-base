const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/index')


const booking = sequelize.define('booking',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        booking_id :{
            type:DataTypes.STRING,
            allowNull:true,
            unique:true,
        },
        phone_number :{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },
    {
        tableName:'bookings',
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        paranoid:true,
        deletedAt:'deleted_at',
        hooks:{
           afterCreate: async (value,options)=>{
            if(value.id){
                value.booking_id = 'BOOK-'+String(value.id).padStart(5, '0')
                await value.save({transaction: options.transaction})
            }
           },
           afterBulkCreate: async (values,options)=>{
            for(const value of values){
                if(value.id){
                    value.booking_id = 'BOOK-'+String(value.id).padStart(5, '0')
                    await value.save({transaction: options.transaction})
                }
           }
        }
        }

    })

    module.exports =  booking 