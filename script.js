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

  // Collections Page Functionality
  const collectionsSection = document.getElementById("collections-section");
  if (collectionsSection) {
    // Product data with attributes for filtering
    const allProducts = [
      { id: 1, name: "Radiant Glow Cream", category: "skincare", price: 28, color: "gold", image: "Assets/Frame 2147228524.png", badge: "New", status: "active" },
      { id: 2, name: "Flawless Finish Foundation", category: "skincare", price: 15, color: "white", image: "Assets/Screenshot 2026-02-24 225640 1.png", badge: "", status: "active" },
      { id: 3, name: "Hydra Restore Moisturizer", category: "skincare", price: 32, color: "white", image: "Assets/Screenshot 2025-11-18 071445 1.png", badge: "", status: "active" },
      { id: 4, name: "Revive Radiance Serum", category: "skincare", price: 38, color: "gold", image: "Assets/Frame 2147228521.png", badge: "Sale", status: "sale", originalPrice: 48 },
      { id: 5, name: "Vibrant Essence Palette", category: "makeup", price: 42, color: "gold", image: "Assets/Frame 2147228522.png", badge: "", status: "active" },
      { id: 6, name: "Heritage Silk Wrap", category: "accessories", price: 55, color: "earth", image: "Assets/Frame 2147228524.png", badge: "New", status: "active" },
      { id: 7, name: "Golden Kente Dress", category: "dresses", price: 125, color: "gold", image: "Assets/Screenshot 2026-02-24 225640 1.png", badge: "", status: "active" },
      { id: 8, name: "Ankara Print Blazer", category: "tops", price: 95, color: "earth", image: "Assets/Screenshot 2025-11-18 071445 1.png", badge: "", status: "active" },
      { id: 9, name: "Beaded Necklace", category: "accessories", price: 32, color: "gold", image: "Assets/Frame 2147228521.png", badge: "Sale", status: "sale", originalPrice: 45 },
      { id: 10, name: "Shea Butter Collection", category: "skincare", price: 38, color: "white", image: "Assets/Frame 2147228522.png", badge: "", status: "active" },
      { id: 11, name: "Mud Cloth Bag", category: "accessories", price: 65, color: "earth", image: "Assets/Frame 2147228524.png", badge: "", status: "active" },
      { id: 12, name: "Tribal Earrings", category: "accessories", price: 28, color: "gold", image: "Assets/Screenshot 2026-02-24 225640 1.png", badge: "New", status: "active" }
    ];

    let filteredProducts = [...allProducts];
    let currentPage = 1;
    const productsPerPage = 12;
    let currentSort = "featured";
    const activeFilters = {
      categories: [],
      prices: [],
      colors: []
    };

    // Get filter elements
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const priceCheckboxes = document.querySelectorAll('input[name="price"]');
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    const resetButton = document.querySelector(".filters__reset");
    const sortSelect = document.getElementById("sort-select");
    const paginationButtons = document.querySelectorAll(".pagination__number");
    const prevPaginationBtn = document.querySelector(".pagination__button--prev");
    const nextPaginationBtn = document.querySelector(".pagination__button--next");
    const productCountSpan = document.getElementById("product-count");
    const productsGrid = document.querySelector(".products-grid");

    // Filter function
    const filterAndSort = () => {
      // Start with all products
      filteredProducts = allProducts.filter((product) => {
        const categoryMatch =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(product.category);
        const colorMatch =
          activeFilters.colors.length === 0 ||
          activeFilters.colors.includes(product.color);
        
        let priceMatch = true;
        if (activeFilters.prices.length > 0) {
          priceMatch = activeFilters.prices.some((range) => {
            const [min, max] = range === "200+" ? [200, Infinity] : range.split("-").map(Number);
            return product.price >= min && product.price <= max;
          });
        }

        return categoryMatch && colorMatch && priceMatch;
      });

      // Apply sorting
      switch (currentSort) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          filteredProducts.sort((a, b) => (b.badge === "New" ? 1 : -1));
          break;
        case "best-selling":
          filteredProducts.sort((a, b) => a.id - b.id); // Placeholder sort
          break;
        case "featured":
        default:
          filteredProducts.sort((a, b) => a.id - b.id);
      }

      currentPage = 1;
      updateDisplay();
    };

    // Update display
    const updateDisplay = () => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const displayedProducts = filteredProducts.slice(startIndex, endIndex);

      // Update product count
      if (productCountSpan) {
        productCountSpan.textContent = `Showing ${displayedProducts.length} of ${filteredProducts.length} products`;
      }

      // Render products
      if (productsGrid) {
        // Helper function to truncate text
        const truncateText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };

        productsGrid.innerHTML = displayedProducts.map((product) => {
          const badgeHTML = product.badge ? `<span class="product-card__badge${product.badge === "Sale" ? " sale" : ""}">${product.badge}</span>` : "";
          const priceHTML = product.status === "sale"
            ? `<span class="product-card__price"><span class="product-card__price--original">$${product.originalPrice}.00</span><span class="product-card__price--sale">$${product.price}.00</span></span>`
            : `<div class="product-card__price">$${product.price}.00</div>`;
          
          // Truncate product name to fit in card (approximately 30 characters for ~24px font)
          const truncatedName = truncateText(product.name, 30);
          
          // Truncate product description (approximately 50 characters for ~16px font)
          const fullDescription = "Premium quality product from Afrivibe's curated collection.";
          const truncatedDescription = truncateText(fullDescription, 50);

          return `
            <div class="product-card collections__product-card">
              <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}" />
                ${badgeHTML}
              </div>
              <div class="product-card__details">
                <div class="product-card__info">
                  <div class="product-card__title" title="${product.name}">${truncatedName}</div>
                  <p class="product-card__description" title="${fullDescription}">${truncatedDescription}</p>
                </div>
                ${priceHTML}
                <button class="product-card__cta" aria-label="Add ${product.name} to cart">Add to Cart</button>
              </div>
            </div>
          `;
        }).join("");
      }

      updatePagination();
    };

    // Update pagination
    const updatePagination = () => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

      // Update pagination buttons
      paginationButtons.forEach((btn) => {
        const page = parseInt(btn.dataset.page);
        if (page === currentPage) {
          btn.classList.add("pagination__number--active");
        } else {
          btn.classList.remove("pagination__number--active");
        }
      });

      // Update prev/next buttons
      if (prevPaginationBtn) {
        prevPaginationBtn.disabled = currentPage === 1;
      }
      if (nextPaginationBtn) {
        nextPaginationBtn.disabled = currentPage === totalPages;
      }
    };

    // Add checkbox event listeners
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        activeFilters.categories = Array.from(categoryCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterAndSort();
      });
    });

    priceCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        activeFilters.prices = Array.from(priceCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterAndSort();
      });
    });

    colorCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        activeFilters.colors = Array.from(colorCheckboxes)
          .filter((cb) => cb.checked)
          .map((cb) => cb.value);
        filterAndSort();
      });
    });

    // Reset filters
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        categoryCheckboxes.forEach((cb) => (cb.checked = false));
        priceCheckboxes.forEach((cb) => (cb.checked = false));
        colorCheckboxes.forEach((cb) => (cb.checked = false));
        activeFilters.categories = [];
        activeFilters.prices = [];
        activeFilters.colors = [];
        currentSort = "featured";
        if (sortSelect) sortSelect.value = "featured";
        filterAndSort();
      });
    }

    // Sort event listener
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        filterAndSort();
      });
    }

    // Pagination event listeners
    paginationButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page);
        updateDisplay();
        window.scrollTo({ top: collectionsSection.offsetTop - 100, behavior: "smooth" });
      });
    });

    if (prevPaginationBtn) {
      prevPaginationBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          updateDisplay();
          window.scrollTo({ top: collectionsSection.offsetTop - 100, behavior: "smooth" });
        }
      });
    }

    if (nextPaginationBtn) {
      nextPaginationBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          updateDisplay();
          window.scrollTo({ top: collectionsSection.offsetTop - 100, behavior: "smooth" });
        }
      });
    }

    // Initial display
    updateDisplay();
  }
});