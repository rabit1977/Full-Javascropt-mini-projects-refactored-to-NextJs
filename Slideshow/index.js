let slideIndex = 1; // Initialize the current slide index to 1

showSlides(slideIndex); // Display the initial slide

function plusSlides(n) {
  // Increments or decrements the slide index by the provided value
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  // Sets the slide index to the provided value
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides"); // Get all slide elements
  let dots = document.getElementsByClassName("dot"); // Get all dot elements

  // Ensure the slide index stays within the valid range
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dot indicators
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and activate the corresponding dot
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}