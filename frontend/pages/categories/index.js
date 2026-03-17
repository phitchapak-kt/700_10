window.onload = async () => {
    document.getElementById('button-submit').addEventListener('click', async () => {
        const name = document.getElementById('name').value
        if (!name) return
        try {
            await api.categories.create({ name })
            document.getElementById('name').value = ''
            document.getElementById('message').innerHTML = 'เพิ่มสำเร็จ'
            await loadData()
        } catch (error) {
            console.log(error)
        }
    })
    await loadData()
}

const loadData = async () => {
    try {
        const res = await api.categories.getAll()
        const categories = res.data

        let html = '<table><thead><tr><th>ID</th><th>ชื่อหมวดหมู่</th><th>จัดการ</th></tr></thead><tbody>'
        for (const cat of categories) {
            html += `<tr>
                <td>${cat.id}</td>
                <td>${cat.name}</td>
                <td>
                    <button class="edit" data-id="${cat.id}">✏️ แก้ไข</button>
                    <button class="delete" data-id="${cat.id}">🗑️ ลบ</button>
                </td>
            </tr>`
        }
        html += '</tbody></table>'
        document.getElementById('categories').innerHTML = html

        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id
                if (!confirm('ยืนยันการลบ ?')) return
                try {
                    await api.categories.remove(id)
                    await loadData()
                } catch (error) {
                    console.log(error)
                }
            })
        })

        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id
                const res = await api.categories.getById(id)
                const cat = res.data

                document.getElementById('edit-name').value = cat.name
                document.getElementById('popup').style.display = 'block'

                document.getElementById('button-cancel').onclick = () => {
                    document.getElementById('popup').style.display = 'none'
                }

                document.getElementById('button-save').onclick = async () => {
                    const data = { name: document.getElementById('edit-name').value }
                    try {
                        await api.categories.update(id, data)
                        document.getElementById('popup').style.display = 'none'
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