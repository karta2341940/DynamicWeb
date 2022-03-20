let states = ["false", "true", "delete"];
let nowState = "all";
let tabStates = document.querySelector('.nav-link.active').parentNode.dataset.type;
let store = [];
let localName = "item-all";
let listitem = document.querySelector('.list-group');
let form = document.getElementsByTagName('form')[0];
let navlink = document.getElementsByClassName('nav-link');

//Show alert
function showAlert(name){
    let doc=document.querySelector('#alert');
    doc.classList.add("show");
    doc.textContent=`${name} has been Delete`;

}

//Get Local Storage 
function getLs() {
    let getMenu = {};
    getMenu = JSON.parse(localStorage.getItem(localName));
    return (getMenu ?? []);
}

//Set Local Storage
function setLs(item) {
    if (item.length > 0) {
        localStorage.setItem(localName, JSON.stringify(item))
    }
    else {
        console.log("This data is Null");
    }
}

//Clean all Local Storage
function clearLs() {
    store = [];
    localStorage.removeItem(localName);
    setitem(getLs());
}

//Rendering Check icon color
function renderClick(node, state) {

    if (state.includes(states[1])) {
        node.classList.remove("bi-bookmark-check");
        node.classList.add("bi-bookmark-check-fill");
        return;
    }
    node.classList.remove("bi-bookmark-check-fill");
    node.classList.add("bi-bookmark-check");
    return;
}
//Rendering delete icon color
function renderDelete(node, state) {

    if (state.includes(states[2])) {
        node.classList.remove("bi-file-x");
        node.classList.add("bi-file-x-fill");
        return;
    }
    node.classList.remove("bi-file-x-fill");
    node.classList.add("bi-file-x");
    return;
}



//Rendering All list
function renderList() {

    listitem.innerHTML = ""
    let litag = "";
    let item = getLs();
    console.log("item Render", item);
    let tmp = "";
    if (tabStates == "all") {
        //General todo list for all tab
        for (let data of item) {
            tmp = litag
            if (!String(data.state).includes('delete')) {
                litag = `<li class="list-group-item d-flex justify-content-between align-items-center task-item-o" data-time="${data.time}" data-state="${data.state}">
                <span class="task">${data.name}</span>
                <span class="task-item">
                <span ><i class="icon-get icon-green bi bi-bookmark-check"></i></span>
                <span ><i class="icon-get icon-gray bi bi-pen"></i></span>
                <span><i class="icon-get icon-red bi bi-file-x"></i></span>
                </span>
                <div class="check-box">
                <span class="yes">Yes</span>
                <span class="no">No</span>
                </div>
                </li>`;
            }
            if (litag != tmp) listitem.insertAdjacentHTML("beforeend", litag)
        }
    }
    else if (tabStates != "all" && tabStates != "delete") {
        //General todo list
        let tmp = "";
        for (let data of item) {
            tmp = litag
            if (data.state == tabStates) {
                litag = `<li class="list-group-item d-flex justify-content-between align-items-center task-item-o" data-time="${data.time}" data-state="${data.state}">
                <span class="task">${data.name}</span>
                <span class="task-item">
                <span ><i class="icon-get icon-green bi bi-bookmark-check"></i></span>
                <span ><i class="icon-get icon-gray bi bi-pen"></i></span>
                <span><i class="icon-get icon-red bi bi-file-x"></i></span>
                </span>
                <div class="check-box">
                <span class="yes">Yes</span>
                <span class="no">No</span>
                </div>
                </li>`;
            }
            if (litag != tmp) listitem.insertAdjacentHTML("beforeend", litag)
        }

    }
    else {
        let tmp = "";
        for (let data of item) {
            tmp = litag
            if (String(data.state).includes("delete")) {
                litag = `<li class="list-group-item d-flex justify-content-between align-items-center task-item-o" data-time="${data.time}" data-state="${data.state}">
                <span class="task">${data.name}</span>
                <span class="task-item">
                <span ><i class="icon-get icon-green bi bi-bookmark-check"></i></span>
                <span ><i class="icon-get icon-gray bi bi-pen"></i></span>
                <span><i class="icon-get icon-red bi bi-file-x"></i></span>
                </span>
                <div class="check-box">
                <span class="yes">Yes</span>
                <span class="no">No</span>
                </div>
                </li>`;
            }
            if (litag != tmp) listitem.insertAdjacentHTML("beforeend", litag)
        }


    }

}

