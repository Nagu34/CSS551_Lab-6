const fs=require('fs');

var FetchCustomers = () => {
    try {
        var Customers_data = fs.readFileSync('Customers_data.json')
        return JSON.parse(Customers_data);
    } catch(e){
        return [];
    }
};

var Save_Customer_Data = (Customers_data) => {
    fs.writeFileSync('Customers_data.json',JSON.stringify(Customers_data));
};
//---------------------------add customers data------------------------------------
var Add_Customer_data = (Customer_id,Customer_name, Customer_email) => {
    var Customers = FetchCustomers();
    var Customer_data = {Customer_id,Customer_name, Customer_email}

    var duplicateCustomers =  Customers.filter((Customer_data) => {
        return Customer_data.Customer_id === Customer_id;
    });

    if (duplicateCustomers.length === 0){
        Customers.push(Customer_data);
        Save_Customer_Data(Customers);
        return Customer_data
    }

};
//--------------------get all customers data-----------------------------------------
var getAll = () => {
    return FetchCustomers();
};
//-----------------------------------------------------

//--------------------get customers data---------------------------------------------
var Get_Customer_data = (Customer_id) => {

    var Customers = FetchCustomers();

    var GetCustomers =  Customers.filter((Customer) => {
        return Customer.Customer_id === Customer_id;
    });

    return GetCustomers[0]
};
//-----------------------------------------------------
//----------------------------------------Remove customers data--------------------------------
var Remove_Customers_data = (Customer_id) => {
    var Customers = FetchCustomers();
    var Filtered_Customers =  Customers.filter((Customer) => {
        return Customer.Customer_id !== Customer_id;
    });
    Save_Customer_Data(Filtered_Customers);
    return Customers.length !== Filtered_Customers.length
};
//-------------------------------------------------------------------
var Update_Customers_data = (Customer_id, Customer_name, Customer_email) => {

    var Customer = Get_Customer_data(Customer_id);
    if(Customer){
        Remove_Customers_data(Customer_id);
        return Add_Customer_data(Customer_id, Customer_name, Customer_email);
    }

};


//-----------------------------------------------------------

var logCustomer = (Customer) => {
    console.log('--');
    console.log(`Customer Id: ${Customer.Customer_id}`);
    console.log(`Customer Name: ${Customer.Customer_name}`);
    console.log(`Customer Email: ${Customer.Customer_email}`);

};

module.exports = {
    Add_Customer_data, getAll, Remove_Customers_data,Get_Customer_data,logCustomer, Update_Customers_data
};
