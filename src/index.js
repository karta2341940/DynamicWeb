let states = [false, 'edit', 'delete'];
let tabStates = document.querySelector('.nav-link.active').parentNode.dataset.type;

let store = [];
let setLS = (item) => {
    if (item.length > 0)
        localStorage.setItem("item-all", JSON.stringify(item));
    else console.log("this data is null");
}

let getLs = () => {
    let rtn = (JSON.parse(localStorage.getItem("item-all")) == null) ? [] : JSON.parse(localStorage.getItem("item-all"));
    rtn = rtn.sort((a, b) => {
        //<0 => ba
        //>0 => ab
        return a.time - b.time;
    });
    for (let i of rtn)
        console.log("i", i);
    return rtn;
}
let clearLs = () => {
    store = [];
    localStorage.removeItem("item-all");
    setitem(getLs());
}


let listitem = document.querySelector('.list-group');


let setitem = (item) => {
    listitem.innerHTML = "";
    //console.log("item", item);

    let litag = "";


    //render item
    for (let val of item) {
        litag = `<li class="list-group-item d-flex justify-content-between align-items-center task-item" data-time="${val.time}" data-state="${val.state}">
        <span class="task">${val.name}</span>
        <span class="task-item">
        <a href="javascript:void(0)" data-action = "check"><i class="icon-get icon-green bi bi-bookmark-check"></i></a>
        <a href="javascript:void(0)" data-action = "edit"><i class="icon-get icon-gray bi bi-pen"></i></a>
        <a href="javascript:void(0)" data-action = "delete"><i class="icon-get icon-red bi bi-file-x"></i></a>
        </span>
        </li>`;
        listitem.insertAdjacentHTML("beforeend", litag)
    }

    let iconCheck = document.querySelectorAll(".bi-bookmark-check");
    //register icon click event
    for (let i of iconCheck) {

        i.addEventListener('click', (e) => {
            e.preventDefault();
            let Checked = i.parentElement.parentElement.parentElement;
            let thisEle;
            for (let j of item) {
                if (j.time == Checked.dataset.time) {
                    thisEle = j;
                }
            }
            if (!thisEle.state) {
                i.classList.remove("bi-bookmark-check");
                i.classList.add("bi-bookmark-check-fill");
                thisEle.state = !thisEle.state;
            }
            else if (thisEle.state) {
                i.classList.remove("bi-bookmark-check-fill");
                i.classList.add("bi-bookmark-check");
                thisEle.state = !thisEle.state;
            }
            setLS(item);
        });
    }

    item.forEach((element, index) => {
        if (element.state) {
            iconCheck[index].classList.remove("bi-bookmark-check");
            iconCheck[index].classList.add("bi-bookmark-check-fill");
        }
    });


    setLS(item);

}


let form = document.getElementsByTagName('form')[0];
let navlink = document.getElementsByClassName('nav-link');

document.addEventListener('DOMContentLoaded', () => {
    setitem(getLs());

    //註冊tab的點擊事件
    for (let i of navlink) {

        i.addEventListener('click', (e) => {

            for (let j = 0; j < navlink.length; j++) {
                navlink[j].classList.remove('active');
            }
            tabStates = i.parentNode.dataset.type;


            i.classList.add('active');
            setitem(getLs())
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
    });
    //console.log(getLs());

});