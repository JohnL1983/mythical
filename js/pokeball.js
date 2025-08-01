function createPokeballDiv(label, index, randomized = false) {
  const div = document.createElement('div');
  div.className = 'pokeball';
  div.dataset.index = index;

  // Apply randomized animation delay if restoring on page load
  if (randomized) {
    const delay = (Math.random() * 5).toFixed(2);
    div.style.animationDelay = `${delay}s, ${delay}s, ${delay}s`;

    const starDelay = (parseFloat(delay) + 3.75).toFixed(2);
    const star1 = document.createElement('div');
    star1.className = 'star star1';
    star1.style.animationDelay = `${starDelay}s`;

    const star2 = document.createElement('div');
    star2.className = 'star star2';
    star2.style.animationDelay = `${starDelay}s`;

    div.appendChild(star1);
    div.appendChild(star2);
  } else {
    const star1 = document.createElement('div');
    star1.className = 'star star1';

    const star2 = document.createElement('div');
    star2.className = 'star star2';

    div.appendChild(star1);
    div.appendChild(star2);
  }

  function swapBackToCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle-pokeball';
    checkbox.dataset.index = index;
    checkbox.id = index;

    label.insertBefore(checkbox, div);
    label.removeChild(div);
    localStorage.setItem(index, 'false');
    attachPokeballListener(checkbox);
  }

  // Pokéball click restores checkbox
  div.addEventListener('click', swapBackToCheckbox);

  // Also make associated <label for="..."> do the same
  const associatedLabel = document.querySelector(`label[for="${index}"]`);
  if (associatedLabel) {
    associatedLabel.addEventListener('click', (e) => {
      // Only trigger if checkbox is gone (i.e. Pokéball is visible)
      if (!document.getElementById(index)) {
        e.preventDefault();
        swapBackToCheckbox();
      }
    });
  }

  return div;
}


function attachPokeballListener(checkbox) {
  checkbox.addEventListener('change', function () {
    const index = this.dataset.index || this.id;
    if (this.checked) {
      const pokeballDiv = createPokeballDiv(this.parentNode, index);
      this.parentNode.insertBefore(pokeballDiv, this);
      this.parentNode.removeChild(this);
      localStorage.setItem(index, 'true');
    } else {
      localStorage.setItem(index, 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-pokeball').forEach(cb => {
    const index = cb.dataset.index || cb.id;
    const isChecked = localStorage.getItem(index) === 'true';

    if (isChecked) {
      const label = cb.parentNode;
      const pokeballDiv = createPokeballDiv(label, index, true); // pass true for randomized animation
      label.insertBefore(pokeballDiv, cb);
      label.removeChild(cb);
    } else {
      attachPokeballListener(cb);
    }
  });
  
});
