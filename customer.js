function loadPage(){
    let user = JSON.parse(sessionStorage.getItem('User'));
    console.log(user);
    document.getElementById("welcome").innerHTML = "Welcome back, "+user.fullName+"!";
    getAccountInformation(user);
}
function logOut(){
    window.location.replace("index.html");
}
function getAccountInformation(user)
{
    fetch("http://localhost:9002/user/bankaccount/"+user.userId)
    .then(res=>res.json())
    .then(res1=>{console.log(res1)
        let data = "";
        let data3 ="";
        let accountCounter=0;
        res1.forEach(element =>{
            data=data+"<div class='accordion' id='accordionExample'><div class='accordion-item'><h2 class='accordion-header' id='heading"+accountCounter+"'><button id='bankHeader' class='accordion-button bg-warning' type='button' data-bs-toggle='collapse' data-bs-target='#collapse"+accountCounter+"' aria-expanded='true' aria-controls='collapse"+accountCounter+"'>"+
            "<b>Account Number:</b> "+element.accountNumber+" | <b>Name:</b> "+element.name+" | <b>Balance:</b> <span id ='balanceFor"+element.accountNumber+"'>"+element.balance+"</span> | <b>Type:</b> "+element.accountType+"</button></h2>"+
            "<div id='collapse"+accountCounter+"' class='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>"+
            "<div id='banktable"+accountCounter+"'class='accordion-body'></div></div></div></div>";
            getTransactions(element.accountNumber,accountCounter);
            accountCounter++;
            data3=data3+"<option value='"+element.accountNumber+"'>"+element.name+"</option>";//Adds rows
            
        })
        document.getElementById("accountSelect").innerHTML=data3;
        document.getElementById("accountSelect2").innerHTML=data3;
        document.getElementById("AutoBody").innerHTML=data;
    });
}

function getTransactions(accountNumber,accountCounter)
{
    fetch("http://localhost:9002/bankaccount/transaction/"+accountNumber)
    .then((res) =>res.json() 
    .then((res2) => {console.log(res2)
        let data1 = "<table class='table table-light table-sm'>"+//begining table tag
        "<thead class='thead-dark'><tr><th>Description</th><th>Amount</th><th>Type</th><th>Ref Account#</th></thead>";//header
        console.log(res2);
            res2.forEach((element) => {
                data1=data1+"<tr><td>"+element.description+"</td><td>"+element.amount+"</td><td>"+element.transType+"</td><td>"+getRefAccount(element.refAccount)+"</td></tr>";//rows  
        });
        data1=data1+"</table>";//end of table
        document.getElementById("banktable"+accountCounter).innerHTML=data1;
        return data1;
    })
    )
}
function getRefAccount(refaccount)
{
    if(refaccount == 0)
    {
        refaccount="N/A";
    }
    return refaccount;
}
function doTool(){
    let user = JSON.parse(sessionStorage.getItem('User'));
    if(document.querySelector('#amountTool').value<0)
    {
        document.getElementById("toolConfirmation").innerHTML = "Disturbance in the force detected: you can't have a 0 or a negative."
    }
    else
    {
        if(document.querySelector('#toolSelection').value == "Deposit")
        {
            const data = {
                "amount": document.querySelector('#amountTool').value,
                "transType": document.querySelector('#toolSelection').value,
                "accountNumber":document.querySelector('#accountSelect').value
            }
            fetch('http://localhost:9002/tool/depo/',{
                method: 'POST',
                body: JSON.stringify(data)
            }) 
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                document.getElementById("toolConfirmation").innerHTML = "Deposit was a Success"
            })
            .catch(error => {
             console.error('Error:', error);
               document.getElementById("toolConfirmation").innerHTML = "Deposit was a Failure"

            }); 
            
        }
        else if(document.querySelector('#toolSelection').value == "Withdraw")
        {
            const data2 = {
                "amount": document.querySelector('#amountTool').value,
                "transType": document.querySelector('#toolSelection').value,
                "accountNumber":document.querySelector('#accountSelect').value
            }
            let balanceChecker = document.getElementById("balanceFor"+data2.accountNumber).innerHTML;
            console.log(balanceChecker);
            if(document.querySelector('#amountTool').value > balanceChecker )
            {
                document.getElementById("toolConfirmation").innerHTML = "Disturbance in the force detected: you cannot withdraw more than what you have."
            }else
            {
                    fetch('http://localhost:9002/tool/with/',{
                    method: 'POST',
                    body: JSON.stringify(data2)
                }) 
                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result);
                document.getElementById("toolConfirmation").innerHTML = "Withdraw was a Success"
                })
                .catch(error => {
                console.error('Error:', error);
                document.getElementById("toolConfirmation").innerHTML = "Withdraw was a Failure"

                });
            }
        }
        else if(document.querySelector('#toolSelection').value == "Transfer")
        {
            const data3 = {
                    "amount": document.querySelector('#amountTool').value,
                    "transType": document.querySelector('#toolSelection').value,
                    "accountNumber":document.querySelector('#accountSelect2').value,
                    "refAccount":document.querySelector('#accountSelect').value
                }
            let balanceChecker = document.getElementById("balanceFor"+data3.accountNumber).innerHTML;
            console.log(balanceChecker);
            if(document.querySelector('#amountTool').value > balanceChecker)
            {
                console.log(document.querySelector('#amountTool').value);
                console.log(getBankAccountAmount(document.querySelector('#accountSelect2').value));
                document.getElementById("toolConfirmation").innerHTML = "Disturbance in the force detected: you cannot Transfer more than what you have."
            }else
            {
                
                fetch('http://localhost:9002/tool/trans/',{
                    method: 'POST',
                    body: JSON.stringify(data3)
                }) 
                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result);
                    document.getElementById("toolConfirmation").innerHTML = "Transfer was a Success"
                })
                .catch(error => {
                 console.error('Error:', error);
                   document.getElementById("toolConfirmation").innerHTML = "Transfer was a Failure"
    
                }); 
                
            }
            
        }
    }
    console.log(user);
    document.getElementById('AutoBody').innerHTML="";
    getAccountInformation(user);
}
function createAccount()
{
    data={
        "name": document.querySelector('#createAccountName').value,
        "accountType": document.querySelector('#AccountTypeSelection').value,
        "balance":document.querySelector('#startAmount').value,
        "userId":JSON.parse(sessionStorage.getItem('User')).userId
    }
    console.log(data);
    fetch('http://localhost:9002/createaccount/',{
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        document.getElementById("createConfirmation").innerHTML = "Account application was sent! Wait for approval."
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("createConfirmation").innerHTML = "Account  Application was a failed."
    });  
    location.reload();
}

/*
    let tool = document.querySelector('#toolSelection').value;
    let accountTo = document.querySelector('#accountSelect').value;
    let accountFrom = document.querySelector('#accountSelect2').value;
    let amountTool = document.querySelector('#amountTool').value;
    let descripTool =document.querySelector('#descripTool').value;

    */


