window.onload = async () => {
    document.getElementById('user_id').value = localStorage.getItem('user_id')

    document.getElementById('button-submit').addEventListener('click', async () => {
        const data = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            category_id: document.getElementById('category_id').value,
            type: document.getElementById('type').value,
            status: document.getElementById('status').value,
            user_id: document.getElementById('user_id').value
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

const loadData = async () => {
    const currentUserId = localStorage.getItem('user_id')  // ดึง user_id
    try {
        const response = await api.listings.getAll()
        const all = response.data

        // กรองเฉพาะของตัวเอง ← เพิ่มแค่บรรทัดนี้
        const listings = all.filter(listing => String(listing.user_id) === String(currentUserId))

        let html = '<table><thead><tr><th>ID</th><th>ชื่อสินค้า</th><th>รายละเอียด</th><th>ราคา</th><th>หมวดหมู่</th><th>ประเภท</th><th>สถานะ</th></tr></thead><tbody>'

        for (const listing of listings) {
            html += `<tr>
                <td>${listing.id}</td>
                <td>${listing.title}</td>
                <td>${listing.description}</td>
                <td>${listing.price}</td>
                <td>${listing.category_id}</td>
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
                } catch (error) {
                    console.log(error)
                }
            })
        })

        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', async (event) => {
                console.log('กดแก้ไขแล้ว')
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
                console.log('popup classes =', document.getElementById('popup').classList)  

                document.getElementById('button-cancel').onclick = () => {
                    document.getElementById('popup').classList.remove('active')
                }

                document.getElementById('button-save').onclick = async () => {
                    const data = {
                        title: document.getElementById('edit-title').value,
                        description: document.getElementById('edit-description').value,
                        price: document.getElementById('edit-price').value,
                        category_id: document.getElementById('edit-category_id').value,
                        type: document.getElementById('edit-type').value,
                        status: document.getElementById('edit-status').value,
                        user_id: document.getElementById('user_id').value
                    }
                    try {
                        await api.listings.update(id, data)
                        document.getElementById('popup').classList.remove('active')
                        await loadData()
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        })

    } catch (error) {
        console.log(error)
    }
}