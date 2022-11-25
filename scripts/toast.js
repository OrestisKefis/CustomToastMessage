let btnWarning = document.getElementById('btn-warning');
let btnDanger = document.getElementById('btn-danger');
let btnSuccess = document.getElementById('btn-success');
let toastTimeout;

const isInternetExplorer = navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident') > -1;
if(isInternetExplorer){
    InitializeToast("warning");
}

btnWarning.addEventListener('click', function(){
    InitializeToast("warning");
})
btnDanger.addEventListener('click', function(){
    InitializeToast("danger");
})
btnSuccess.addEventListener('click', function(){
    InitializeToast("success");
})

function InitializeToast(state){
    if(!ToastExists()){
        CreateToastMessage(state);
        toastTimeout = setTimeout(DropElement, 5000, document.getElementById('toast'))
    }
}

function CreateToastMessage(state){
    let toastDiv = document.createElement('div');
    let toastContainer = document.createElement('div');
    let toastSignWrapper = document.createElement('div');
    let toastTextWrapper = document.createElement('div');
    let toastSign = document.createElement('span');
    let toastMsgHeader = document.createElement('h2');
    let toastMsg = document.createElement('p');
    let backgroundColor;
    let faIcon;
    let headerMsg;
    let msg;

    toastDiv.addEventListener('click', function(){
        DropElement(toastDiv);
        clearTimeout(toastTimeout);
    })

    if(state == "warning"){
        backgroundColor = "#c05600";
        faIcon = "fa fa-warning";
        headerMsg = "Warning!";
        msg = "Internet Exlorer out of support. Page might not be displayed properly"
        // msg = "Please be careful";
    }
    else if(state == "danger"){
        backgroundColor = "red";
        faIcon = "fa fa-exclamation-circle"
        headerMsg = "Danger!";
        msg = "Something dangerous is about to happen";
    }
    else if(state == "success"){
        backgroundColor = "green";
        faIcon = "fa fa-thumbs-up";
        headerMsg = "Success!";
        msg = "Something successful happened";
    }

    toastDiv.id = "toast";
    toastDiv.style.backgroundColor = backgroundColor;
    toastContainer.id = "toast-container";
    toastContainer.className = "divToastWrapper";
    toastSignWrapper.id = "toast-sign-wrapper";
    toastSignWrapper.className = "divToastWrapper";
    toastSign.className = faIcon;
    toastTextWrapper.id = "toast-text-wrapper";
    toastTextWrapper.className = "divToastWrapper";
    toastMsgHeader.innerHTML = headerMsg;
    toastMsg.innerHTML = msg;

    toastDiv.appendChild(toastContainer);
    toastContainer.appendChild(toastSignWrapper);
    toastContainer.appendChild(toastTextWrapper);
    toastTextWrapper.appendChild(toastMsgHeader);
    toastTextWrapper.appendChild(toastMsg);
    toastSignWrapper.appendChild(toastSign);
    document.body.appendChild(toastDiv);
}

function ToastExists(){
    return document.getElementById('toast') == null ? false : true;
}

function DropElement(element){
    // element.remove();
    document.body.removeChild(element) //.remove() does not work on internet explorer (surprise-surprise)
}