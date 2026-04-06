// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Carousel functionality for featured section
  const productsWrapper = document.querySelector(".products-wrapper");
  const carouselButtons = document.querySelectorAll(".featured .carousel-button");
  const leftButton = carouselButtons[0];
  const rightButton = carouselButtons[1];

  if (productsWrapper && leftButton && rightButton) {
    // Get the width of one product card for scrolling
    const getCardWidth = () => {
      const firstCard = productsWrapper.querySelector(".product-card");
      if (firstCard) {
        const style = window.getComputedStyle(firstCard);
        const width = firstCard.offsetWidth;
        const margin = parseFloat(style.marginRight) || 0;
        return width + margin;
      }
      return 0;
    };

    // Set icon color
    const setIconColor = (button, isActive) => {
      const icon = button.querySelector(".carousel-button__icon");
      if (!icon) return;

      if (icon.tagName === "svg") {
        // Handle SVG icons
        const path = icon.querySelector("path");
        if (path) {
          path.setAttribute("stroke", isActive ? "#fff" : "#000");
        }
      } else if (icon.tagName === "img") {
        // Handle image icons
        icon.style.filter = isActive ? "brightness(1) invert(1)" : "brightness(0)";
      }
    };

    // Update button states
    const updateButtonStates = () => {
      const scrollLeft = productsWrapper.scrollLeft;
      const scrollWidth = productsWrapper.scrollWidth;
      const clientWidth = productsWrapper.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      // Left button state
      const isLeftActive = scrollLeft > 5;
      if (!isLeftActive) {
        leftButton.style.backgroundColor = "transparent";
        leftButton.style.opacity = "0.4";
        leftButton.style.border = "1.5px solid #1313131a";
        setIconColor(leftButton, false);
      } else {
        leftButton.style.backgroundColor = "#2d6e63";
        leftButton.style.opacity = "1";
        leftButton.style.border = "none";
        setIconColor(leftButton, true);
      }

      // Right button state
      const isRightActive = scrollLeft < maxScroll - 5;
      if (!isRightActive) {
        rightButton.style.backgroundColor = "transparent";
        rightButton.style.opacity = "0.4";
        rightButton.style.border = "1.5px solid #1313131a";
        setIconColor(rightButton, false);
      } else {
        rightButton.style.backgroundColor = "#2d6e63";
        rightButton.style.opacity = "1";
        rightButton.style.border = "none";
        setIconColor(rightButton, true);
      }
    };

    // Left button click handler
    leftButton.addEventListener("click", () => {
      const cardWidth = getCardWidth();
      productsWrapper.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
      });
      setTimeout(updateButtonStates, 300);
    });

    // Right button click handler
    rightButton.addEventListener("click", () => {
      const cardWidth = getCardWidth();
      productsWrapper.scrollBy({
        left: cardWidth,
        behavior: "smooth"
      });
      setTimeout(updateButtonStates, 300);
    });

    // Update button states on scroll
    productsWrapper.addEventListener("scroll", updateButtonStates);

    // Initial button state
    setTimeout(updateButtonStates, 100);
  }

  // Testimonial carousel functionality
  const testimonialData = [
    {
      image: "Assets/image.png",
      quote: "This trip was an unforgettable experience! Everything was seamless, and the personalized touch made it extra special. I can't wait for my next journey!",
      highlightedPart: "I can't wait for my next journey!",
      name: "James Carter",
      location: "Jo'Burg, South Africa"
    },
    {
      image: "Assets/next-testimonial.png",
      quote: "Afrivibe's collection literally speaks to my soul. The designs are unique and authentic. Every piece tells a story of our beautiful African heritage.",
      highlightedPart: "beautiful African heritage",
      name: "Amara Okafor",
      location: "Lagos, Nigeria"
    },
    {
      image: "Assets/previous-testimonial.png",
      quote: "I've never felt more connected to my culture through fashion. The quality and creativity are unmatched. Afrivibe is changing the game!",
      highlightedPart: "Afrivibe is changing the game!",
      name: "Kwame Mensah",
      location: "Accra, Ghana"
    }
  ];

  let currentTestimonialIndex = 0;

  const testimonialCarousel = document.querySelector(".testimonial__carousel");
  const testimonialButtons = testimonialCarousel
    ? testimonialCarousel.querySelectorAll(".carousel-button")
    : [];

  if (testimonialButtons.length === 2) {
    const testimonialLeftButton = testimonialButtons[0];
    const testimonialRightButton = testimonialButtons[1];
    const currentTestimonialSlide = document.querySelector(
      ".current__testimonial--slide"
    );
    const testimonialQuote = document.querySelector(".testimonial__quote");
    const testimonialName = document.querySelector(".testimonial__name");
    const testimonialLocation = document.querySelector(
      ".testimonial__location"
    );
    const prevSlide = document.querySelector(".testimonial__slide--prev");
    const nextSlide = document.querySelector(".testimonial__slide--next");
    const currentImage = document.querySelector(
      ".current__testimonial--slide img"
    );

    // Update testimonial display with animations
    const updateTestimonial = (index) => {
      const testimonial = testimonialData[index];

      // Add fade-out animation to current image
      if (currentImage) {
        currentImage.classList.remove("fade-in");
        currentImage.classList.add("fade-out");
      }

      // Add slide-out animation to quote
      if (testimonialQuote) {
        testimonialQuote.classList.remove("slide-in");
        testimonialQuote.classList.add("slide-out");
      }

      // Wait for fade-out animation to complete, then update content
      setTimeout(() => {
        // Update current testimonial image
        if (currentImage) {
          currentImage.src = testimonial.image;
          currentImage.classList.remove("fade-out");
          currentImage.classList.add("fade-in");
        }

        // Update quote
        if (testimonialQuote) {
          const quoteText = testimonial.quote;
          const highlightedPart = testimonial.highlightedPart;
          
          let quoteHTML = '';
          if (highlightedPart && quoteText.includes(highlightedPart)) {
            // Split the quote at the highlighted part
            const parts = quoteText.split(highlightedPart);
            quoteHTML = `<span class="text-accent--default">${parts[0]}</span><span class="text-accent--primary">${highlightedPart}</span><span class="text-accent--default">${parts[1]}</span>`;
          } else {
            // Fallback if highlighted part not found
            quoteHTML = `<span class="text-accent--default">${quoteText}</span>`;
          }
          
          testimonialQuote.innerHTML = quoteHTML;
          testimonialQuote.classList.remove("slide-out");
          testimonialQuote.classList.add("slide-in");
        }

        // Update name and location
        if (testimonialName) {
          testimonialName.textContent = testimonial.name;
        }
        if (testimonialLocation) {
          testimonialLocation.textContent = testimonial.location;
        }

        // Update prev and next images
        const prevIndex = (index - 1 + testimonialData.length) % testimonialData.length;
        const nextIndex = (index + 1) % testimonialData.length;

        if (prevSlide) {
          const prevImg = prevSlide.querySelector("img");
          if (prevImg) {
            prevImg.src = testimonialData[prevIndex].image;
          }
        }

        if (nextSlide) {
          const nextImg = nextSlide.querySelector("img");
          if (nextImg) {
            nextImg.src = testimonialData[nextIndex].image;
          }
        }
      }, 500);
    };

    // Left button click handler
    testimonialLeftButton.addEventListener("click", () => {
      currentTestimonialIndex =
        (currentTestimonialIndex - 1 + testimonialData.length) %
        testimonialData.length;
      updateTestimonial(currentTestimonialIndex);
    });

    // Right button click handler
    testimonialRightButton.addEventListener("click", () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialData.length;
      updateTestimonial(currentTestimonialIndex);
    });

    // Initialize with first testimonial
    setTimeout(() => {
      // Apply fade-in animation to initial image
      if (currentImage) {
        currentImage.classList.add("fade-in");
      }
      // Apply slide-in animation to initial quote
      if (testimonialQuote) {
        testimonialQuote.classList.add("slide-in");
      }
      updateTestimonial(0);
    }, 100);
  }
});