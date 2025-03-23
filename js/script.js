const jsonFile = 'data.json';
const sectionItems = document.querySelector('.section-items');
const btnClear = document.getElementById('btn-clear');
let counterLanguages = 0;
let counterTools = 0;

const bar = document.querySelector('.bar__tablets');
let barArr = [];


let filters = {
    role : [],
    level : [],
    tools : [],
    languages : []
}

let counter = 0;

const getItems = ()=> {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        
        reset();

        if(counter == 0){
            showItems(data);
        }else{
            let newArr = [];
                data.forEach(item => {
                    let matches = 0;
                    if(item.role == filters.role){
                        matches++;
                    }

                    if(item.level == filters.level){
                        matches++;
                    }

                    filters.tools.forEach(element => {
                        if(item.tools.includes(element)){
                            matches++;
                        }
                    })

                    filters.languages.forEach(element => {
                        if(item.languages.includes(element)){
                            matches++;
                        }
                    })

                    if(matches == counter){
                        newArr.push(item)
                    }

                })
            
                
        
            let set = new Set([...newArr]);
            const array = [...set];
            showItems(array)
            console.log("El newArr: ")
            console.log(newArr)
        }

        
    })
}


const showItems = (arr)=> {
    arr.forEach(item => {
        sectionItems.insertAdjacentHTML('beforeend',`
            <div class='item'>
                <div class='item__left'>
                    <div class='item__left__img'>
                        <img src='${item.logo}' />
                    </div>

                    <div class='item__left__company'>
                        <div class='company-title'>
                            <p class='company'>${item.company}</p>
                            ${(item.new) ? `<div class='pill new'>NEW!</div>` : ''}
                            ${(item.featured) ? `<div class='pill featured'>FEATURED</div>` : ''}
                        </div>
                        <p class='position'>${item.position}</p>
                        <div class='item__left__company__info'>
                            <p>${item.postedAt}</p>
                            <div class='dot'></div>
                            <p>${item.contract}</p>
                            <div class='dot'></div>
                            <p>${item.location}</p>
                        </div>
                    </div>
                </div>

                <div class='item__right'>
                    <div class='skills role'>${item.role}</div>
                    <div class='skills level'>${item.level}</div>
                    <div class='tools'></div>
                    <div class='languages'>
                    
                    </div>
                </div>
            </div>            
        `)
        getTools(item.tools)
        getLanguages(item.languages);
    })

    colorBorders()

    let skills = document.querySelectorAll('.skills');
    let roles = document.querySelectorAll('.role');
    let levels = document.querySelectorAll('.level');
    let tools = document.querySelectorAll('.tool');
    let languages = document.querySelectorAll('.language');

    /*for(let skill of skills){
        skill.addEventListener('click',()=>{
            filter(skill.textContent)
        })
    }
*/
    for(let role of roles){
        role.addEventListener('click',()=> {
           
            if(filters.role != role.textContent){
                filters.role = [];
                filters.role.push(role.textContent)
                counter++;
                filter(role.textContent)
                getItems()
                
            }
        })
    }

    for(let level of levels){
        level.addEventListener('click',()=> {
            
            if(filters.level != level.textContent){
                filters.level = [];
                filters.level.push(level.textContent)
                counter++;
                filter(level.textContent)
                getItems()
                
            }
                
        })
    }

    for(let tool of tools){
        tool.addEventListener('click',()=> {
            let actualTool = tool.textContent;
            if(!filters.tools.includes(actualTool)){
                filters.tools.push(actualTool);
                counter++;
                filter(actualTool)
                getItems()
                
            }
        })
    }

    for(let language of languages){
        language.addEventListener('click', ()=> {
            let actualLanguage = language.textContent;
            if(!filters.languages.includes(actualLanguage)){
                filters.languages.push(actualLanguage)
                counter++;
                filter(actualLanguage)
                getItems()
            }
        })
    }

}

const getTools = (tools)=>{
    for(let i of tools){
        const toolsContainer = document.querySelectorAll('.tools')[counterTools];
        const div = document.createElement('div');
        div.textContent = i;
        div.className='skills tool';
        toolsContainer.appendChild(div)
    }
    counterTools++;
}

const getLanguages = (languages)=>{
    for(let i of languages){
        const languagesDiv = document.querySelectorAll('.languages')[counterLanguages];
        const div = document.createElement('div');
        div.textContent = i;
        div.className='skills language'
        languagesDiv.appendChild(div)
    }

    counterLanguages++;
    
}

const filter = (skill)=> {
  if(!barArr.includes(skill)){
    barArr.push(skill);
    isEmpty()
    addTabletToBar();
  }
}

const addTabletToBar = ()=>{
    bar.innerHTML = '';
    for(tablet of barArr){
        bar.insertAdjacentHTML('beforeend',`
            <div class='tablet'>
                <div class='tablet__left'>${tablet}</div>
                <div class='remove'>
                    
                </div>
            </div>
        `)
    }

    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click',(e)=> {
            let tablet = e.target.parentNode;
            let finalText = tablet.textContent.trim();
            tablet.remove()
            barArr.forEach((element,index) => {
                if(element == finalText){
                    barArr.splice(index,1)
                    counter--;
                    if(filters.role == finalText){
                        filters.role.pop();
                    }
                    if(filters.level == finalText){
                        filters.level.pop()
                    }

                    filters.tools.forEach((tool,index) => {
                        if(tool == finalText){
                            filters.tools.splice(index,1)
                        }
                    })

                    filters.languages.forEach((language,index) => {
                        if(language == finalText){
                            filters.languages.splice(index,1)
                        }
                    })

                    getItems()
                    isEmpty()
                }
            })
            
        })
    })
}

const reset = ()=> {
    sectionItems.innerHTML = '';
    counterLanguages = 0;
    counterTools = 0;
}

const colorBorders = ()=> {
    let items = document.querySelectorAll('.featured')
    items.forEach(i => {
        i.parentElement.parentElement.parentElement.parentElement.style.borderLeft='5px solid var(--desaturatedDarkCyan)'
    })
}

btnClear.addEventListener('click',()=> {
    counter = 0;
    bar.innerHTML='';
    barArr = [];
    filters = {
        role : [],
        level : [],
        tools : [],
        languages : []
    }
    getItems()
    isEmpty()
})

const isEmpty = ()=> {
    if(barArr.length == 0){
        document.querySelector('.bar').style.display='none';
    }else{
        document.querySelector('.bar').style.display='flex';
    }
}


getItems();

console.log(filters)
