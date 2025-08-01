document.addEventListener("DOMContentLoaded", () => {
  function createChecklist(containerId, items, prefix) {
    const section = document.getElementById(containerId);
    const list = document.createElement("ul");
    list.className = "wave-checklist";
    list.id = `${prefix}-list`;

    items.forEach((name, index) => {
      const id = `${prefix}-${index}`;
      const li = document.createElement("li");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.dataset.index = id;
      input.className = "toggle-pokeball";
      input.checked = localStorage.getItem(id) === "true";

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = name;

      li.append(input, label);
      list.appendChild(li);
    });

    section.appendChild(list);
  }

  function createCounter(containerId) {
    const toggleBtn = document.getElementById(`${containerId}-toggle-all`);
    if (!toggleBtn) return;

    const counter = document.createElement("div");
    counter.className = "checklist-counter";
    counter.id = `${containerId}-counter`;
    counter.textContent = "0/0 - 0%";

    toggleBtn.insertAdjacentElement("afterend", counter);
  }

  function updateChecklistCounter(containerId) {
    const list = document.getElementById(`${containerId}-list`);
    const counter = document.getElementById(`${containerId}-counter`);
    if (!list || !counter) return;

    const listItems = list.querySelectorAll("li");
    let total = listItems.length;
    let count = 0;

    listItems.forEach(li => {
      const checkbox = li.querySelector("input[type='checkbox']");
      const isChecked = checkbox
        ? checkbox.checked
        : localStorage.getItem(li.querySelector("label")?.htmlFor) === "true";

      if (isChecked) count++;
    });

    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    counter.textContent = `${count}/${total} - ${percent}%`;
  }

  function renderSection(dataObject, sectionId) {
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(`${sectionId}-toggle-all`);
    let allSelected = localStorage.getItem(`${sectionId}-toggle`) === "true";

    if (!section || !dataObject) return;

    if (dataObject.main) {
      createChecklist(sectionId, dataObject.main, sectionId);
      createCounter(sectionId);
      updateChecklistCounter(sectionId);
    }

    if (dataObject.extras) {
      Object.entries(dataObject.extras).forEach(([extraId, items]) => {
        const extraSection = document.getElementById(extraId);
        if (extraSection) {
          const header = document.createElement("div");
          header.className = "wave-header";

          const heading = document.createElement("h2");
          heading.textContent = extraId
            .replace(sectionId + "-", '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

          const toggle = document.createElement("button");
          toggle.id = `${extraId}-toggle-all`;
          let extraSelected = localStorage.getItem(`${extraId}-toggle`) === "true";
          toggle.textContent = extraSelected ? "Deselect All" : "Select All";

          header.appendChild(heading);
          header.appendChild(toggle);
          extraSection.appendChild(header);

          createChecklist(extraId, items, extraId);
          createCounter(extraId);
          updateChecklistCounter(extraId);

          toggle.addEventListener("click", () => {
            extraSelected = !extraSelected;
            toggle.textContent = extraSelected ? "Deselect All" : "Select All";
            localStorage.setItem(`${extraId}-toggle`, extraSelected);
            const checkboxes = extraSection.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(cb => {
              cb.checked = extraSelected;
              localStorage.setItem(cb.id, extraSelected);
            });

            updateChecklistCounter(extraId);
          });
        }
      });
    }

    if (toggleBtn) {
      toggleBtn.textContent = allSelected ? "Deselect All" : "Select All";

      toggleBtn.addEventListener("click", () => {
        allSelected = !allSelected;
        toggleBtn.textContent = allSelected ? "Deselect All" : "Select All";
        localStorage.setItem(`${sectionId}-toggle`, allSelected);

        const checkboxes = section.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(cb => {
          cb.checked = allSelected;
          cb.dispatchEvent(new Event("change"));
        });


        updateChecklistCounter(sectionId);
      });
    }
  }

  // Data rendering
  if (typeof waveData !== 'undefined') {
    Object.entries(waveData).forEach(([waveId, data]) => {
      renderSection(data, waveId);
    });
  }

  if (typeof bigDollData !== 'undefined') {
    renderSection(bigDollData, "big-pokedolls");
  }

  if (typeof pokepalDollData !== 'undefined') {
    renderSection(pokepalDollData, "pokepal-dolls");
  }

  if (typeof wrapsData !== 'undefined') {
    renderSection(wrapsData, "wraps");
  }

  if (typeof s1StreamerData !== 'undefined') {
    renderSection(s1StreamerData, "s1streamers");
  }

  if (typeof s2StreamerData !== 'undefined') {
    renderSection(s2StreamerData, "s2streamers");
  }

  if (typeof vanillaPlushieData !== 'undefined') {
    renderSection(vanillaPlushieData, "vanilla-plushies");
  }

  if (typeof vanillaFigures !== 'undefined') {
    renderSection(vanillaFigures, "vanilla-figures");
  }

  if (typeof survivalPlushies !== 'undefined') {
    renderSection(survivalPlushies, "survival-plushies");
  }

  if (typeof alienPlushieData !== 'undefined') {
    renderSection(alienPlushieData, "alien-plushies");
  }

  if (typeof adorablePlushies !== 'undefined') {
    renderSection(adorablePlushies, "adorable-summer");
  }

  if (typeof catHeadPlushies !== 'undefined') {
    renderSection(catHeadPlushies, "cat-heads");
  }

  if (typeof christmasPlushies !== 'undefined') {
    renderSection(christmasPlushies, "xmas-plushies");
  }

  if (typeof dinoPlushies !== 'undefined') {
    renderSection(dinoPlushies, "dino-plushies");
  }

  if (typeof dbzPlushies !== 'undefined') {
    renderSection(dbzPlushies, "dbz-plushies");
  }

  if (typeof halloweenPlushies !== 'undefined') {
    renderSection(halloweenPlushies, "hallow-plushies");
  }

  if (typeof sanrioPlushies !== 'undefined') {
    renderSection(sanrioPlushies, "sanrio-plushies");
  }

  if (typeof indyPlushies !== 'undefined') {
    renderSection(indyPlushies, "indy-plushies");
  }

  if (typeof easterPlushieData !== 'undefined') {
    renderSection(easterPlushieData, "easter-plushies");
  }

  if (typeof insideOutData !== 'undefined') {
    renderSection(insideOutData, "inside-out-plushies");
  }

  if (typeof pridePlushieData !== 'undefined') {
    renderSection(pridePlushieData, "pride-plushies");
  }

  if (typeof springPlushieData !== 'undefined') {
    renderSection(springPlushieData, "spring-plushies");
  }

  if (typeof starwarsPlushiesData !== 'undefined') {
    renderSection(starwarsPlushiesData, "starwars-plushies");
  }

  if (typeof stPatricksData !== 'undefined') {
    renderSection(stPatricksData, "stpatricks-plushies");
  }

  if (typeof summerVibesData !== 'undefined') {
    renderSection(summerVibesData, "summer-vibes");
  }

  if (typeof superMarioData !== 'undefined') {
    renderSection(superMarioData, "supermario-plushies");
  }

  if (typeof superheroData !== 'undefined') {
    renderSection(superheroData, "superhero-plushies");
  }

  if (typeof tmntPlushieData !== 'undefined') {
    renderSection(tmntPlushieData, "tmnt-plushies");
  }

  if (typeof valentinesPlushieData !== 'undefined') {
    renderSection(valentinesPlushieData, "valentines-plushies");
  }

  if (typeof xmenPlushieData !== 'undefined') {
    renderSection(xmenPlushieData, "xmen-plushies");
  }

  if (typeof xmasPlushieData !== 'undefined') {
    renderSection(xmasPlushieData, "xmas-plushies");
  }

  if (typeof yugiohPlushieData !== 'undefined') {
    renderSection(yugiohPlushieData, "yugioh-plushies");
  }

  // CLEAR LOGIC — revised to handle Pokéballs too
  const clearButton = document.getElementById("clear-checklist");
  const overlay = document.getElementById("clear-confirm-overlay");

  if (clearButton && overlay) {
    const cancelBtn = document.getElementById("cancel-clear");
    const confirmBtn = document.getElementById("confirm-clear");

    clearButton.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    cancelBtn?.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    confirmBtn?.addEventListener("click", () => {
      const allListItems = document.querySelectorAll("ul.wave-checklist li");

      allListItems.forEach(li => {
        const index = li.querySelector("input")?.id || li.querySelector("label")?.htmlFor;
        localStorage.setItem(index, false);

        // Restore checkbox if replaced
        const pokeball = li.querySelector(".pokeball");
        if (pokeball) {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "toggle-pokeball";
          checkbox.dataset.index = index;
          checkbox.id = index;
          li.insertBefore(checkbox, pokeball);
          li.removeChild(pokeball);
        }

        const cb = li.querySelector("input[type='checkbox']");
        if (cb) cb.checked = false;
      });

      const toggleButtons = document.querySelectorAll("button[id$='-toggle-all']");
      toggleButtons.forEach(btn => {
        const sectionId = btn.id.replace("-toggle-all", "");
        localStorage.setItem(`${sectionId}-toggle`, false);
        btn.textContent = "Select All";
      });

      document.querySelectorAll("ul.wave-checklist").forEach(list => {
        const listId = list.id.replace("-list", "");
        updateChecklistCounter(listId);
      });

      overlay.style.display = "none";
    });
  }
});
