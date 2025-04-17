const inputTask = document.querySelectorAll('.taskInput')
const checkBoxs = document.querySelectorAll('.check-box')
const inputs = document.querySelectorAll('input')
const progressBar = document.querySelector(".bar")
const barValue = document.querySelector(".progress-value")
const allTasks = JSON.parse(localStorage.getItem('allTasks')) || {
    first : {
        name: "",
        isCompleted : false
    },
    second : {
        name: "",
        isCompleted : false
    },
    third : {
        name: "",
        isCompleted : false
    }
}

let checkedTasks = Object.values(allTasks).filter((tasks)=>tasks.isCompleted).length
barValue.style.width = `${checkedTasks/3 *100}%`
barValue.innerHTML = `<span>${checkedTasks}/3 Completed</span>`
const Quotes = ["Raise the bar by completing your goals!","Well Begin is Hard done","Just a step away, keep going!","Whow! You just completed all Goals , Time for Chill :D"]

/*
let isChecked = false
checkBoxs.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(inputs[0].value.length>0 && inputs[1].value.length>0 && inputs[2].value.length>0){
            isChecked = true;
            box.parentElement.classList.toggle('completed')
        }
        else{
            document.querySelector('.error').classList.remove('hidden')
        }
    })
}) 
*/

barValue.style.width = localStorage.getItem('width')+"%"

let isChecked = false
checkBoxs.forEach((box)=>{
    box.addEventListener('click',()=>{
        const isAllFilled = [...inputs].every((input)=>{
            return input.value
        })
        if(isAllFilled){
            box.parentElement.classList.toggle('completed')
            isChecked = true

            const inputID = box.nextSibling
            allTasks[inputID.id].isCompleted = !allTasks[inputID.id].isCompleted

            //progress bar
            checkedTasks = Object.values(allTasks).filter((tasks)=>tasks.isCompleted).length
            barValue.style.width = `${checkedTasks/3 *100}%`
            barValue.innerHTML = `<span>${checkedTasks}/3 Completed</span>`
            progressBar.previousElementSibling.innerText = Quotes[checkedTasks]

            localStorage.setItem("allTasks",JSON.stringify(allTasks))
        }
        else document.querySelector('.error').classList.remove('hidden')
    })
})



inputs.forEach((input)=>{

    // fatching input data from local storage
    input.value = allTasks[input.id].name
    if(allTasks[input.id].isCompleted) input.parentElement.classList.toggle('completed')

    input.addEventListener('input',(e)=>{
        document.querySelector('.error').classList.add('hidden')

        // agar check hone k baad koi input field null ho jaye to error show hoga and completed class remove hogi
        if(e.target.value.length == 0 && checkedTasks){
            Object.values(allTasks).forEach((task)=>{
                task.isCompleted = false
                barValue.style.width = 0
                checkedTasks = 0
                progressBar.previousElementSibling.innerText = Quotes[checkedTasks]
            })

            inputTask.forEach((task)=>{
                document.querySelector('.error').classList.remove('hidden')
                task.classList.remove('completed')
            })
        }


        if(allTasks[input.id].isCompleted){
            input.value = allTasks[input.id].name
            return
        }

        allTasks[input.id] = {
            name : input.value,
        }
        localStorage.setItem("allTasks",JSON.stringify(allTasks))

    })

    input.addEventListener('focus',()=>{
        document.querySelector('.error').classList.add('hidden')
    })
})

