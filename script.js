

const button=document.querySelector('.modal-button');
const modal=document.querySelector('.modal');
const close=document.querySelector('.close');
const modalContainer=document.querySelector('.modal-container')
let isOpen=false;


const toggleModal=(e)=>{
    isOpen=!isOpen
    if(isOpen){
        modalContainer.style.display='flex';
        modalContainer.style.flexDirection='column';
        button.textContent='Close Modal';
    }
    else{
        modalContainer.style.display='none';
        button.textContent='Open Modal';
    }
    

}


button.addEventListener('click',toggleModal);
close.addEventListener('click',(e)=>
{
    if(!isOpen) return;
    toggleModal();
})

// close modal when clicking on the overlay background (not the modal itself)
modalContainer.addEventListener('click',(e)=>{
    if(e.target === modalContainer){
        toggleModal();
    }
})