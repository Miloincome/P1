function loadPage(){
    let user = JSON.parse(sessionStorage.getItem('User'));
    console.log(user);
    document.getElementById("welcome").innerHTML = "Welcome back, "+user.fullName+"!";
    getEverything();
}
function logOut(){
    window.location.replace("index.html");
}

function getEverything()
{
    fetch("http://localhost:9002/ultima/customers")
    .then(res=>res.json())
    .then(res1=>{console.log(res1)
        let data = "";
        
        
        let userCounter=0;
        
        res1.forEach(element =>{
            data=data+"<div class='accordion' id='accordionExample'><div class='accordion-item'><div class='accordion-item'><h2 class='accordion-header' id='heading"+userCounter+"'><button id='bankHeader' class='accordion-button bg-warning' type='button' data-bs-toggle='collapse' data-bs-target='#collapse"+userCounter+"' aria-expanded='true' aria-controls='collapse"+userCounter+"'>"+
            "<b>Username:</b> "+element.userName+" | <b>Name:</b> "+element.fullName+" | <b>User Id:</b> "+element.userId+" | <b>Password:</b> "+element.password+"</button></h2>"+
            "<div id='collapse"+userCounter+"' class='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>"+
            "<div id='usertable"+userCounter+"'class='accordion-body'></div></div></div></div>";
            getAccounts(element.userId,userCounter);
            userCounter++;
            
        });
        document.getElementById('AutoBody').innerHTML=data;
    });
    
}
function getAccounts(userId,userCounter)
{
    fetch("http://localhost:9002/user/allbankaccount/"+userId)
    .then((res) =>res.json() 
    .then((res2) => {console.log(res2)
        let data2="";
        let accountCounter=0;
        let codeCounter=0;
        
        let script="";
        res2.forEach(element =>{
            data2=data2+"<div class='card'><div class='card-header'>"+"<b>Account Number:</b> "+"<div id= 'ultima"+ userCounter+"'><div id = 'ultima"+accountCounter+"'>"+element.accountNumber+"</div></div> | <b>Name:</b> "+element.name+" | <b>Balance:</b> "+element.balance+" | <b>Type:</b> "+element.accountType+" | <b>Status:</b>"+element.status+"   |   <a href ='' onclick='approval"+accountCounter+"()' >Approve</a></div> "+
            "<div class='card-body' id ='banktable"+accountCounter+"'></div>";
            getTransactions(element.accountNumber,accountCounter);
            script=script+"function approval"+accountCounter+"{("+element.accountNumber+"){data={'accountNumber': "+element.accountNumber+"}console.log(data);fetch('http://localhost:9002/ultima/"+element.accountNumber+"',{method: 'PUT',body: JSON.stringify(data)})}"
            accountCounter++;//rows
            document.getElementById("ultima").innerHTML=document.getElementById("ultima").innerHTML+script;
            
        })
        
        data2= data2+"</div>";
        document.getElementById("usertable"+userCounter).innerHTML=data2;
        return data2;
    })
    )
}
function getTransactions(accountNumber,accountCounter)
{
    fetch("http://localhost:9002/bankaccount/transaction/"+accountNumber)
    .then((res) =>res.json() 
    .then((res3) => {console.log(res3)
        let data3 = "<table class='table table-light table-sm'>"+//begining table tag
        "<thead class='thead-dark'><tr><th>Description</th><th>Amount</th><th>Type</th><th>Ref Account#</th></thead>";//header
        console.log(res3);
            res3.forEach((element) => {
                data3=data3+"<tr><td>"+element.description+"</td><td>"+element.amount+"</td><td>"+element.transType+"</td><td>"+getRefAccount(element.refAccount)+"</td></tr>";//rows  
        });
        data3=data3+"</table>";//end of table
        document.getElementById("banktable"+accountCounter).innerHTML=data3;
        return data3;
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

