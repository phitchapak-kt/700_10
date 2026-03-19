window.onload = async () => {
    const userId = localStorage.getItem('user_id')
    if (!userId) return window.location.href = '../../index.html'
    await loadData(userId)
}

const loadData = async (userId) => {
    try {
        const res = await axios.get(`http://localhost:8000/saved_listings/user/${userId}`)
        const saved = res.data

        // กรองเฉพาะของตัวเอง
        

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
                <div class="card" style="margin-bottom: 12px;">
                    <div class="card-body" style="display:flex; align-items:center; justify-content:space-between;">
                        <div>
                            <div class="td-name">${escapeHtml(item.listing_title)}</div>
                            <div class="td-desc">฿${Number(item.price || 0).toLocaleString()}</div>
                        </div>
                        <button class="btn btn-delete unsave-btn" data-user="${userId}" data-listing="${item.listing_id}">
                            🗑️ ลบออก
                        </button>
                    </div>
                </div>`
        })

        document.getElementById('saved-list').innerHTML = html

        document.querySelectorAll('.unsave-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const user_id = e.currentTarget.dataset.user
                const listing_id = e.currentTarget.dataset.listing
                try {
                    await axios.delete(`http://localhost:8000/saved_listings`, {
                        data: { user_id, listing_id }
                    })
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