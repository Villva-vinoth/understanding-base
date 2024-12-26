const { Op } = require("sequelize");

const pagination = (data) => {
  console.log("inside pagination", data);
  const limit = parseInt(data.limit) || 10;
  const pageSize = ((data.page ? Number(data.page) : 1) - 1) * limit;
  const orderBy = [["id", "ASC"]];
  const query = data;
  console.log("query", query);
  return { limit: limit, offset: pageSize, order: orderBy };
};

const filter = (data) => {
  // console.log("inside pagination F",data);

  const { pagination, filter, sorter } = data;

  //pagination logic

  const limits = (pagination && parseInt(pagination?.limit)) || 10;
  const currentPage = (pagination && Number(pagination.page)) || 1;
  // console.log('currentPage',currentPage,limits)
  const pageSize = (currentPage - 1) * limits;

  // sorter logic

  let queryOpt = {
    where:[],
    limit: limits,
    offset: pageSize,
    order: [["id", "ASC"]],
  };


  // filter logic 

  let where = [];
  if(filter){
    for (let i = 0; i < filter.length; i++) {
        const { field, value, type } = filter[i];
    
        if  (!field || !value || !type) {
            continue;
        }
    
        switch (type) {
          case "eq":
            where.push({
              [field]: {
                [Op.eq]: value,
              },
            });
            break;
          case "ne":
            where.push({
                [field]: {
                  [Op.ne]: value,
                },
              });
            break;
          default:
            where.push({
                [field]:  value,
              });
            break;
        }
      }
    }

  if(where.length !== 0){
         queryOpt.where= where
      console.log("where : : ",where)
     }

  console.log('query',queryOpt)

  console.log("query where", queryOpt.where);
  return queryOpt;
};

module.exports = { pagination, filter };
