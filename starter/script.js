'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore=document.querySelector('.btn--scroll-to');
const section1=document.getElementById('section--1');
const TabContainer = document.querySelector('.operations__tab-container')
const allTabs = document.querySelectorAll('.operations__tab')
const tabsContent=document.querySelectorAll('.operations__content')
const header=document.querySelector('.header')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(mod=> mod.addEventListener('click',openModal));
  //btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// learnMore button Scroll
btnLearnMore.addEventListener('click',function(e){
  // const s1Coords=section1.getBoundingClientRect();
  // console.log(s1Coords);
  // console.log(window.scrollX,window
  //   .scrollY
  // )
  // window.scrollTo({letf:s1Coords.left+window.scrollX,top:s1Coords.top+window.scrollY,behavior: 'smooth'})
  section1.scrollIntoView({behavior: 'smooth'})
})


// Navigation buttons scroll
const btnNav=document.querySelector('.nav__links')
const nav=document.querySelector('.nav')
btnNav.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

// Navigation opacity changing
const handleHover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    //console.log(link);
    const siblings=link.closest('.nav').querySelectorAll('.nav__link')
    //console.log(siblings);
    siblings.forEach(sb=>{ if(e.target!==sb) sb.style.opacity= this
  })
    const logo=link.closest('.nav').querySelector('img')
    logo.style.opacity= this
  }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

// activating tabbed containers:
TabContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if(!clicked) return
  allTabs.forEach(el=>el.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')
  tabsContent.forEach(opC=>opC.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Adding sticky class to nav




// const s1Coords=section1.getBoundingClientRect();
// window.addEventListener('scroll',function(){
//   console.log(this.window.scrollY);
//   if (window.scrollY>s1Coords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
//   })
  const navHeight=nav.getBoundingClientRect().height
const callBackFunc=function(entries){
  const [entry]=entries
  // console.log(entry);
  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const options={
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}
const headerObserver=new IntersectionObserver(callBackFunc,options)
headerObserver.observe(header)

const obSec=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
  }
const secoption={
 root: null,
 threshold: 0.15
}
const allSections=document.querySelectorAll('.section')
// console.log(allSections);
const sectionObserver=new IntersectionObserver(obSec,secoption)
allSections.forEach(sect=>{
  sectionObserver.observe(sect)
  // sect.classList.add('.section--hidden')
  //console.log(`hello`);
})
const allImages=document.querySelectorAll('img[data-src]')
//console.log(allImages);
const unBlurImage=function(entries,observer){
  const [entry]=entries
  //console.log(entry);
  if(!entry.isIntersecting) return
  entry.target.src= entry.target.dataset.src
  entry.target.classList.remove('lazy-img')
  observer.unobserve(entry.target)
}
const imgoption={
  root: null,
  threshold: 0,
  rootMargin: '-200px'
}
const imgObserver=new IntersectionObserver(unBlurImage,imgoption)
allImages.forEach(img=> imgObserver.observe(img))
let curSlide=0;
const slider=document.querySelector('.slider')
const slides=document.querySelectorAll('.slide')
const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach(b=> b.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

}
// console.log(slides);
// slider.style.transform = 'scale(0.4) translateX(-800px)'
// slider.style.overflow='visivble'
const gotoSlide=function(slide){
  slides.forEach((s,i)=> s.style.transform = `translateX(${(i-slide)*100}%)`)
}
gotoSlide(0)
const btnRight=document.querySelector('.slider__btn--right')
const btnLeft=document.querySelector('.slider__btn--left')
// console.log(btnLeft,btnRight);
const nextSlide=function(){
  if(curSlide===slides.length-1) curSlide=0
  else curSlide++
  gotoSlide(curSlide);
  activateDot(curSlide)
}
const prevSlide=function(){
  if(curSlide==0) curSlide=slides.length-1
  else curSlide--
  gotoSlide(curSlide)
  activateDot(curSlide)
}
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)
const dotCon=document.querySelector('.dots')
  slides.forEach(function(_,i){
    dotCon.insertAdjacentHTML('beforeend',`
      <button class="dots__dot" data-slide="${i}"></button>
      `)
  })
//console.log(dotCon);


dotCon.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide=e.target.dataset.slide;
    gotoSlide(slide)
    activateDot(slide)
    }
})
document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight' ) nextSlide();
})











































































































































// document.querySelectorAll('.nav__link').forEach(el=>
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   }
// ))

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.background='blue';
// })
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.background='green';
// })
// document.querySelector('.nav__link').addEventListener('click',function(e){
//   e.preventDefault();
//   this.style.background='red';
// })