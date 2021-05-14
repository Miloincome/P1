function createCustomer()
{   
    let username = document.querySelector('#createAccountName').value;
    fetch('http://localhost:9002/checkusername/customer/'+username)
    .then(res => res.json())
    .then(res1 => {console.log(res1)
    let userNameFinder="";
    userNameFinder= res1;
    console.log(userNameFinder);
    
    if(userNameFinder ==false && document.getElementById('startAmount').value >0)
    {
        outcome="Username was found to be unique!";
        document.getElementById("createConfirmation").innerHTML=outcome;
        //Customer Enter
        data={
            "userName": document.querySelector('#startUsername').value,
            "password": document.querySelector('#startPassword').value,
            "fullName":document.querySelector('#startFullName').value,
        }
        console.log(data);
        fetch('http://localhost:9002/customer/register/',{
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            document.getElementById("createConfirmation").innerHTML = "UserCreated"
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("createConfirmation").innerHTML = "User Application was a failed."
        });
    }
    else(userNameFinder == true)
    {
        outcome="User Name Taken or Negative Amount";
        document.getElementById("createConfirmation").innerHTML=outcome;
    }
    //Get UserId
    fetch('http://localhost:9002/username/'+document.getElementById('startUsername').value)
    .then(res => res.json())
    .then(res1 => {console.log(res1)
    let userid="";
    userId= res1;
    console.log(userId);
    //First Account
    data2={
        "name": document.querySelector('#createAccountName').value,
        "accountType": document.querySelector('#AccountTypeSelection').value,
        "balance":document.querySelector('#startAmount').value,
        "userId":userId
    }
    
    console.log(data2);
    fetch('http://localhost:9002/createaccount/',{
        method: 'POST',
        body: JSON.stringify(data2)
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
    })
    })
}

