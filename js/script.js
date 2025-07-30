document.addEventListener("DOMContentLoaded", () => {
  function createChecklist(containerId, items, prefix) {
    const section = document.getElementById(containerId);
    const list = document.createElement("ul");
    list.className = "wave-checklist";

    items.forEach((name, index) => {
      const id = `${prefix}-${index}`;
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.checked = localStorage.getItem(id) === "true";
      input.addEventListener("change", () => {
        localStorage.setItem(id, input.checked);
      });

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = name;

      li.append(input, label);
      list.appendChild(li);
    });

    section.appendChild(list);
  }

  function renderSection(dataObject, sectionId) {
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(`${sectionId}-toggle-all`);
    let allSelected = false;

    if (!section || !dataObject) return;

    if (dataObject.main) {
      createChecklist(sectionId, dataObject.main, sectionId);
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
          toggle.textContent = "Select All";

          header.appendChild(heading);
          header.appendChild(toggle);
          extraSection.appendChild(header);

          createChecklist(extraId, items, extraId);

          let extraSelected = false;
          toggle.addEventListener("click", () => {
            extraSelected = !extraSelected;
            toggle.textContent = extraSelected ? "Deselect All" : "Select All";
            const checkboxes = extraSection.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(cb => {
              cb.checked = extraSelected;
              localStorage.setItem(cb.id, extraSelected);
            });
          });
        }
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        allSelected = !allSelected;
        toggleBtn.textContent = allSelected ? "Deselect All" : "Select All";
        const checkboxes = section.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(cb => {
          cb.checked = allSelected;
          localStorage.setItem(cb.id, allSelected);
        });
      });
    }
  }

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

  if (typeof creatorData !== 'undefined') {
    renderSection(creatorData, "creators");
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
});
