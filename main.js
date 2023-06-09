// startClock is auto-triggered and provides real-time clock features
function startClock() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
     let time = hh + ":" + mm + ":" + ss + " " + session;
    document.getElementById("time_div").innerText = time;
    let list = document.getElementById('alrmList');
    if(list.childNodes.length > 1){
        let alarms = document.getElementsByClassName('alrmTime');
        
        for(let i=0;i<alarms.length;i++){
            if(alarms[i].innerText == time){
                alert('Wake UP!');
                alarms[i].setAttribute("class","lineThrough");
            }
        }
    } 
    let x = setTimeout(startClock, 1000);
}
startClock();


// checkValue func keeps check on time imput & restrict invalid time input
function checkValue(){
    console.log('i am clicked')
    let hr0 = document.getElementById('hrZero');
    let hr1 = document.getElementById("hrOne");
    if(parseInt(hr1.value) > 2){ // if 2nd digit in hh is >2
        hr0.value="0"; // then set 1st digit 0
    }
    if(hr0.value == "1"){
        hr1.setAttribute("max","2");
    }else{
        hr1.setAttribute("max","9")
    }
}

function setAlarm(){
    let hh = document.getElementById('hrZero').value + document.getElementById('hrOne').value;
    let mm = document.getElementById('minZero').value + document.getElementById('minOne').value;
    let ss = document.getElementById('ssZero').value + document.getElementById('ssOne').value;
    let session = document.getElementById('session').value;
    let time = hh+':'+mm+":"+ss+" " +session;
    if(IsAlreadyPresent(time)){ //checks if alarm for this time already present or not
        return;
    }
    // create and append alarm
    let parent = document.getElementById('alrmList');
    const rDiv = document.createElement('div');
    rDiv.setAttribute("class","row bWhite pt-2 rDiv");
    const cDiv1 = document.createElement('div');
    cDiv1.setAttribute("class","col-8 textCenter p-1");
    let p = document.createElement('p');
    p.setAttribute("class","alrmTime");
    const text = document.createTextNode(time);
    p.appendChild(text);
    cDiv1.appendChild(p);
    const cDiv2 = document.createElement('div');
    cDiv2.setAttribute("class","col-4 textCenter");
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML="Delete";
    deleteBtn.setAttribute("onClick","deleteAlarm(this)")
    deleteBtn.setAttribute("class","btn btn-danger btn-sm");
    cDiv2.appendChild(deleteBtn);
    rDiv.appendChild(cDiv1);
    rDiv.appendChild(cDiv2);
    parent.appendChild(rDiv);
}

function deleteAlarm(e){
    const btnDiv = e.parentNode;
    const mainDiv = btnDiv.parentNode;
    let list = document.getElementById('alrmList');
    list.removeChild(mainDiv);
}

function IsAlreadyPresent(time){
    let list = document.getElementById('alrmList');
    if(list.childNodes.length > 1){
        let alarms = document.getElementsByClassName('alrmTime');
        for(let i=0;i<alarms.length;i++){
            if(alarms[i].innerText == time){
                return true;
            }
        }
    }
    return false; 
}
// toggle func is for dark/light mode functionality
function toggle(){
    let icon = document.getElementById('icon');
    let main = document.getElementById('main');
    let box = document.getElementById('setAlarmBox');
    if(icon.classList.contains('bi-toggle-on')){
        icon.removeAttribute("class");
        icon.setAttribute("class","bi bi-toggle-off")
        main.removeAttribute('class');
        main.setAttribute("class","mainLight")
        document.body.style.color = "black";
        box.classList.add("bBlack");
        box.classList.remove("bWhite");
        changeColor('bWhite','bBlack');
    }else{
        icon.removeAttribute("class");
        icon.setAttribute("class","bi bi-toggle-on")
        main.removeAttribute('class');
        main.setAttribute("class","main")
        document.body.style.color = "white";
        box.classList.add("bWhite");
        box.classList.remove("bBlack");
        changeColor('bBlack','bWhite');
    }
   
}
// changeColor is a helper func to reduce repeatation of the code
function changeColor(from,to){
    let list = document.getElementById('alrmList');
        if(list.childNodes.length > 1){
            let nums = document.getElementsByClassName('rDiv');
            for(let i=0;i<nums.length;i++){
                nums[i].classList.add(to);
                nums[i].classList.remove(from);
            }
        }
}
