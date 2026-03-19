window.onload = async () => {
    const userId = localStorage.getItem('user_id')
    if (!userId) return window.location.href = '../../index.html'
    await loadData(userId)
}

const loadData = async (userId) => {
    try {
        const res = await api.saved_listings.getByUserId(userId)
        const saved = res.data

        document.getElementById('total-count').textContent = saved.length

        if (saved.length === 0) {
            document.getElementById('saved-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❤️</div>
                    <strong>ยังไม่มีสินค้าที่บันทึก</strong>
                    <p>กดหัวใจที่สินค้าที่สนใจเพื่อบันทึกไว้</p>
                </div>`
            return
        }

        let html = ''
        saved.forEach(item => {
            html += `
                <div class="saved-item">
                    <div class="saved-info">
                        <div class="saved-title">${escapeHtml(item.listing_title)}</div>
                        <div class="saved-price">฿${Number(item.price || 0).toLocaleString()}</div>
                    </div>
                    <button class="btn btn-delete unsave-btn" data-id="${item.id}">
                        🗑️ ลบออก
                    </button>
                </div>`
        })

        document.getElementById('saved-list').innerHTML = html

        document.querySelectorAll('.unsave-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id
                try {
                    await api.saved_listings.remove(id)
                    await loadData(userId)
                } catch (error) {
                    console.log(error)
                }
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const escapeHtml = (str) => {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(String(str)))
    return div.innerHTML
}