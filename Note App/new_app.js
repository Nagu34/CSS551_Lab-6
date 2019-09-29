const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const Customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const Customer_Id_Options = {
    describe: 'Customer Id',
    demand : true,
    alias : 'id'
}

const Customer_Name_Options = {
    describe: 'Customer Name',
    demand : true,
    alias : 'name'
}

const Customer_Mail_Options = {
    describe: 'Customer Mail',
    demand : true,
    alias : 'email'
}

const argv =  yargs

    .command('add','Add the new customer data with name and email',{
        Customer_id: Customer_Id_Options,
        Customer_name: Customer_Name_Options,
        Customer_email: Customer_Mail_Options
    })
    .command('list','list all the customers data')
    .command('read','Read a note',{
        Customer_id: Customer_Id_Options
    })
    .command('remove','Remove a customer from the customer_data',{
        Customer_id: Customer_Id_Options
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var Customer = Customers.Add_Customer_data(argv.id,argv.name,argv.email);
    if (Customer){
        Customers.logCustomer(Customer);
    } else{
        console.log("Customer already exists");
    }
}

else if (command === 'list') {
    var AllCustomers = Customers.getAll();
    console.log(`Printing ${AllCustomers.length} customer(s).`);
    AllCustomers.forEach((Customer)=>{
        Customers.logCustomer(Customer);
    });
}

else if (command === 'read') {
    var Customer = Customers.Get_Customer_data(argv.id);
    if(Customer){
        Customers.logCustomer(Customer);
    }
    else{
        console.log("Customer not found");
    }
}

else if (command === 'remove') {
    var Customer = Customers.Remove_Customers_data(argv.id);
    if(Customer){
        console.log("Customer removed successfully");
    }
    else{
        console.log("Customer not found");
    }
}

else if (command === 'update') {
    var Customer = Customers.Update_Customers_data(argv.id, argv.name,argv.email);
    if(Customer){
        console.log("Customer Updated successfully");
    }
    else{
        console.log("Customer not found");
    }
}

else{
    console.log('command not recognized');
}
