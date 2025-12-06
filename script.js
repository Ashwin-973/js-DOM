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

document.addEventListener('keydown',(e)=>
{
    if(e.key='Escape' && isOpen){
        toggleModal();
    }
})

/*---------------------------------------------------------------------------------------------------------------------------------------*/
const orderedList=document.createElement('ol');
const dataDisplay=document.getElementById('display-data');
let status=document.querySelector('.status');
const fragment=new DocumentFragment();

const fetchButton=document.querySelector('.fetch-button');
let data=null;

const STATE={
    IDLE : 'idle' ,
    LOADING : 'loading',
    SUCCESS: 'success',
    ERROR : 'error'
}

let currentState=STATE.IDLE;

function setState(currentState,message={}){
    currentState=currentState;

    switch(currentState){
        case 'idle':
            status.innerText='IDLE';
            status.className=`status ${currentState}`;
            break;
        case 'loading':
            status.innerText='LOADING';
            status.className=`status ${currentState}`;
            break;
        case 'success':
            status.innerText='SUCCESS';
            status.className=`status ${currentState}`;
            break;
        case 'error':
            status.innerText='ERROR';
            status.className=`status ${currentState}`;
            break;
        default :
            status.innerText='IDLE';
            status.className=`status idle`;
            break;

    }
}

async function fetchData(e){
    setState(STATE.IDLE);
    try{
        setState(STATE.LOADING);
        let response= await fetch('https://dummyjson.com/products?limit=10');
        if(!response.ok){
            throw new Error(`received invalid status code : ${response.status}`)
        }
        data=await response.json(); 
        if(!data){
            setState(STATE.ERROR);
        }
        setState(STATE.SUCCESS);
        console.log(data);
        return null;
    }
catch(e){
    setState(STATE.ERROR);
    if(e instanceof SyntaxError){
        console.log('json parse failed : Malformed JSON',e)  //handled malformed JSON
    }
    else{
        console.log(e.message,e);
    }

}finally{
    setTimeout(()=>setState(STATE.IDLE),3000);
    createList(data?.products);
}
}

function createList(data){

    if(!data) return; 

    dataDisplay.append(orderedList);

    for(i of data){
        const listIndex=document.createElement('li');
        listIndex.innerText=i?.title ?? 'Unknown Product';  //handled validation without any libraries
        fragment.append(listIndex);
    }

    orderedList.append(fragment);

    return;

}




fetchButton.addEventListener('click',fetchData)