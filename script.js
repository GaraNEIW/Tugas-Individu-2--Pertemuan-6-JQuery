// ===== 1. DATA (array of object) =====
let items = [
  { id: 1, name: "Nasi Goreng", category: "Makanan" },
  { id: 2, name: "Es Teh", category: "Minuman" },
  { id: 3, name: "Mie Ayam", category: "Makanan" },
  { id: 4, name: "Menu Baru Kamu", category: "Makanan" }
];

// ===== 2. AMBIL ELEMEN DOM =====
const itemList = document.getElementById("itemList");
const searchInput = document.getElementById("searchInput");
const addForm = document.getElementById("addForm");
const nameInput = document.getElementById("nameInput");
const categoryInput = document.getElementById("categoryInput");
const errorMsg = document.getElementById("errorMsg");

// ===== 3. TAMPILKAN DATA LEWAT DOM =====
function renderItems(list) {
  itemList.innerHTML = ""; 

  if (list.length === 0) {
    itemList.textContent = "Data tidak ditemukan.";
    return;
  }

  list.forEach(function (item) {
    // buat elemen secara manual lewat JS
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const category = document.createElement("p");
    category.textContent = item.category;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    // EVENT 3: hapus data
    deleteBtn.addEventListener("click", function () {
      deleteItem(item.id, card);
    });

    card.append(title, category, deleteBtn);
    itemList.appendChild(card);
  });
}

// ===== 4. FILTER (dipakai oleh pencarian) =====
function applyFilter() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = items.filter(function (item) {
    return item.name.toLowerCase().includes(keyword);
  });
  renderItems(filtered);
}

// ===== 5. HAPUS DATA (dengan efek jQuery) =====
function deleteItem(id, cardElement) {
  // FITUR jQuery: efek fadeOut, lalu data dihapus
  $(cardElement).fadeOut(300, function () {
    items = items.filter(function (item) {
      return item.id !== id;
    });
    applyFilter();
  });
}

// ===== EVENT 1: PENCARIAN =====
searchInput.addEventListener("input", applyFilter);

// ===== EVENT 2: TAMBAH DATA + VALIDASI FORM =====
addForm.addEventListener("submit", function (e) {
  e.preventDefault(); // cegah halaman reload

  const name = nameInput.value.trim();
  const category = categoryInput.value.trim();

  // validasi: tidak boleh kosong
  if (name === "" || category === "") {
    errorMsg.textContent = "Nama dan kategori wajib diisi!";
    return;
  }

  errorMsg.textContent = "";
  items.push({ id: Date.now(), name: name, category: category });
  addForm.reset();
  applyFilter();
});

// ===== FITUR jQuery: buka/tutup form =====
$("#toggleFormBtn").on("click", function () {
  $("#addForm").slideToggle(300);
});

renderItems(items);