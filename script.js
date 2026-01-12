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
dataDisplay.append(orderedList);
let data=null;

const STATE={
    IDLE : 'idle' ,
    LOADING : 'loading',
    SUCCESS: 'success',
    ERROR : 'error'
}


function setState(currentState,message=""){
    status.innerText=message || currentState.toUpperCase();
    status.className=`status ${currentState}`

    fetchButton.disabled=(status.className===STATE.LOADING)

}

setState(STATE.IDLE);

async function fetchData(e){
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
        createList(data?.products);
        setState(STATE.SUCCESS);
        setTimeout(()=>setState(STATE.IDLE),3000);
        console.log(data);
        return null;
    }
catch(e){
    if(e instanceof SyntaxError){
        console.log('json parse failed : Malformed JSON',e)  //handled malformed JSON
    }
    else{
        console.log(e.message,e);
    }
    setState(STATE.ERROR);

}
}

function createList(data){

    orderedList.replaceChildren();

    if(!data) return; 

    for(i of data){
        const listIndex=document.createElement('li');
        listIndex.innerText=i?.title ?? 'Unknown Product';  //handled validation without any libraries
        fragment.append(listIndex);
    }

    orderedList.append(fragment);

    return;

}

fetchButton.addEventListener('click',fetchData)

/*---------------------------------------------------------------------------------------------------------------------------------------*/

const cards=document.querySelectorAll('.card');
const cardContainer=document.querySelector('.cards-wrapper')

const options={
    threshold:1,
    rootMargin:'0px'
}

const observerCallback=(entries,observer)=>
{
    entries.forEach((entry)=>
    {
        entry.target.classList.toggle("show",entry.isIntersecting)
        // if(entry.isIntersecting) observer.unobserve(entry.target)
    })
}



function loadNewCards(){

    for(let i=0;i<6;i++){
        const div=document.createElement('div');
        div.textContent="Normal Card"
        div.classList.add('card')
        observer.observe(div)
        cardContainer.append(div)
    }
    
}

const lastCardObserverCallback=(entries,observer)=>
{
    const entry=entries[0];
    if(!entry.isIntersecting) return;
    // loadNewCards()
    observer.unobserve(entry.target)
    observer.observe(document.querySelector('.card:last-child'))
}



const observer=new IntersectionObserver(observerCallback,options)

const lastCardObserver=new IntersectionObserver(lastCardObserverCallback)



cards.forEach((card)=>{
    observer.observe(card)
})

lastCardObserver.observe(document.querySelector('.card:last-child'))

/*---------------------------------------------------------------------------------------------------------------------------------------*/

const header=document.querySelector('header')

let lastScrollY=window.scrollY;


function modifyHeader(){
    
    const currentScrollY=window.scrollY;

    //prevent rubber banding
    if(currentScrollY<=0){
        header.classList.remove("hide")
        return;
    }

    if(currentScrollY>lastScrollY){
        header.classList.add("hide")
    }
    else if(currentScrollY<lastScrollY){
        header.classList.remove("hide")
    }

    lastScrollY=currentScrollY;

}



window.addEventListener('scroll',modifyHeader,{passive:true})

/*---------------------------------------------------------------------------------------------------------------------------------------*/

const tracks=document.querySelectorAll('.marquee-track')

tracks.forEach((track)=>
{
    const items=Array.from(track.children);

    items.forEach((item)=>
    {
        const duplicate=item.cloneNode(true);
        duplicate.setAttribute('aria-hidden',true)
        track.append(duplicate)
    })
})

/*---------------------------------------------------------------------------------------------------------------------------------------*/

const accordionHeaders=document.querySelectorAll('.accordion-header')

function updateAccordion(){
    const currentItem=this.parentElement;
    const currentContent=this.nextElementSibling;
    const currentHeader=this;


    const isOpen=currentHeader.classList.contains('active')

    accordionHeaders.forEach((everyHeader)=>
    {
        everyHeader.classList.remove('active')
        everyHeader.nextElementSibling.style.maxHeight=`0px`
        const icon=everyHeader.querySelector('.icon')
        icon.classList.remove('fa-minus')
        icon.classList.add('fa-plus')
        icon.style.transform="rotate(0deg)"


    })

    if(!isOpen){
        currentHeader.classList.add('active')

        const accordionHeight=currentContent.scrollHeight;
        console.log(accordionHeight)

        currentContent.style.maxHeight=`${accordionHeight}px`

        const icon=currentHeader.querySelector('.icon')
        console.log({icon})

        icon.classList.remove('fa-plus')
        icon.classList.add('fa-minus')
        icon.style.transform="rotate(180deg)"


    }

}

accordionHeaders.forEach((header)=>
{
    header.addEventListener('click',updateAccordion);
})