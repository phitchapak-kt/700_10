let allListings = []
let allCategories = []

window.onload = async () => {
    await loadCategories()
    await loadListings()

    document.getElementById('search').addEventListener('input', () => filterListings())
    document.getElementById('category-filter').addEventListener('change', () => filterListings())

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#search') && !e.target.closest('#search-dropdown')) {
            document.getElementById('search-dropdown').style.display = 'none'
        }
    })
}

const loadCategories = async () => {
    try {
        const res = await api.categories.getAll()
        allCategories = res.data
        const select = document.getElementById('category-filter')
        select.innerHTML = '<option value="">-- ทุกหมวดหมู่ --</option>' +
            allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
    } catch (error) {
        console.log(error)
    }
}

const loadListings = async () => {
    try {
        const res = await api.listings.getAll()
        allListings = res.data
        document.getElementById('listings').innerHTML = ''
    } catch (error) {
        console.log(error)
    }
}

const filterListings = () => {
    const keyword = document.getElementById('search').value.toLowerCase().trim()
    const categoryId = document.getElementById('category-filter').value

    let filtered = allListings
    if (categoryId) filtered = filtered.filter(l => String(l.category_id) === String(categoryId))
    if (keyword) filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(keyword) ||
        l.description.toLowerCase().includes(keyword)
    )

    if (keyword || categoryId) {
        renderListings(filtered)
    } else {
        document.getElementById('listings').innerHTML = ''
    }

    const dropdown = document.getElementById('search-dropdown')
    if (keyword) {
        dropdown.classList.add('active')
        dropdown.innerHTML = filtered.length === 0
            ? '<div class="dropdown-empty">ไม่พบสินค้า</div>'
            : filtered.map(i => `
                <div class="dropdown-item">
                    <span>${i.title}</span>
                    <span class="dropdown-price">฿${Number(i.price).toLocaleString()}</span>
                </div>`).join('')
    } else {
        dropdown.classList.remove('active')
    }
}

const renderListings = (listings) => {
    if (listings.length === 0) {
        document.getElementById('listings').innerHTML = '<p class="no-result">ไม่พบสินค้า</p>'
        return
    }
    let html = '<div class="listings-grid">'
    for (const listing of listings) {
        const typeLabel = listing.type === 'SELL' ? '💰 ขาย' : '🔄 แลก'
        const statusLabel = listing.status === 'ACTIVE' ? '🟢 ขายอยู่' : '🔴 ขายแล้ว'
        html += `
            <div class="listing-card">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div class="listing-title">${listing.title}</div>
                    <button class="btn-save-listing" data-id="${listing.id}" onclick="handleSave(${listing.id})">🤍</button>
                </div>
                <div class="listing-price">฿${Number(listing.price).toLocaleString()}</div>
                <div class="listing-status">${typeLabel} · ${statusLabel}</div>
            </div>`
    }
    html += '</div>'
    document.getElementById('listings').innerHTML = html
}

const handleSave = async (listingId) => {
    const userId = localStorage.getItem('user_id')

    if (!userId) {
        alert('กรุณาเข้าสู่ระบบก่อนบันทึกสินค้า')
        window.location.href = './pages/login/index.html'
        return
    }

    try {
        await api.saved_listings.create({ user_id: userId, listing_id: listingId })
        alert('บันทึกสินค้าสำเร็จ ❤️')
    } catch (error) {
        alert('เกิดข้อผิดพลาด หรือบันทึกไปแล้ว')
        console.log(error)
    }
}