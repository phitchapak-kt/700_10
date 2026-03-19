let categories = []

window.onload = async () => {
    document.getElementById('user_id').value = localStorage.getItem('user_id')
    await loadCategories()
    document.getElementById('button-submit').addEventListener('click', async () => {
        const user_id = localStorage.getItem('user_id')
        if (!user_id) {
            alert('กรุณาเข้าสู่ระบบก่อนลงประกาศ')
            window.location.href = '../login/index.html'
            return
        }
        const data = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value,
            price: Number(document.getElementById('price').value),
            category_id: Number(document.getElementById('category_id').value),
            type: document.getElementById('type').value,
            status: document.getElementById('status').value,
            user_id: Number(user_id)
        }
        try {
            await api.listings.create(data)
            document.getElementById('message').innerHTML = 'ลงประกาศสำเร็จ'
            await loadData()
        } catch (error) {
            console.log(error)
        }
    })
    await loadData()
}

const loadCategories = async () => {
    const res = await api.categories.getAll()
    categories = res.data
    const options = categories.map(cat =>
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('')
    document.getElementById('category_id').innerHTML =
        `<option value="">-- เลือกหมวดหมู่ --</option>` + options
    document.getElementById('edit-category_id').innerHTML =
        `<option value="">-- เลือกหมวดหมู่ --</option>` + options
}

const loadData = async () => {
    const currentUserId = localStorage.getItem('user_id')
    try {
        const response = await api.listings.getAll()
        const all = response.data
        const listings = all.filter(listing => String(listing.user_id) === String(currentUserId))

        let html = '<table><thead><tr><th>ID</th><th>ชื่อสินค้า</th><th>รายละเอียด</th><th>ราคา</th><th>หมวดหมู่</th><th>ประเภท</th><th>สถานะ</th></tr></thead><tbody>'
        for (const listing of listings) {
            const categoryName = categories.find(c => c.id === listing.category_id)?.name || listing.category_id
            html += `<tr>
                <td>${listing.id}</td>
                <td>${listing.title}</td>
                <td>${listing.description}</td>
                <td>${listing.price}</td>
                <td>${categoryName}</td>
                <td>${listing.type}</td>
                <td>${listing.status}</td>
                <td>
                    <button class="edit" data-id="${listing.id}">✏️ แก้ไข</button>
                    <button class="delete" data-id="${listing.id}">🗑️ ลบ</button>
                </td>
            </tr>`
        }
        html += '</tbody></table>'
        document.getElementById('listings').innerHTML = html

        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', async (event) => {
                const id = event.target.dataset.id
                if (!confirm('ยืนยันการลบ ?')) return
                try {
                    await api.listings.remove(id)
                    await loadData()
                } catch (error) { console.log(error) }
            })
        })

        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', async (event) => {
                const id = event.target.dataset.id
                const response = await api.listings.getById(id)
                const listing = response.data
                document.getElementById('edit-title').value = listing.title
                document.getElementById('edit-description').value = listing.description
                document.getElementById('edit-price').value = listing.price
                document.getElementById('edit-category_id').value = listing.category_id
                document.getElementById('edit-type').value = listing.type
                document.getElementById('edit-status').value = listing.status
                document.getElementById('popup').classList.add('active')

                document.getElementById('button-cancel').onclick = () => {
                    document.getElementById('popup').classList.remove('active')
                }
                document.getElementById('button-cancel-2').onclick = () => {
                    document.getElementById('popup').classList.remove('active')
                }

                document.getElementById('button-save').onclick = async () => {
                    const data = {
                        title: document.getElementById('edit-title').value,
                        description: document.getElementById('edit-description').value,
                        price: Number(document.getElementById('edit-price').value),
                        category_id: Number(document.getElementById('edit-category_id').value),
                        type: document.getElementById('edit-type').value,
                        status: document.getElementById('edit-status').value,
                        user_id: Number(localStorage.getItem('user_id'))
                    }
                    try {
                        await api.listings.update(id, data)
                        document.getElementById('popup').classList.remove('active')
                        await loadData()
                    } catch (error) { console.log(error) }
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}