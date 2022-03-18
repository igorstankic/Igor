"use strict";

const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".elaborations__tab");
const tabsContainer = document.querySelector(".elaborations__tab-container");
const tabsContent = document.querySelectorAll(".elaborations__content");

document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//TABBED COMPONENT

tabsContainer.addEventListener("click", function (e) {
  const clickTarget = e.target.closest(".elaborations__tab");

  if (!clickTarget) return;

  tabs.forEach((t) => t.classList.remove("elaborations__tab--active"));
  clickTarget.classList.add("elaborations__tab--active");

  tabsContent.forEach((c) =>
    c.classList.remove("elaborations__content--active")
  );

  document
    .querySelector(`.elaborations__content--${clickTarget.dataset.tab}`)
    .classList.add("elaborations__content--active");
});

//NAVIGATION OPACITY
const handleOver = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const allLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = document.querySelector(".nav").querySelector("img");

    allLinks.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleOver(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  handleOver(e, 1);
});

//STICKY NAVIGATION

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const observerHeader = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observerHeader.observe(header);

const allSections = document.querySelectorAll(".section");

const showSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);

});

//SLDER

const allSlide = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let activeSlide = 0;
let slideLength = allSlide.length;


const goToSlide = function (slide) {
  allSlide.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (activeSlide === slideLength - 1) {
    activeSlide = 0;
  } else {
    activeSlide++;
  }

  goToSlide(activeSlide);
};

const prevSlide = function () {
  if (activeSlide === 0) {
    activeSlide = slideLength - 1;
  } else {
    activeSlide--;
  }

  goToSlide(activeSlide);
  activateDot(activeSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});
