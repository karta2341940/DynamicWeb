let navlink = document.getElementsByClassName('nav-link');
console.log(navlink.length);
for (let i = 0; i < navlink.length; i++) {
    navlink[i].addEventListener('click', (e) => {
        for (let i = 0; i < navlink.length; i++) {
            navlink[i].classList.remove('active');
        }
        navlink[i].classList.add('active');
        //this.classList.add('active');
    });
}


let form = document.getElementsByTagName('form')[0];

document.addEventListener('DOMContentLoaded', () => {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        ds = document.getElementById('inputText').value.trim()
        if (ds.length == 0) {
            alert('Please input task')
        }
        else { 
            const item={
                name:ds,
                isDone:false,
                time: new Date()
            }
        }
        console.log(item);
    });
});