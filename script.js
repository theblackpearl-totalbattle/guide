// Populate the Strategy table from the data object.
// Dropdowns removed — table will show one row per target-level combination.

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

function populateStrategyTable() {
    const tbody = document.querySelector('#strategyTable tbody');
    if (!tbody) return;

    // Clear existing
    tbody.innerHTML = '';

    // For consistent ordering, iterate targets alphabetically then levels ascending
    const targets = Object.keys(data).sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
    targets.forEach(target => {
        const levelsObj = data[target].levels || {};
        // Convert level keys to numbers for sorting
        const levels = Object.keys(levelsObj).map(l => Number(l)).sort((a,b) => a - b);
        levels.forEach((lvl, idx) => {
            const tr = document.createElement('tr');

            // Target cell only for first level row for this target to make readability (optional)
            const tdTarget = document.createElement('td');
            tdTarget.textContent = target;
            // If you prefer to group target rows with rowspan, uncomment the block below and remove per-row target text.
            // tdTarget.rowSpan = levels.length;
            // if (idx !== 0) tdTarget.style.display = 'none';

            const tdLevel = document.createElement('td');
            tdLevel.textContent = lvl;

            const tdComposition = document.createElement('td');
            tdComposition.textContent = levelsObj[lvl];

            const tdNote = document.createElement('td');
            tdNote.textContent = data[target].note || '';

            tr.appendChild(tdTarget);
            tr.appendChild(tdLevel);
            tr.appendChild(tdComposition);
            tr.appendChild(tdNote);

            tbody.appendChild(tr);
        });
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    populateStrategyTable();
});
