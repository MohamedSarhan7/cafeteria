export function isValidUser(obj, avatar) {
    let res = {};
    console.log(obj);
    for (const key in obj) {
        if (obj[key] == '') {
            res[key] = `${key} is requird`;
        }


    }
    if (!ValidatePrice(obj['price'])) {
        res['price'] = `price is Not valid`;
    }
    if (obj.hasOwnProperty('password')) {
        if (obj['password'] != "") {

            if (!ValidatePassword(obj['password'])) {
                res['password'] = `password is Not valid`;
            } else if (obj['password'] != obj['confirm_password']) {
                res['confirm_password'] = `password dosen't match`;
            }
        }
    }
    let vaildSize = 1024 * 1024;
    let vaildExtention = ['png', 'jpeg', 'jpg'];
    if (obj.hasOwnProperty('avatar')) {

        if (obj['avatar'] != "") {
            let extention = avatar.type.split("/")[1];
            if (!vaildExtention.includes(extention)) {
                res['avatar'] = `not vaild extention only (png,jpeg,jpg)`;
            }

            if (avatar.size > vaildSize) {
                res['avatar'] = "max size is 1 MB"
            }
        }

    }

    return res;
}



export function ValidatePrice(price) {
    if (price>0) {
        return true
    }
    // alert("You have entered an invalid email address!")
    return false;
}

// export function ValidatePassword(password) {
//     //    let phpRegx = '$\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$';
//     //     phpRegx = phpRegx.replace(/\(\d*\)|\/\(P\)\//g, "");

//     let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//     if (pass.test(password)) {

//         return true
//     }

//     return false;
// }


// export function ValidateCategory(category) {
//     //    let phpRegx = '$\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$';
//     //     phpRegx = phpRegx.replace(/\(\d*\)|\/\(P\)\//g, "");

//     let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//     if (pass.test(password)) {

//         return true
//     }

//     return false;
// }

export function insertErrorMessages(ob) {
   
    for (const key in ob) {
        if (ob.category) {
            let select=document.querySelector(`select[name=${key}`) 
            select.nextElementSibling.classList.add("active");
            select.nextElementSibling.textContent=ob[key];
        }
        else{
            let input = document.querySelector(`input[name=${key}`);
            let error = input.nextElementSibling;
            error.textContent = ob[key];
            input.nextElementSibling.classList.add("active");
        }
        // console.log(input.nextElementSibling);
    }
}


export function clearErrors() {
    let input = document.querySelectorAll(`input`);
    input.forEach(obj => {
        if (obj.nextElementSibling) {

            obj.nextElementSibling.classList.remove("active");
        }
    }
    );
}
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}