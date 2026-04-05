// Load countries data and populate dropdown
async function initializeCountrySelector() {
  try {
    const response = await fetch('./countries.json');
    const data = await response.json();
    const countrySelect = document.getElementById('country-code');
    const countryFlag = document.getElementById('country-flag');
    
    // Clear existing options (except first one)
    countrySelect.innerHTML = '';
    
    // Populate dropdown with countries from JSON
    data.countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.setAttribute('data-emoji', country.emoji);
      option.setAttribute('data-abbr', country.abbr);
      option.textContent = `${country.emoji} ${country.name}${country.code ? ` (${country.code})` : ''}`;
      countrySelect.appendChild(option);
    });
    
    // Handle country selection
    countrySelect.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const emoji = selectedOption.getAttribute('data-emoji');
      const abbr = selectedOption.getAttribute('data-abbr');
      const code = this.value;
      
      // Update flag display
      if (countryFlag) {
        countryFlag.textContent = emoji || '🌍';
        countryFlag.setAttribute('title', abbr || 'Country');
      }
      
      // Optional: Log the selected values for form submission
      console.log(`Selected: ${emoji} ${abbr} (${code})`);
    });
    
    // Set initial flag
    if (countryFlag) {
      countryFlag.textContent = '🌍';
    }
    
  } catch (error) {
    console.error('Error loading countries:', error);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCountrySelector);
