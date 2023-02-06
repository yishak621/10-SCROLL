//the main target of this project is to calculate date dynamically and to set the height of links container dynamically
//and also we will build the arrow button which will apper when we scroll down

//DATE
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

//LINKS
//in css we use links-container class to hide by default and show-links to make it visible in small screens by JS
// linksContainer.classList.toggle('show-links');=>/we used to do this for quite long and at this time we calculate the height for links container dynamically
//to do this we use a Element.getBoundingClientRect() method to return
//calculate the sizes of an elment and its position relative to the viewport
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  const containerHeight = linksContainer.getBoundingClientRect().height; //by default the links-container is height 0 so we shouldnt use this in this method
  const linksHeight = links.getBoundingClientRect().height; //this will calculate the height of links
  console.log(linksHeight);

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

//FIXED NAV BAR
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset; //when we keep scrolling the y axis value keep increases
  const navHeight = navbar.getBoundingClientRect().height; //constant value

  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
  if (scrollHeight > 500) {
    //for our top button
    topLink.classList.add('show-link');
  } else {
    topLink.classList.remove('show-link');
  }
});

//SMOOTH SCROLL
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    //prevent default
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    //slice extracts a section of a string without modifying original string[for this example 1 means starting from index 1]
    //******calculate the heights */
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    // we use let declaration to position since it is changing when we want
    let position = element.offsetTop - navHeight; //this approach is good but it will give us diffrent value for the first link to be clicked when the navbar is fixed
    console.log(element.offsetTop);
    //console.log(position); //offsettop-A number, representing the top position of the elment,in pixels benchmark is y axis from top
    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 82) {
      position = position + containerHeight;
      //console.log(position); //navHeight is increased at mobile version and //NOTE that the height of linksContainer is increased at mobile version
    }
    window.scrollTo({
      //finally we add our event to be scrolled at 'position'
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0; //this will close a navbar when we click to a link for mobile version
  });
});
