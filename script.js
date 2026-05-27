// ── EMPLOYEE DATA ──
const DATA = {
  active: [
    { first:"John",    last:"Doe",      address:"123 Elm Street",      mobile:"955-1234", email:"john.doe@example.com",       dept:"Sales",             designation:"Manager",     updated:"2024-09-03 1:49PM",  dot:"orange" },
    { first:"Jane",    last:"Smith",    address:"456 Oak Avenue",      mobile:"955-5678", email:"jane.smith@example.com",     dept:"Marketing",         designation:"Director",    updated:"2024-09-03 2:30PM",  dot:"blue"   },
    { first:"Alice",   last:"Johnson",  address:"789 Pine Road",       mobile:"955-8765", email:"alice.johnson@example.com",  dept:"HR",                designation:"Coordinator", updated:"2024-09-03 2:55PM",  dot:"blue"   },
    { first:"Bob",     last:"Brown",    address:"321 Maple Lane",      mobile:"955-2345", email:"bob.brown@example.com",      dept:"IT",                designation:"Technician",  updated:"2024-09-03 3:05PM",  dot:"blue"   },
    { first:"Charlie", last:"Davis",    address:"654 Birch Blvd",      mobile:"955-3456", email:"charlie.davis@example.com",  dept:"Finance",           designation:"Analyst",     updated:"2024-09-03 3:10PM",  dot:"blue"   },
    { first:"Eve",     last:"Miller",   address:"987 Cedar Street",    mobile:"955-4567", email:"eve.miller@example.com",     dept:"Operations",        designation:"Supervisor",  updated:"2024-09-03 3:50PM",  dot:"orange" },
    { first:"Frank",   last:"Wilson",   address:"321 Spruce Way",      mobile:"955-5678", email:"frank.wilson@example.com",   dept:"Legal",             designation:"Consultant",  updated:"2024-09-03 4:05PM",  dot:"orange" },
    { first:"Grace",   last:"Lee",      address:"654 Palm Drive",      mobile:"955-6789", email:"grace.lee@example.com",      dept:"Engineering",       designation:"Developer",   updated:"2024-09-03 4:10PM",  dot:"orange" },
    { first:"Henry",   last:"Taylor",   address:"987 Fir Road",        mobile:"955-7890", email:"henry.taylor@example.com",   dept:"R&D",               designation:"Scientist",   updated:"2024-09-03 4:00PM",  dot:"green"  },
    { first:"Isabel",  last:"Anderson", address:"123 Aspen Court",     mobile:"955-8901", email:"isabel.anderson@example.com",dept:"Customer Support",  designation:"Agent",       updated:"2024-09-03 4:30PM",  dot:"orange" },
    { first:"Jack",    last:"Thomas",   address:"456 Cypress Ave",     mobile:"955-9012", email:"jack.thomas@example.com",    dept:"Quality Assurance", designation:"Inspector",   updated:"2024-09-03 4:40PM",  dot:"orange" },
    { first:"Karen",   last:"Jackson",  address:"789 Redwood Road",    mobile:"955-0123", email:"karen.jackson@example.com",  dept:"Logistics",         designation:"Coordinator", updated:"2024-09-03 5:10PM",  dot:"blue"   },
    { first:"Leo",     last:"White",    address:"321 Willow Street",   mobile:"955-1234", email:"leo.white@example.com",      dept:"Sales",             designation:"Executive",   updated:"2024-09-03 5:15PM",  dot:"green"  },
    { first:"Mia",     last:"Harris",   address:"654 Hickory Lane",    mobile:"955-2345", email:"mia.harris@example.com",     dept:"Marketing",         designation:"Specialist",  updated:"2024-09-03 5:20PM",  dot:"orange" },
    { first:"Nathan",  last:"Martin",   address:"987 Magnolia Blvd",   mobile:"955-3456", email:"nathan.martin@example.com",  dept:"IT",                designation:"Engineer",    updated:"2024-09-03 5:30PM",  dot:"blue"   },
    { first:"Olivia",  last:"Garcia",   address:"123 Walnut Court",    mobile:"955-4567", email:"olivia.garcia@example.com",  dept:"HR",                designation:"Manager",     updated:"2024-09-03 5:45PM",  dot:"green"  },
  ],
  inactive: [
    { first:"Paul",  last:"Clark",  address:"10 Sunset Blvd",  mobile:"944-1111", email:"paul.clark@example.com",  dept:"Finance", designation:"Accountant", updated:"2024-08-01 9:00AM",  dot:"orange" },
    { first:"Quinn", last:"Lewis",  address:"22 Oakwood Ave",  mobile:"944-2222", email:"quinn.lewis@example.com", dept:"IT",      designation:"Support",    updated:"2024-08-05 11:00AM", dot:"blue"   },
    { first:"Rita",  last:"Walker", address:"35 Pinecrest Dr", mobile:"944-3333", email:"rita.walker@example.com", dept:"Sales",   designation:"Rep",        updated:"2024-08-10 2:00PM",  dot:"orange" },
  ],
  deleted: [
    { first:"Sam", last:"Hall", address:"99 Elmwood Rd", mobile:"933-4444", email:"sam.hall@example.com", dept:"Operations", designation:"Operator", updated:"2024-07-01 8:00AM", dot:"orange" },
  ],
  drafts: []
};

// ── STATE ──
let currentTab  = "active";
let currentPage = 1;
const PER_PAGE  = 8;
let searchQuery = "";

function getFiltered() {
  const rows = DATA[currentTab] || [];
  if (!searchQuery) return rows;
  const q = searchQuery.toLowerCase();
  return rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
}

function render() {
  const filtered   = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const tbody = document.getElementById("tableBody");

  if (slice.length === 0) {
    tbody.innerHTML = `<tr class="no-data"><td colspan="8">No records found.</td></tr>`;
  } else {
    tbody.innerHTML = slice.map(r => `
      <tr>
        <td>${r.first}</td>
        <td>${r.last}</td>
        <td>${r.address}</td>
        <td>${r.mobile}</td>
        <td class="email">${r.email}</td>
        <td>${r.dept}</td>
        <td>${r.designation}</td>
        <td><span class="status-dot"><span class="dot ${r.dot}"></span>${r.updated}</span></td>
      </tr>`).join("");
  }

  document.getElementById("pageInfo").textContent = `${currentPage} / ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage <= 1;
  document.getElementById("nextBtn").disabled = currentPage >= totalPages;
}

// ── TABS ──
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    currentTab  = btn.dataset.tab;
    currentPage = 1;
    searchQuery = "";
    document.getElementById("searchInput").value = "";
    render();
  });
});

// ── SEARCH ──
document.getElementById("searchInput").addEventListener("input", function () {
  searchQuery = this.value.trim();
  currentPage = 1;
  render();
});

// ── PAGINATION ──
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) { currentPage--; render(); }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const total = Math.max(1, Math.ceil(getFiltered().length / PER_PAGE));
  if (currentPage < total) { currentPage++; render(); }
});

// ── SIDEBAR — fix: use event delegation ──
document.querySelector(".sidebar-nav").addEventListener("click", function(e) {
  const item = e.target.closest(".nav-item");
  if (!item) return;
  e.preventDefault();
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  item.classList.add("active");
});

// ── START ──
render();
