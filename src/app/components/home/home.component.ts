import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

export function welcome() {
  const e = document.documentElement;
  if ((e.classList.remove("no-js"), e.classList.add("js"), document.body.classList.contains("has-animations"))) {
      const a = anime.timeline({ autoplay: !1 }),
          t = document.querySelector(".stroke-animation");
      t.setAttribute("stroke-dashoffset", anime.setDashoffset(t)),
          a.add({
                  targets: ".stroke-animation",
                  strokeDashoffset: { value: 0, duration: 2e3, easing: "easeInOutQuart" },
                  strokeWidth: { value: [0, 2], duration: 2e3, easing: "easeOutCubic" },
                  strokeOpacity: { value: [1, 0], duration: 1e3, easing: "easeOutCubic", delay: 1e3 },
                  fillOpacity: { value: [0, 1], duration: 500, easing: "easeOutCubic", delay: 1300 },
              })
              .add({
                  targets: ".fadeup-animation",
                  offset: 1300,
                  translateY: {
                      value: [100, 0],
                      duration: 1500,
                      easing: "easeOutElastic",
                      delay: function (e, a) {
                          return 150 * a;
                      },
                  },
                  opacity: {
                      value: [0, 1],
                      duration: 200,
                      easing: "linear",
                      delay: function (e, a) {
                          return 150 * a;
                      },
                  },
              })
              .add({
                  targets: ".fadeleft-animation",
                  offset: 1300,
                  translateX: {
                      value: [40, 0],
                      duration: 400,
                      easing: "easeOutCubic",
                      delay: function (e, a) {
                          return 100 * a;
                      },
                  },
                  opacity: {
                      value: [0, 1],
                      duration: 200,
                      easing: "linear",
                      delay: function (e, a) {
                          return 100 * a;
                      },
                  },
              }),
          e.classList.add("anime-ready"),
          a.play();
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    welcome();
  }

}
