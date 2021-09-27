// function moonstarts(e) {
//     if (e.classList.contains("fa-moon-o")) { //se tem lua
//         e.classList.remove("fa-moon-o"); //remove classe icone lua
//         e.classList.add("fa-sun-o"); //coloca classedo sol
//         e.style.color = "rgb(225, 225, 0)";
//         document.body.style.background = 'rgb(10, 10, 10)';
//         document.querySelector('#userName').style.color = '#fff';

//         let links = document.querySelectorAll('.link');
//         // Pega apenas o primeiro do array
//         links[0].style.filter = 'grayscale(100%)';
//         // pega todos
//         for (let i = 0; i < links.length; i++) {
//             links[i].style.filter = 'grayscale(100%)';
//         }

//     } else { //senão
//         e.classList.remove("fa-sun-o"); //remove classe icone lua
//         e.classList.add("fa-moon-o"); //coloca classedo sol
//         e.style.color = "#585858";
//         document.body.style.background = 'rgb(243, 242, 242)';
//         document.querySelector('#links').style.color = 'rgb(100, 240, 242)';
//         document.querySelector('#userName').style.color = 'rgb(99, 99, 99)';

//         let links = document.querySelectorAll('.link');
//         // Pega apenas o primeiro do array
//         links[0].style.filter = 'grayscale(0%)';
//         // pega todos
//         for (let i = 0; i < links.length; i++) {
//             links[i].style.filter = 'grayscale(0%)';
//         }
//     }
// }

// export function welcome() {
//     const e = document.documentElement;
//     if ((e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations"))) {
//         (window.sr = ScrollReveal()).reveal(".feature, .testimonial", { duration: 600, distance: "50px", easing: "cubic-bezier(0.5, -0.01, 0, 1.005)", origin: "bottom", interval: 100 });
//         const a = anime.timeline({ autoplay: !1 }),
//             t = document.querySelector(".stroke-animation");
//         t.setAttribute("stroke-dashoffset", anime.setDashoffset(t)),
//             a.add({
//                     targets: ".stroke-animation",
//                     strokeDashoffset: { value: 0, duration: 2e3, easing: "easeInOutQuart" },
//                     strokeWidth: { value: [0, 2], duration: 2e3, easing: "easeOutCubic" },
//                     strokeOpacity: { value: [1, 0], duration: 1e3, easing: "easeOutCubic", delay: 1e3 },
//                     fillOpacity: { value: [0, 1], duration: 500, easing: "easeOutCubic", delay: 1300 },
//                 })
//                 .add({
//                     targets: ".fadeup-animation",
//                     offset: 1300,
//                     translateY: {
//                         value: [100, 0],
//                         duration: 1500,
//                         easing: "easeOutElastic",
//                         delay: function (e, a) {
//                             return 150 * a;
//                         },
//                     },
//                     opacity: {
//                         value: [0, 1],
//                         duration: 200,
//                         easing: "linear",
//                         delay: function (e, a) {
//                             return 150 * a;
//                         },
//                     },
//                 })
//                 .add({
//                     targets: ".fadeleft-animation",
//                     offset: 1300,
//                     translateX: {
//                         value: [40, 0],
//                         duration: 400,
//                         easing: "easeOutCubic",
//                         delay: function (e, a) {
//                             return 100 * a;
//                         },
//                     },
//                     opacity: {
//                         value: [0, 1],
//                         duration: 200,
//                         easing: "linear",
//                         delay: function (e, a) {
//                             return 100 * a;
//                         },
//                     },
//                 }),
//             e.classList.add("anime-ready"),
//             a.play();
//     }
// };