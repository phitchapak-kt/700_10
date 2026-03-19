window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    const currentUserId = localStorage.getItem('user_id')
    try {
        const response = await api.conversations.getAll()
        const all = response.data

        // กรองเฉพาะของตัวเอง
        const conversations = all.filter(conv =>
            String(conv.buyer_id) === String(currentUserId) ||
            String(conv.seller_id) === String(currentUserId)
        )

        const convList = document.getElementById('convList')

        if (conversations.length === 0) {
            convList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">💬</div>
                    <strong>ยังไม่มีข้อความ</strong>
                    <p>เมื่อมีคนติดต่อมา จะแสดงที่นี่</p>
                </div>`
            return
        }

        convList.innerHTML = ''
        conversations.forEach(conv => {
            const otherName = String(conv.buyer_id) === String(currentUserId)
                ? `${conv.seller_firstname} ${conv.seller_lastname}`
                : `${conv.buyer_firstname} ${conv.buyer_lastname}`

            const div = document.createElement('div')
            div.className = 'conv-card'
            div.innerHTML = `
                <a href="../messages/index.html?conversation_id=${conv.id}">
                    <div class="conv-name">${otherName}</div>
                    <div class="conv-listing">📦 ${conv.listing_title}</div>
                </a>
                <button class="btn-delete delete-btn" data-id="${conv.id}">🗑️</button>`
            convList.appendChild(div)
        })

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id
                if (!confirm('ยืนยันการลบ ?')) return
                try {
                    await api.conversations.remove(id)
                    await loadData()
                } catch (error) {
                    console.log(error)
                }
            })
        })

    } catch (error) {
        console.log(error)
    }
}