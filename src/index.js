let navlink = document.getElementsByClassName('nav-link');
console.log("navlink.length:",navlink.length);
for (let i = 0; i < navlink.length; i++) {
    navlink[i].addEventListener('click', (e) => {
        for (let i = 0; i < navlink.length; i++) {
            navlink[i].classList.remove('active');
        }
        navlink[i].classList.add('active');
        //this.classList.add('active');
    });
}

let store=[];
let setLS = (item)=>{
    if(item.length > 0 )
    localStorage.setItem("itemLocal",JSON.stringify(item));
    else console.log("this data is null");
}

let getLs = ()=>{
    return JSON.parse(localStorage.getItem("itemLocal"));
}
let clearLs = ()=>{
    store =[];
    localStorage.removeItem("itemLocal");
}


let listitem = document.querySelector('.list-group');


let setitem = (item)=>{
    listitem.innerHTML="";
    console.log("item",item);

    for(let val in item){
        console.log("Name:",item[val].name);
        
        let litag=`<li class="list-group-item d-flex justify-content-between align-items-center task-item">
        <span class="task">${item[val].name}</span>
        <span class="task-item">
        <a href="#"><i class="icon-get icon-green bi bi-bookmark-check"></i></a>
        <a href="#"><i class="icon-get icon-gray bi bi-pen"></i></a>
        <a href="#"><i class="icon-get icon-red bi bi-file-x"></i></a>
        </span>
        </li>`
        listitem.insertAdjacentHTML("beforeend",litag)
    }
    
    
}

let form = document.getElementsByTagName('form')[0];

document.addEventListener('DOMContentLoaded', () => {
    
    setitem(getLs());
    form.addEventListener('submit', (e) => {
        store=getLs();
        e.preventDefault();
        let inputText = document.getElementById('inputText').value.trim()
        if (inputText.length == 0) {
            alert('Please input task')
        }
        else { 
            const item={
                name:inputText,
                isDone:false,
                time: new Date().getTime()
            }
            store.push(item);
            setLS(store);
        }
        setitem(getLs());
        console.log(getLs());
    });
});