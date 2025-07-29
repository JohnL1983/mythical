document.addEventListener("DOMContentLoaded", () => {
  function createChecklist(containerId, dolls, prefix) {
    const section = document.getElementById(containerId);
    const list = document.createElement("ul");
    list.className = "wave-checklist";
    dolls.forEach((name, index) => {
      const id = `${prefix}-${index}`;
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.checked = localStorage.getItem(id) === "true";
      input.addEventListener("change", () => localStorage.setItem(id, input.checked));
      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = name;
      li.append(input, label);
      list.appendChild(li);
    });
    section.appendChild(list);
  }

  if (typeof waveData !== 'undefined') {
    Object.entries(waveData).forEach(([waveId, data]) => {
      const section = document.getElementById(waveId);
      const toggleBtn = document.getElementById(`${waveId}-toggle-all`);
      let allSelected = false;

      if (data.main) {
        createChecklist(waveId, data.main, waveId);
      }

      if (data.extras) {
        Object.entries(data.extras).forEach(([extraId, items]) => {
          const heading = document.createElement("h2");
          heading.textContent = extraId.replace(`${waveId}-`, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          section.appendChild(heading);

          const extraList = document.createElement("ul");
          extraList.className = "wave-checklist";
          items.forEach((name, index) => {
            const id = `${extraId}-${index}`;
            const li = document.createElement("li");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = id;
            input.checked = localStorage.getItem(id) === "true";
            input.addEventListener("change", () => localStorage.setItem(id, input.checked));
            const label = document.createElement("label");
            label.htmlFor = id;
            label.textContent = name;
            li.append(input, label);
            extraList.appendChild(li);
          });
          section.appendChild(extraList);
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
    });
  }

  if (typeof bigDollData !== 'undefined') {
    const sectionId = "big-pokedolls";
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(`${sectionId}-toggle-all`);
    let allSelected = false;

    if (bigDollData.main && section) {
      createChecklist(sectionId, bigDollData.main, sectionId);
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

  if (typeof pokepalDollData !== 'undefined') {
    const sectionId = "pokepal-dolls";
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(`${sectionId}-toggle-all`);
    let allSelected = false;

    if (pokepalDollData.main && section) {
      createChecklist(sectionId, pokepalDollData.main, sectionId);
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

  if (typeof wrapsData !== 'undefined') {
    const sectionId = "wraps";
    const section = document.getElementById(sectionId);
    const toggleBtn = document.getElementById(`${sectionId}-toggle-all`);
    let allSelected = false;

    if (wrapsData.main && section) {
      createChecklist(sectionId, wrapsData.main, sectionId);
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
});
