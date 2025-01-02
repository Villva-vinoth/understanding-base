I am using here sequelize ORM with postgres 
here Don't need of JOI package to validate your input by default your sequelize ORM validate method will take care --> 
if you want to use both its your choise , i m using both of the them !,
Error Handling and Custom Error for validation,
Transaction in Sequelize with the each of the request
I m doing the request without callback function when i m using the sequelize transaction and that's it ! 


for booking i use bulk create using json and csv 
   -- just commented the json part for future understanding that and return the result created : and error : 
   -- if error means i have made a separate csv file to show that the line having validation error 
for bulk delete i have provide the options to delete in array format 
for bulk edit i got options and update_options for which field you ne to update or else what you need to update

for options => { field:"id",values:[101,102] }  for update_options =>{"name":"vinoth"}

 -- both property for update and only options for update 



