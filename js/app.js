/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*//*global document,IntersectionObserver*/
const allSections = document.getElementsByTagName("section"); 
const navBar = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();
const ul = document.createElement("ul");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
buildNav();//Build the navigation menu.
activeSection();//Add an active state to  navigation items when a section is in the viewport. 

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for(const section of allSections) {
        const sectionId = section.id//return the section id
        const sectionDataNav = section.getAttribute("data-nav")//return the section Data
        const li = document.createElement("li");
        const linkA = document.createElement("a");
        linkA.classList.add("menu__link");//add style to link
        linkA.href=`#${sectionId}`;//add reference
        linkA.textContent=sectionDataNav;//add title to menu item
        /**
         * 
         * Begin Events
         * 
        */
        // Clicking on a navigation item will scroll to the appropriate section of the page
        linkA.addEventListener("click",function(event){
            event.preventDefault();//need to stop event of link #
            // Scroll to anchor ID using scrollTO event
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                // Scroll to section on link click
                behavior: 'smooth'
            });
        });
        li.appendChild(linkA);
        ul.appendChild(li);
        fragment.appendChild(ul);
    }
    // Build menu 
    navBar.appendChild(fragment);
}



// Set sections as active
function activeSection(){
    let options = {
        root: null,//it is a viewport
        rootMargin: "0px",
        threshold: 0.40
      };
        
    const callBackIntersectionObserver = entries =>{
        entries.forEach(entry=>{ 
            // Add class 'active' to section when near top of viewport
            entry.target.classList.toggle("your-active-class",entry.isIntersecting);
            //active link when it will be in viewport
            const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            activeLink.classList.toggle("active",entry.isIntersecting);        
        });
    };
    const Observer = new IntersectionObserver(callBackIntersectionObserver,options);
        Array.from(allSections).forEach(section=>{
        Observer.observe(section);
        });
}






