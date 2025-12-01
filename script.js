// Data and select population logic (unchanged)
const data = {
    "Elven Citadel": {
        note: "Include Griffins if available for all Citadel attacks.",
        levels: {
            10: "100 level 2 catapults + Ranged troops only",
            15: "320 level 3 catapults + Mounted troops only",
            20: "800 level 4 catapults + Melee troops only",
            25: "3200 level 5 catapults + Melee troops only",
            30: "Unknown level 6 catapults + Melee troops only"
        }
    },
    "Cursed Citadel": {
        note: "Include Griffins if available for all Citadel attacks.",
        levels: {
            20: "2200 level 4 catapults + Melee troops only",
            25: "7800 level 5 catapults + Melee troops only"
        }
    },
    "Ancient Vaults": {
        note: "Follow troop restrictions carefully.",
        levels: {
            9: "T1 - No melee, all monsters, all mercenaries",
            14: "T2 - No melee, all monsters, all mercenaries",
            19: "T3 - No melee, all monsters, all mercenaries",
            24: "T4 - Mounted, Flying, no Dragons",
            29: "T5 - Mounted, Flying, no Dragons",
            34: "T6 - Melee, Flying, no Elementals",
            39: "T7 - Flying, no Elementals",
            44: "T8 - Flying, no Elementals"
        }
    }
};

// Populate target dropdown
const targetSelect = document.getElementById('targetSelect');
const levelSelect = document.getElementById('levelSelect');
const targetName = document.getElementById('targetName');
const levelValue = document.getElementById('levelValue');
const composition = document.getElementById('composition');
const extraNote = document.getElementById('extraNote');

Object.keys(data).forEach(target => {
    const option = document.createElement('option');
    option.value = target;
    option.textContent = target;
    targetSelect.appendChild(option);
});

targetSelect.addEventListener('change', () => {
    levelSelect.innerHTML = '<option value="">--Choose Level--</option>';
    const selectedTarget = targetSelect.value;
    if (selectedTarget) {
        Object.keys(data[selectedTarget].levels).forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            levelSelect.appendChild(option);
        });
    }
    targetName.textContent = '-';
    levelValue.textContent = '-';
    composition.textContent = '-';
    extraNote.textContent = '';
});

levelSelect.addEventListener('change', () => {
    const selectedTarget = targetSelect.value;
    const selectedLevel = levelSelect.value;
    if (selectedTarget && selectedLevel) {
        targetName.textContent = selectedTarget;
        levelValue.textContent = selectedLevel;
        composition.textContent = data[selectedTarget].levels[selectedLevel];
        extraNote.textContent = data[selectedTarget].note;
    }
});

// Accordion behavior for .general-tips using <details>/<summary>
// - On desktop (width > 600px): show all tips expanded (useful for reading).
// - On mobile (<= 600px): collapse all by default and enforce single-open accordion behavior.
(function () {
    const MOBILE_BREAKPOINT = 600;
    const detailsSelector = '.general-tips details';
    const detailsNodeList = () => Array.from(document.querySelectorAll(detailsSelector));

    function setupAccordion() {
        const details = detailsNodeList();
        if (!details.length) return;

        if (window.innerWidth > MOBILE_BREAKPOINT) {
            // Desktop/tablet: expand all for easier scanning
            details.forEach(d => d.open = true);
            // Remove mobile-specific toggle handlers if previously attached
            details.forEach(d => d.removeEventListener('toggle', mobileToggleHandler));
        } else {
            // Mobile: collapse all and attach toggle handler to emulate single-open accordion
            details.forEach(d => d.open = false);
            details.forEach(d => {
                d.removeEventListener('toggle', mobileToggleHandler); // avoid duplicates
                d.addEventListener('toggle', mobileToggleHandler);
            });
        }
    }

    function mobileToggleHandler(e) {
        // When a details element opens on mobile, close the others
        if (!e.target.open) return; // only act when opening
        const details = detailsNodeList();
        details.forEach(other => {
            if (other !== e.target) other.open = false;
        });
        // scroll the opened summary into view slightly (user-friendly)
        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Initialize now (script is loaded at end of body, so DOM is ready)
    setupAccordion();

    // Update on resize (debounced)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupAccordion, 120);
    });
})();
