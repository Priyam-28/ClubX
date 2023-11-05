gsap.to("#nav", {
    backgroundColor: "rgba(30,64,174)",
    duration: 0.1,
    height: "",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers: true,
        start: "top -10%",
        end: "top -75%",
        scrub: 2,
    }
})
gsap.to("#nav", {
    color: "white",
    duration: 0.1,
    height: "",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers: true,
        start: "top -10%",
        end: "top -75%",
        scrub: 2,
    }
})




// gsap.to("main", {
//     backgroundColor: "rgba(59,130,246)",
//     scrollTrigger: {
//       trigger: "main",
//       scroller: "body",
//       // markers: true,
//       start: "top -25%",
//       end: "top -70%",
//       scrub:3 ,
//     },
//   });