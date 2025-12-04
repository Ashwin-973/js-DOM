

const button=document.querySelector('.modal-button');
const modal=document.querySelector('.modal');
let isOpen=false;


const toggleModal=()=>{
    isOpen=!isOpen
    if(isOpen){
        modal.style.display='flex';
        modal.style.flexDirection='column';
        button.textContent='Close Modal';
    }
    else{
        modal.style.display='none';
        button.textContent='Open Modal';
    }
    

}


button.addEventListener('click',toggleModal);