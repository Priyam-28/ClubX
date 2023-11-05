gsap.to("nav", {
    backgroundColor: "rgba(13,59,102)",
    duration: 0.5,
    height: "",
    scrollTrigger: {
        trigger: "nav",
        scroller: "body",
        // markers: true,
        start: "top -5%",
        end: "top -80%",
        scrub: 0.5,
    }
})


