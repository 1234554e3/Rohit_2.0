

window.addEventListener("load", () => {
   document.querySelector(".js-page-loader").classList.add("fade-out");
   setTimeout(() =>{
    document.querySelector(".js-page-loader").style.display = "none";
   }, 600);
});

/*--------------------------------
    testimonial slider
---------------------------------*/
function testimonialSlider(){
    const carouselOne = document.getElementById('carouselOne')
    if(carouselOne){
        carouselOne.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector(".active");
            document.querySelector(".js-testimonial-img").src =
            activeItem.getAttribute("data-js-testimonial-img");
          })
    }
}
testimonialSlider();

/* --------------------------------
      course preview video
----------------------------------*/
function coursePreviewVideo(){
    const coursePreviewModal = document.querySelector(".js-course-preview-modal");
    if(coursePreviewModal){
        coursePreviewModal.addEventListener("show.bs.modal", function(){
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;
    });
    
    coursePreviewModal.addEventListener("hide.bs.modal", function(){
        this.querySelector(".js-course-preview-video").qause();
        });
    }
}
coursePreviewVideo();

/*-----------------------------------------
 header menu 
 -----------------------------------------*/
function headerMenu(){
  const menu = document.querySelector(".js-header-menu"),
  backdrop = document.querySelector(".js-header-backdrop"),
  menuCollapseBreakpoint = 991;

  function toggleMenu(){
    menu.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }

  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
     item.addEventListener("click", toggleMenu);
  });

  //close the menu by click outside it
  backdrop.addEventListener("click", toggleMenu)

  function collapse(){
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
     const { target } = event;

     if(target.classList.contains("js-toggle-sub-menu") &&
     window.innerWidth <= menuCollapseBreakpoint){
       event.preventDefault();
       
      
      if(target.parentElement.classList.contains("active")){
        collapse();
        return;
      }



      if(menu.querySelector(".active")){
        collapse();
      }


       target.parentElement.classList.add("active");
       target.nextElementSibling.style.maxHeight =
       target.nextElementSibling.scrollHeight + "px";
     }
  });

  //when resizing windows
  window.addEventListener("resize", function(){
     if(this.innerWidth > menuCollapseBreakpoint && menu.classList.contains("open")){
       toggleMenu();
     }
     if(this.innerWidth > menuCollapseBreakpoint && menu.querySelector(".active")){
       collapse();
     }
  });
}
headerMenu();

/* --------------------------------
     Style switcher
----------------------------------*/
function styleSwitcherToggle() {
    const styleSwitcher = document.querySelector(".style-switcher");
    const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

    styleSwitcherToggler.addEventListener("click", function () {
      styleSwitcher.classList.toggle("open");
      this.querySelector("i").classList.toggle("fa-times");
      this.querySelector("i").classList.toggle("fa-cog");
    });
  }

  styleSwitcherToggle();

/* --------------------------------
     Themes color
----------------------------------*/
function themeColors() {
    const colorStyle = document.querySelector(".js-color-style");
    const themeColorItems = document.querySelectorAll(".js-theme-color-item");
  
    // Function to set the color
    function setColor(color) {
      const path = colorStyle.getAttribute("href").split("/");
      path[path.length - 1] = color + ".css";
      colorStyle.setAttribute("href", path.join("/"));
  
      // Remove the 'active' class from all color buttons
      themeColorItems.forEach((item) => {
        item.classList.remove("active");
      });
  
      // Add the 'active' class to the selected color button
      const selectedColorButton = document.querySelector(`[data-js-theme-color="${color}"]`);
      if (selectedColorButton) {
        selectedColorButton.classList.add("active");
      }
    }
  
    // Add a click event listener to each color button
    themeColorItems.forEach((colorButton) => {
      colorButton.addEventListener("click", () => {
        const selectedColor = colorButton.getAttribute("data-js-theme-color");
        localStorage.setItem("color", selectedColor);
        setColor(selectedColor);
      });
    });
  
    // Initialize theme color on page load
    const savedColor = localStorage.getItem("color");
    if (savedColor) {
      setColor(savedColor);
    }
  }
  
  themeColors();

/* Theme light and dark mode */
function themeLightDark(){
  const darkModeCheckbox = document.querySelector(".js-dark-mode");

  darkModeCheckbox.addEventListener("click", function() {
    if(this.checked){
      localStorage.setItem("theme-dark", "true");
    }
    else{
      localStorage.setItem("theme-dark", "false");
    }
    themeMode();
  });

  function themeMode(){
    if(localStorage.getItem("theme-dark") === "false"){
      document.body.classList.remove("t-dark");
    }
    else{
      document.body.classList.add("t-dark");
    }
  }

  if(localStorage.getItem("theme-dark") !== null){
    themeMode();
  }
  if(document.body.classList.contains("t-dark")){
    darkModeCheckbox.checked = true;
  }
}
themeLightDark();  

/* Theme glass effect */
function themeGlassEffect(){
  const glassEffectCheckbox = document.querySelector(".js-glass-effect");
  glassStyle = document.querySelector(".js-glass-style");

  glassEffectCheckbox.addEventListener("click", function() {
    if(this.checked){
      localStorage.setItem("glass-effect", "true");
    }
    else{
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });

  function glass(){
    if(localStorage.getItem("glass-effect") === "true"){
      glassStyle.removeAttribute("disabled");
    }
    else{
      glassStyle.disabled = true;
    }
  }
  if(localStorage.getItem("glass-effect") !== null){
    glass();
  }
  if(!glassStyle.hasAttribute("disabled")){
    glassEffectCheckbox.checked = true;
  }
}
themeGlassEffect();