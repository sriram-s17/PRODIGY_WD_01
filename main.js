const header = document.querySelector("header");
const pagetitle = document.querySelector("header h1");
const nav = document.querySelector("nav");
const navlinklist = document.querySelectorAll("nav a");
const menuicon = document.querySelector(".menuicon");
const menuicondiv = document.querySelector(".menuicon div");
const headerspace = document.querySelector("#headerspace");
const sections = document.querySelectorAll("main section");

//setting headerheight to headerspace for covering header in background
let headerheight = header.offsetHeight;
headerspace.style.height = headerheight+"px";

//handles moving to respective section when we click the link in navigation menu
navlinklist.forEach(function(a){
    a.addEventListener("click",(event)=>{
        event.preventDefault();
        let href = a.getAttribute("href");
        let section = document.querySelector(href);
        window.scrollTo(0,section.offsetTop-headerheight-10);
    });
});

//changing active link while scrolling
let currentsectionid;
window.onscroll = function(){
    sections.forEach(function(section){
        if (scrollY+screen.height/3 >= section.offsetTop){
            currentsectionid = section.getAttribute("id");
        }
        if(scrollY<section.offsetTop && (scrollY+screen.height)>(section.offsetTop+section.offsetHeight)){
            currentsectionid = section.getAttribute("id");
        }
    });
    navlinklist.forEach((a)=>{
        if(a.getAttribute("href")=="#"+currentsectionid){
            document.querySelector("nav a.active").classList.remove("active");
            a.classList.add("active");
        }
    });
}

//making responsive navigation bar when screen size is low
let mediascreen = window.matchMedia("(max-width: 767px)");
if(mediascreen.matches){
    nav.classList.add("contracted");
}

//toggles responsive navigation bar while changing screen size in desktop browser
mediascreen.addEventListener("change",()=>{
    if(mediascreen.matches){
        nav.classList.add("contracted");
    }
    else{
        nav.classList.remove("contracted")
    }
});

//toggles expanding and contracting navigation menu in low screen size by clicking menu button
menuicondiv.addEventListener("click",()=>{
    navlinkstoggle();
});

//handles closing of expanded menu when we click outside the header element
document.addEventListener("click", function(event) { 
let target = event.target;
if(!target.closest("header") && nav.classList.contains("expanded")){
    navlinkstoggle();
}        
});

//it actually toggles between expanding and contracting navigation menus in low screen size by adding respective classes
function navlinkstoggle(){
    if(nav.classList.contains("contracted")){
        nav.insertBefore(menuicon, nav.children[0])
        nav.classList.remove("contracted");
        nav.classList.add("expanded");

        pagetitle.style.display="none";
        header.style.display="block";
    }
    else{
        nav.insertBefore(menuicon, null);
        nav.classList.remove("expanded");
        nav.classList.add("contracted");
        pagetitle.style.display="block";
        header.style.display="flex";
    }
}