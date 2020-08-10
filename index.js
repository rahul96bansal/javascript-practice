let x=[];

function multipleButtons(displayType) {
    let operations = document.getElementsByClassName("operation");
    for (let i=0; i<operations.length; i++) {
        operations[0].style.display=displayType;
        operations[1].style.display=displayType;
    }
}

// function removeButtonOperation(len) {
// }

function dataOperation(operationType) {
    let data = document.getElementsByClassName("checked");
    let taskList = document.getElementsByTagName("LI");
    let dataLength=0; 
    let taskListLength=0;
    console.log(taskList.length);
    console.log(data.length);
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].style.display == "block") {
            taskListLength++;
        }
    }
    for (let i=0; i<data.length; i++) {
        if (data[i].style.display == "block") {
            dataLength++;
            console.log("data",data[i].innerHTML);
            data[i].style.display = "none";
            
            if (operationType === "clear") {
                x=x.filter(value => `<span>${value.name}</span><span class="close">×</span>` != data[i].innerHTML || value.completed == true);
            } else if (operationType === "completed") {
                index=x.findIndex(value => `<span>${value.name}</span><span class="close">×</span>` == data[i].innerHTML); 
                console.log(index);
                x[index].completed= true;
                // let li = document.createElement("li");
                // li.innerHTML = data[i].innerHTML;
                // li.style.background = "green";
                // document.getElementById("myCompletedList").appendChild(li);
            } else {
                throw new Error("please pass valid operationType{clear , completed}");
            }
            // data[i].remove();
        }
    }
    
    if (taskListLength<=dataLength) {
        multipleButtons("none");
    }  else {
        // multipleButtons("inline-block");
    }
    // removeButtonOperation(data.length);
}

function clearTask () {
    dataOperation("clear");
    console.log("after clearing some task", x);
}

function completeTask () {
    dataOperation("completed");
    console.log("after some tasks are marked as completed", x);
}

function addTask (taskName) {
    // let taskName = document.getElementById("myInput").value;
    if (taskName === '') {
        alert('Input cannot be blank');
    } else if (x.findIndex(value => value.name === taskName) !==-1) {
        alert('Task already exist');
    } else {
        x.push({"name": taskName, "completed": false});
        document.getElementById("myInput").value="";
        let li = document.createElement("li");
        li.innerHTML = `<span>${taskName}</span>`;
        li.style.display = "block";

        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        // li.className = "close";
        // document.getElementById("myList").appendChild(span);
        document.getElementById("myList").appendChild(li);

        // multipleButtons("inline-block");
    } 
    // var close = document.getElementsByClassName("close");
    // var i;
    // for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function(e) {
    //         console.log("inside close", this.parentElement);
    //         var div = e.parentElement;
    //         div.style.display = "none";
    //     }
    // }
    console.log("after adding the task", x); 
}

var close = document.getElementsByClassName("close");
console.log("close", close);
var i;
for (i = 0; i < close.length; i++) {
    // console.log("inside close", this.parentElement);
  close[i].onclick = function(e) {
      console.log("getting e value", e);
    var div = e.target.parentElement;
    div.style.display = "none";
  }     
}

let ul = document.querySelector('ul'); 
ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    } else if ( e.target.tagName === 'SPAN' && e.target.className !== "close"){
        e.target.parentNode.classList.toggle('checked');
    }
});

var input = document.getElementById("myInput");
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask(input.value);
    }
});8