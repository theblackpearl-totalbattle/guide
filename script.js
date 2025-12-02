// Populate the Strategy table with grouped rows (rowspan) and simple group markers.
// Adds 'group-row' and alternating 'group-odd' / 'group-even' classes so each target group's rows can share a background.

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

// Helper to create safe group ids (if needed)
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // spaces -> dashes
        .replace(/[^\w\-]+/g, '')       // remove non-word chars
        .replace(/\-\-+/g, '-')         // collapse multiple dashes
        .replace(/^-+/, '')             // trim start
        .replace(/-+$/, '');            // trim end
}

function populateStrategyTable() {
    const tbody = document.querySelector('#strategyTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const targets = Object.keys(data).sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
    targets.forEach((target, targetIndex) => {
        const levelsObj = data[target].levels || {};
        const levels = Object.keys(levelsObj).map(l => Number(l)).sort((a,b) => a - b);
        const groupId = slugify(target);

        // Determine group parity for alternating group backgrounds
        const groupClass = (targetIndex % 2 === 0) ? 'group-even' : 'group-odd';

        // If no levels, create a single row and mark start/end
        if (levels.length === 0) {
            const tr = document.createElement('tr');
            tr.dataset.group = groupId;
            tr.classList.add('group-start', 'group-end', 'group-row', groupClass);

            const tdTarget = document.createElement('td');
            tdTarget.classList.add('target-cell');
            tdTarget.textContent = target;

            const tdLevel = document.createElement('td');
            tdLevel.textContent = '-';

            const tdComposition = document.createElement('td');
            tdComposition.textContent = '-';

            const tdNote = document.createElement('td');
            tdNote.textContent = data[target].note || '';

            tr.appendChild(tdTarget);
            tr.appendChild(tdLevel);
            tr.appendChild(tdComposition);
            tr.appendChild(tdNote);

            tbody.appendChild(tr);
            return;
        }

        // Render grouped rows with rowspan and mark group start/end for styling
        levels.forEach((lvl, idx) => {
            const tr = document.createElement('tr');
            tr.dataset.group = groupId;
            tr.classList.add('group-row', groupClass);

            if (idx === 0) {
                tr.classList.add('group-start');
                const tdTarget = document.createElement('td');
                tdTarget.classList.add('target-cell');
                tdTarget.rowSpan = levels.length;
                tdTarget.textContent = target;
                tr.appendChild(tdTarget);
            }

            // If last level, mark the row as group-end (so we can render a thicker bottom border)
            if (idx === levels.length - 1) {
                tr.classList.add('group-end');
            }

            const tdLevel = document.createElement('td');
            tdLevel.textContent = lvl;

            const tdComposition = document.createElement('td');
            tdComposition.textContent = levelsObj[lvl];

            const tdNote = document.createElement('td');
            tdNote.textContent = data[target].note || '';

            tr.appendChild(tdLevel);
            tr.appendChild(tdComposition);
            tr.appendChild(tdNote);

            tbody.appendChild(tr);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateStrategyTable();
});