//Set the todo item 

function setitem() {
    console.log(new Date())
    let item = getLs();
    renderList();

    for (let nodeP of listitem.querySelectorAll('.list-group-item')) {
        let node;
        node = nodeP.querySelector('.bi-bookmark-check');
        //Regist click event of Check icon
        node.addEventListener('click', (e) => {
            console.clear();
            if (nodeP.dataset.state.includes(states[0])) nodeP.dataset.state = nodeP.dataset.state.replace(states[0], states[1]);
            else if (nodeP.dataset.state.includes(states[1])) nodeP.dataset.state = nodeP.dataset.state.replace(states[1], states[0]);
            for (let i of item) {
                if (i.time == nodeP.dataset.time) {
                    i.state = nodeP.dataset.state;
                }
            }
            setLs(item);
            setTimeout(setitem,0)
            
        });

        for (let i of item) {
            if (i.time == nodeP.dataset.time) {
                renderClick(node, i.state)
            }
        }

        //Regist click event of Edit icon
        node = nodeP.querySelector('.bi-pen');
        node.addEventListener('click', (e) => {
            let taskName = nodeP.querySelector('.task');
            let tmpName;

            for (let i of item) {
                if (i.time == nodeP.dataset.time) {
                    tmpName = i.name;
                }
            }

            taskName.innerHTML = `
            <form>
            <span class="input-group mb-3">
            <input type="text" class="form-control" value="${tmpName}">
            <button class="btn btn-outline-primary">Append</button>
            </span>
            </form>
            `;

            taskName.querySelector('button').addEventListener('click', (e) => {
                e.preventDefault();
                for (let i of item) {
                    if (i.time == nodeP.dataset.time) {
                        i.name = taskName.querySelector('input').value;
                        taskName.innerHTML = `${i.name}`;
                        setLs(item);
                    }
                }
            });
        });

        //Regist click event of Edit icon
        node = nodeP.querySelector('.bi-file-x');
        node.addEventListener('click', (e) => {
            if (!String(nodeP.dataset.state).includes("delete")) {
                nodeP.querySelector('.check-box').classList.add("show");
                //Yes
                nodeP.querySelector('.yes').addEventListener('click',(e)=>{
                    nodeP.dataset.state += "," + states[2];
                    for (let i of item) {
                        if (i.time == nodeP.dataset.time) {
                            i.state = (nodeP.dataset.state).trim()
                        }
                    }
                    nodeP.querySelector('.check-box').classList.add("delete")
                    setLs(item)
                    setTimeout(setitem,500);
                });
                //No
                nodeP.querySelector('.no').addEventListener('click',(e)=>{
                    nodeP.querySelector('.check-box').classList.remove("show");
                });
                
            }
            else {
                nodeP.dataset.state = String(nodeP.dataset.state).replace(",delete", "");
                for (let i of item) {
                    if (i.time == nodeP.dataset.time) {
                        i.state = (nodeP.dataset.state).trim()
                    }
                }
                console.log("Hi",nodeP.dataset.state)
                nodeP.querySelector('.check-box').classList.add("delete")
                setLs(item);
                setTimeout(setitem,500);
            }
            
        });
        for (let i of item) {
            if (i.time == nodeP.dataset.time) {
                renderDelete(node, i.state)
            }
        }

    }


}



document.addEventListener('DOMContentLoaded', () => {
    setitem();
    //Regist Tab click event
    for (let i of navlink) {

        i.addEventListener('click', (e) => {
            console.clear();
            for (let j = 0; j < navlink.length; j++) {
                navlink[j].classList.remove('active');
            }
            tabStates = i.parentNode.dataset.type;
            console.log("tabStates : ", tabStates);

            i.classList.add('active');
            setitem();
        });

    }
    //register add submit event
    form.addEventListener('submit', (e) => {

        store = (getLs() == null) ? [] : getLs();
        e.preventDefault();
        let inputText = document.getElementById('inputText').value.trim()
        document.getElementById('inputText').value = "";
        if (inputText.length == 0) {
            alert('Please input task');
        } 
        else {

            const item = {
                name: inputText,
                state: states[0],
                time: new Date().getTime()
            }
            store.push(item);
            setLs(store);
        }
        setitem();
    });

});