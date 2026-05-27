// Mock dataset mimicking the screenshot
const employees = [
    { firstName: "John", lastName: "Doe", address: "123 Main Street", mobile: "555-0192", email: "john.doe@company.com", department: "Sales", designation: "Manager", updated: "2026-05-20 10:30 AM" },
    { firstName: "Jane", lastName: "Smith", address: "456 Oak Avenue", mobile: "555-0143", email: "jane.smith@company.com", department: "Marketing", designation: "Director", updated: "2026-05-22 02:15 PM" },
    { firstName: "Andreas", lastName: "Muller", address: "789 Pine Road", mobile: "555-0732", email: "andreas.m@company.com", department: "HR", designation: "Coordinator", updated: "2026-05-25 09:00 AM" },
    { firstName: "Sam", lastName: "Wilson", address: "321 Maple Lane", mobile: "555-0921", email: "sam.w@company.com", department: "IT", designation: "Technician", updated: "2026-05-24 04:45 PM" }
];

const tableBody = document.getElementById("table-body");

// Function to render rows dynamically
function renderTable(data) {
    tableBody.innerHTML = ""; // Clear existing rows
    
    if(data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No records found.</td></tr>`;
        return;
    }

    data.forEach(emp => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.address}</td>
            <td>${emp.mobile}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td><i class="fa-regular fa-clock" style="color: gray; margin-right: 5px;"></i> ${emp.updated}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
    renderTable(employees);
    
    // Tab switching interactivity
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active-tab"));
            tab.classList.add("active-tab");
            // Here you can hook filter functionality if you group mock data by status
        });
    });
});