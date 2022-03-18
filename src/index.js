let navlink = document.getElementsByClassName('nav-link');
console.log("navlink.length:", navlink.length);
for (let i = 0; i < navlink.length; i++) {
    navlink[i].addEventListener('click', (e) => {
        for (let i = 0; i < navlink.length; i++) {
            navlink[i].classList.remove('active');
        }
        navlink[i].classList.add('active');
        //this.classList.add('active');
    });
}
let states =[false,'edit','delete'];
let store = [];
let setLS = (item) => {
    if (item.length > 0)
        localStorage.setItem("item-all", JSON.stringify(item));
    else console.log("this data is null");
}

let getLs = () => {
    return (JSON.parse( localStorage.getItem("item-all")  ) == null )? [] : JSON.parse( localStorage.getItem("item-all")) 
}
let clearLs = () => {
    store = [];
    localStorage.removeItem("item-all");
    setitem(getLs());
}


let listitem = document.querySelector('.list-group');
let iconGet;



let setitem = (item) => {
    listitem.innerHTML = "";
    console.log("item", item);

    for (let val in item) {
        console.log("Name:", item[val].name);

        let litag = `<li class="list-group-item d-flex justify-content-between align-items-center task-item" data-time="${item[val].time}" data-state="${item[val].state}">
        <span class="task">${item[val].name}</span>
        <span class="task-item">
        <a href="javascript:void(0)" data-check><i class="icon-get icon-green bi bi-bookmark-check"></i></a>
        <a href="javascript:void(0)" data-edit><i class="icon-get icon-gray bi bi-pen"></i></a>
        <a href="javascript:void(0)" data-delete><i class="icon-get icon-red bi bi-file-x"></i></a>
        </span>
        </li>`
        listitem.insertAdjacentHTML("beforeend", litag)
    }
    let iconCheck = document.querySelectorAll(".bi-bookmark-check");
    item.forEach((element,index) => {
        if(element.state){
            iconCheck[index].classList.remove("bi-bookmark-check");
            iconCheck[index].classList.add("bi-bookmark-check-fill");
        }
    });
    for (let i of iconCheck) {
        
        i.addEventListener('click', (e) => {
            e.preventDefault();
            let Checked = i.parentElement.parentElement.parentElement;
            let thisEle;
            for (let j of item) {
                if (j.time == Checked.dataset.time) {
                    thisEle=j;
                }
            }
            if (!thisEle.state) {
                i.classList.remove("bi-bookmark-check");
                i.classList.add("bi-bookmark-check-fill");
                thisEle.state = !thisEle.state;
            }
            else if(thisEle.state){
                i.classList.remove("bi-bookmark-check-fill");
                i.classList.add("bi-bookmark-check");
                thisEle.state = !thisEle.state;
            }
             
            setLS(item);
        });
    }

}

let form = document.getElementsByTagName('form')[0];

document.addEventListener('DOMContentLoaded', () => {

    setitem(getLs());
    form.addEventListener('submit', (e) => {

        store = (getLs() == null) ? [] : getLs();
        e.preventDefault();
        let inputText = document.getElementById('inputText').value.trim()
        document.getElementById('inputText').value = "";
        if (inputText.length == 0) {
            alert('Please input task');
        } else {
            const item = {
                name: inputText,
                state: states[0],
                time: new Date().getTime()
            }
            store.push(item);
            setLS(store);
        }
        setitem(getLs());
        console.log(getLs());
    });
});