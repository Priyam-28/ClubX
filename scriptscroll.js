var left=document.getElementById("backbtn");
var right=document.getElementById("nextbtn");
var scrollcontainer=document.querySelector(".technical")

scrollcontainer.addEventListener("wheel",(evt)=>{
    evt.preventDefault();
    scrollcontainer.scrollLeft +=evt.deltaY;
});

left.addEventListener("click",()=>{
    scrollcontainer.style.scrollBehavior = "smooth";
    scrollcontainer.scrollLeft += 200;
});

right.addEventListener("click",()=>{
    scrollcontainer.style.scrollBehavior = "smooth";
    scrollcontainer.scrollLeft -= 200;
});