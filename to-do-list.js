const h5= document.querySelector('h5')
const filltask = document.querySelector('.filltask')
const taskButton= document.querySelector('.icons')
const form = document.querySelector('form')
const task = document.forms[0].elements[0]
const date = document.forms[0].elements[1]
const time = document.forms[0].elements[2]
const cleanButton = document.getElementById('clean')
const addButton = document.getElementById('add')
const mainSection= document.querySelector('div.main')
const body= document.querySelector('body')
let pending= document.querySelector('span#pending-value')
let completed= document.querySelector('span#completed-value')
let total= document.querySelector('span#total-value')
//const taskBar = document.querySelectorAll('div.task-bar')


document.addEventListener('click', (e)=>{
    const onTaskButton = e.target.matches('.icon')
    if (!onTaskButton && e.target.closest('[data-task]') != null) 
    return

    let currentOption
    if ((onTaskButton && task.value.length==0 && date.value.length==0 && time.value.length==0) ||
        (onTaskButton && e.target.closest('.taskstatus'))){
        currentOption= e.target.closest('[data-task]')
        if (task.value.length<=0){currentOption.classList.toggle('active')}
    } else if (onTaskButton &&(task.value.length>0||date.value.length>0||time.value.length>0))
    {vibrateThings(cleanButton)
    return}
    

    document.querySelectorAll('[data-task].active').forEach(active=>{
        if (active === currentOption) return

        if (active && task.value.length>0 )
            {vibrateThings(cleanButton)
            return} 

        active.classList.remove('active')
    })
    
})

const formSpan= document.getElementById('error') 
total.innerText=0
completed.innerText=0
pending.innerText=0


form.addEventListener('submit',(e)=> {
    e.preventDefault()
    formSpan.innerText=''

    const taskValue= task.value
    const dateValue= date.value
    const timeValue=time.value
    const taskBar = document.querySelectorAll('div.task-bar')
    
    

    let error= []
    let d =new Date(date.value+ ' ' +time.value)

    // const timer =()=>{
    //     let n = new Date()
    //     const timeleft =d.getTime() - n.getTime()
        
    //     const seconds = 1000;
    //     const minutes = seconds*60 ;
    //     const hours = minutes* 60;
    //     const days = hours *24; 
    
    //     const day =Math.floor(timeleft/days)
    //     const hour =Math.floor((timeleft%days)/hours)
    //     const minute =Math.floor((timeleft%hours)/minutes)
    //     const second =Math.floor((timeleft%minutes)/seconds);
        
    //     const spanner= document.createElement('span')
    //     spanner.innerText=  `${day} :${hour} :${minute} :${second}`
    //     return spanner.innerText
    // }
    //  <span id="timer"><i>timeleft: </i>${timer()}</span>
    
    const timeFormat = d.toLocaleTimeString('en-GB',{
        hour:'numeric',
        minute:'numeric',
        hour12:true
    })

    if (taskBar.length>9){
        error.push(`You've reached the '10' limit, please complete pending tasks`)
        vibrateThings(formSpan)
        formSpan.innerText=error
        return
    }

    if (task.value.length>0&&date.value.length>0){
    const div= document.createElement('div')
    mainSection.append(div)
    div.setAttribute('class','task-bar')
    div.innerHTML= 
    `<p class="tick">Check</p>
    <div class="task">
        <h4>${taskValue}</h4>
        <div class="spans">
            <span id="date">${d.toGMTString()}</span>
            <span id="time">${timeFormat}</span>
        </div>
    </div>
    <p class="clear">Clear</p>`

        taskBarLength= document.querySelectorAll('div.task-bar').length
        total.innerText=taskBarLength
        pending.innerText=taskBarLength-completed.innerText
    
        document.querySelectorAll('input#tick').forEach(box=>{
        box.addEventListener('click',e=>{
           let tickedTask=  e.target.closest('div.task-bar')
           tickedTask.classList.toggle('ticked')
         
        })
    })
    
    form.reset()
    filltask.classList.remove('active')
    mainSection.lastChild.scrollIntoView(false)
    return
    }
    else error.push(`task and date are required`)
         vibrateThings(formSpan)
         formSpan.innerText=error
         return
})


function vibrateThings(element){
    let interval= setInterval(()=>{
        element.classList.toggle('vibrator')
    },100)
    setTimeout(()=>clearInterval(interval),600) 
}

mainSection.addEventListener('click', e=>{
    
    const onClearbutton= e.target.matches('.clear')
    const onCheckbutton= e.target.matches('.tick')
    let clearTaskbar
    let checkTaskbar
    if (onClearbutton){
        clearTaskbar = e.target.closest('div.task-bar')
        mainSection.removeChild(clearTaskbar)
        let taskBarLength = document.querySelectorAll('div.task-bar').length
        let tickedtotal= document.querySelectorAll('div.ticked').length
        total.innerText= taskBarLength
        completed.innerText= tickedtotal
        pending.innerText=taskBarLength-completed.innerText
        form.reset()
        
    }
    if (onCheckbutton){
        checkTaskbar = e.target.closest('div.task-bar')
        checkTaskbar.classList.toggle('ticked')
        let taskBarLength = document.querySelectorAll('div.task-bar').length
        let tickedtotal= document.querySelectorAll('div.ticked').length
        completed.innerText= tickedtotal
        pending.innerText= taskBarLength - tickedtotal
      
    }
    return
})


    