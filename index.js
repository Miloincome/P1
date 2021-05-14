btn1.addEventListener("click",()=>{
    let username = document.querySelector('#LoginUser').value;
    let password = document.querySelector('#LoginPass').value;
    let url="http://localhost:9002/checkuser/"+username+"/"+password;
    fetch(url)
    .then(res => res.json())
    .then(res1 => {console.log(res1)
    let data="";
    data= res1;
    console.log(data);
    let outcome = ""
    if(data ==false)
    {
        outcome="Incorrect Login Credentials";
        document.getElementById("").innerHTML=outcome;
    }
    else if(data == true)
    {
        outcome="Login Success!";
        document.getElementById("outcome").innerHTML=outcome;
        fetch("http://localhost:9002/user/"+username)
        .then(res => res.json())
        .then(res2 =>{console.log(res2)
            let user = {userName:res2.userName,fullName:res2.fullName,userType:res2.userType,password:res2.password,userId:res2.userId}
            console.log(user);
            sessionStorage.setItem("User",JSON.stringify(user));
            if(user.userType=="Customer")
            {
                window.location.replace("customer.html");
            }
            else if(user.userType == "Employee")
            {
                window.location.replace("employee.html");
            }
            else if(user.userType == "Admin")
            {
                window.location.replace("admin.html");
            }
            else
            {
                console.log("Failed to get User html page.")
            }

        })
    }
    }) 
})

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

