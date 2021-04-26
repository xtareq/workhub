


function updateTaskStatus(ev,taskId,projectId){
    fetch('/tasks/update/'+taskId,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            status:ev.target.value
        })
    }).then((r)=>{
        window.location.href = "/projects/"+projectId+"/tasks?status="+ev.target.value
    })
   
}

let drawerDoc = document.querySelector("#drawer");
let drawerMask = document.querySelector("#drawerMask");
drawerMask.addEventListener("click",function(){
    toggleDrawer()
})
function toggleDrawer(){
    const show = drawerDoc.classList.contains("show")
    drawerMask.style.width= show?"100vw":"0"
    drawerMask.style.opacity =show?"0.6":"0"
    drawerDoc.style.width=show?"20vw":"0"
    drawerDoc.style.paddingLeft=show?"10px":"0"
    show?drawerDoc.classList.remove("show"):drawerDoc.classList.add("show")
}




const button = document.querySelector('.modal-button')
button.addEventListener('click', toggleModal)

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)


function toggleModal () {
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
}