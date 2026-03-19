let pendingDeleteId = null
let currentEditId = null

window.onload = async () => {
    setupAddForm()
    setupModal()
    setupConfirmDialog()
    await loadData()
}

const setupAddForm = () => {
    const input = document.getElementById('name')
    input.addEventListener('keydown', async (e) => { if (e.key === 'Enter') await handleAdd() })
    document.getElementById('button-submit').addEventListener('click', async () => await handleAdd())
}

const handleAdd = async () => {
    const input = document.getElementById('name')
    const name = input.value.trim()
    if (!name) {
        input.focus()
        input.style.borderColor = '#dc2626'
        setTimeout(() => input.style.borderColor = '', 1500)
        return
    }
    const btn = document.getElementById('button-submit')
    btn.textContent = 'กำลังเพิ่ม...'
    btn.disabled = true
    
    try {
        await api.categories.create({ name })
        input.value = ''
        showMessage('เพิ่มหมวดหมู่สำเร็จ! 🎉', 'success')
        await loadData()
    } catch (error) {
        console.log(error)
        showMessage('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error')
    } finally {
        btn.textContent = '+ เพิ่ม'
        btn.disabled = false
    }
}

const loadData = async () => {
    try {
        const res = await api.categories.getAll()
        const categories = res.data
        document.getElementById('total-count').textContent = categories.length

        if (categories.length === 0) {
            document.getElementById('categories').innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📂</div>
                    <strong>ยังไม่มีหมวดหมู่</strong>
                    <p>เริ่มต้นด้วยการเพิ่มหมวดหมู่แรกของคุณด้านบน</p>
                </div>`
            return
        }

        document.getElementById('categories').innerHTML = `
            <table>
                <thead><tr><th>#</th><th>ชื่อหมวดหมู่</th><th>จัดการ</th></tr></thead>
                <tbody id="categories-body"></tbody>
            </table>`

        const tbody = document.getElementById('categories-body')
        categories.forEach((cat, idx) => {
            const tr = document.createElement('tr')
            tr.style.animationDelay = `${idx * 0.04}s`
            tr.innerHTML = `
                <td class="td-id">${cat.id}</td>
                <td class="td-name"><div class="cat-badge"><span class="cat-dot"></span>${escapeHtml(cat.name)}</div></td>
                <td><div class="td-actions">
                    <button class="btn btn-icon btn-edit edit-btn" data-id="${cat.id}">✏️ แก้ไข</button>
                    <button class="btn btn-icon btn-delete delete-btn" data-id="${cat.id}" data-name="${escapeHtml(cat.name)}">🗑️ ลบ</button>
                </div></td>`
            tbody.appendChild(tr)
        })

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => showConfirm(e.currentTarget.dataset.id, e.currentTarget.dataset.name))
        })
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => await openEditModal(e.currentTarget.dataset.id))
        })
    } catch (error) {
        console.log(error)
        document.getElementById('categories').innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <strong>โหลดข้อมูลไม่สำเร็จ</strong>
                <p>กรุณาตรวจสอบการเชื่อมต่อและลองใหม่</p>
            </div>`
    }
}

const setupModal = () => {
    const closeModal = () => {
        document.getElementById('overlay').classList.remove('active')
        currentEditId = null
    }
    document.getElementById('button-cancel').addEventListener('click', closeModal)
    document.getElementById('button-cancel-2').addEventListener('click', closeModal)
    document.getElementById('overlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('overlay')) closeModal()
    })
    document.getElementById('edit-name').addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') await handleSave()
        if (e.key === 'Escape') closeModal()
    })
    document.getElementById('button-save').addEventListener('click', async () => await handleSave())
}

const openEditModal = async (id) => {
    try {
        const res = await api.categories.getById(id)
        currentEditId = id
        document.getElementById('edit-name').value = res.data.name
        document.getElementById('overlay').classList.add('active')
        setTimeout(() => document.getElementById('edit-name').focus(), 100)
    } catch (error) {
        showMessage('ไม่สามารถโหลดข้อมูลได้', 'error')
    }
}

const handleSave = async () => {
    if (!currentEditId) return
    const name = document.getElementById('edit-name').value.trim()
    if (!name) return
    const btn = document.getElementById('button-save')
    btn.textContent = 'กำลังบันทึก...'
    btn.disabled = true
    try {
        await api.categories.update(currentEditId, { name })
        document.getElementById('overlay').classList.remove('active')
        currentEditId = null
        showMessage('แก้ไขสำเร็จแล้ว ✅', 'success')
        await loadData()
    } catch (error) {
        showMessage('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error')
    } finally {
        btn.textContent = '💾 บันทึก'
        btn.disabled = false
    }
}

const setupConfirmDialog = () => {
    document.getElementById('confirm-cancel').addEventListener('click', () => {
        document.getElementById('confirm-overlay').classList.remove('active')
        pendingDeleteId = null
    })
    document.getElementById('confirm-delete').addEventListener('click', async () => {
        if (!pendingDeleteId) return
        const btn = document.getElementById('confirm-delete')
        btn.textContent = 'กำลังลบ...'
        btn.disabled = true
        try {
            await api.categories.remove(pendingDeleteId)
            document.getElementById('confirm-overlay').classList.remove('active')
            pendingDeleteId = null
            showMessage('ลบหมวดหมู่สำเร็จแล้ว', 'success')
            await loadData()
        } catch (error) {
            showMessage('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error')
        } finally {
            btn.textContent = 'ลบเลย'
            btn.disabled = false
        }
    })
}

const showConfirm = (id, name) => {
    pendingDeleteId = id
    document.getElementById('confirm-cat-name').textContent = `"${name}"`
    document.getElementById('confirm-overlay').classList.add('active')
}

const showMessage = (text, type = 'success') => {
    const el = document.getElementById('message')
    el.className = `message ${type}`
    el.innerHTML = type === 'success' ? `✅ ${text}` : `❌ ${text}`
    el.style.display = 'flex'
    clearTimeout(el._timer)
    el._timer = setTimeout(() => { el.style.display = 'none' }, 3000)
}

const escapeHtml = (str) => {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
}