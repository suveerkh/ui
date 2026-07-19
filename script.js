/* =====================================
   UI Library
   Main JavaScript
===================================== */


const components = [

    {
        name: "Radial Menu",
        category: "Navigation",
        file: "components/radial-menu.html"
    },

    {
        name: "Liquid Cursor",
        category: "Cursor Effects",
        file: "components/liquid-cursor.html"
    },

    {
        name: "Gravity Field",
        category: "Cursor Effects",
        file: "components/gravity-field.html"
    },

    {
        name: "Glass Card",
        category: "Cards",
        file: "components/glass-card.html"
    }

];



let currentSource = "";



const componentList =
document.getElementById("component-list");

const search =
document.getElementById("search");

const preview =
document.getElementById("preview-frame");

const sourceCode =
document.getElementById("source-code");

const componentName =
document.getElementById("component-name");

const fileName =
document.getElementById("file-name");

const copyButton =
document.getElementById("copy-button");

const toast =
document.getElementById("toast");





/* ===============================
Generate Sidebar
================================ */


function renderComponents(items){


    if(!componentList) return;


    componentList.innerHTML="";


    const categories={};


    items.forEach(component=>{


        if(!categories[component.category]){

            categories[component.category]=[];

        }


        categories[component.category].push(component);


    });



    Object.keys(categories).forEach(category=>{


        const wrapper=document.createElement("div");

        wrapper.className="category";


        wrapper.innerHTML=`

        <div class="category-title">
            ${category}
        </div>

        `;



        categories[category].forEach(component=>{


            const button=document.createElement("button");


            button.className="component-item";


            button.textContent=component.name;



            button.onclick=()=>{


                loadComponent(component,button);


            };


            wrapper.appendChild(button);


        });


        componentList.appendChild(wrapper);



    });



}





/* ===============================
Load Component
================================ */


async function loadComponent(component,button){


    document
    .querySelectorAll(".component-item")
    .forEach(btn=>{

        btn.classList.remove("active");

    });



    if(button){

        button.classList.add("active");

    }



    componentName.textContent=
    component.name;


    fileName.textContent=
    component.file;



    preview.src=
    component.file;



    try{


        const response=
        await fetch(component.file);


        const code=
        await response.text();


        currentSource=code;


        sourceCode.textContent=code;



    }

    catch(error){


        sourceCode.textContent=
        "Unable to load source.";


    }



}





/* ===============================
Search
================================ */


if(search){


search.addEventListener(
"input",
()=>{


    const value=
    search.value.toLowerCase();



    const filtered=
    components.filter(component=>{


        return (

            component.name
            .toLowerCase()
            .includes(value)

            ||

            component.category
            .toLowerCase()
            .includes(value)

        );


    });



    renderComponents(filtered);



});



}





/* ===============================
Copy Source
================================ */


if(copyButton){


copyButton.onclick=async()=>{


    if(!currentSource)
    return;



    await navigator
    .clipboard
    .writeText(currentSource);



    showToast();



};



}





/* ===============================
Toast
================================ */


function showToast(){


    toast.classList.add("show");


    setTimeout(()=>{


        toast.classList.remove("show");


    },1500);



}





/* ===============================
Keyboard Shortcut
================================ */


document.addEventListener(
"keydown",
(event)=>{


    if(event.key==="/"
    && search){


        event.preventDefault();

        search.focus();


    }



});





/* ===============================
Initial Load
================================ */


if(componentList){


    renderComponents(components);



    setTimeout(()=>{


        const first =
        document.querySelector(
        ".component-item"
        );


        if(first){

            first.click();

        }


    },100);



}