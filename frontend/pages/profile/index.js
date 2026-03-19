let currentUser = null

window.onload = async () => {
    const userId = localStorage.getItem('user_id')
    if (!userId) return window.location.href = '/login.html'

    await loadProfile(userId)

    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.clear()
        window.location.href = '../../index.html'
    })

    document.getElementById('btn-edit').addEventListener('click', () => {
        document.getElementById('edit-firstname').value = currentUser.firstname
        document.getElementById('edit-lastname').value  = currentUser.lastname
        document.getElementById('edit-email').value     = currentUser.email
        document.getElementById('edit-phone').value     = currentUser.phone
        document.getElementById('edit-password').value  = ''
        document.getElementById('edit-overlay').classList.add('active')
    })

    document.getElementById('btn-cancel').addEventListener('click', () => {
        document.getElementById('edit-overlay').classList.remove('active')
    })

    document.getElementById('btn-save').addEventListener('click', async () => {
        const data = {
            firstname: document.getElementById('edit-firstname').value,
            lastname:  document.getElementById('edit-lastname').value,
            email:     document.getElementById('edit-email').value,
            phone:     document.getElementById('edit-phone').value,
        }
        const pw = document.getElementById('edit-password').value
        if (pw) data.password = pw

        try {
            await api.users.update(currentUser.id, data)
            document.getElementById('edit-overlay').classList.remove('active')
            await loadProfile(currentUser.id)
        } catch (error) {
            console.log(error)
        }
    })

    document.getElementById('btn-delete-account').addEventListener('click', async () => {
        if (!confirm('ยืนยันการลบบัญชี? ข้อมูลทั้งหมดจะหายถาวร')) return
        try {
            await api.users.remove(currentUser.id)
            localStorage.clear()
            window.location.href = '../../index.html'
        } catch (error) {
            console.log(error)
        }
    })
}

const loadProfile = async (id) => {
    try {
        const response = await api.users.getById(id)
        currentUser = response.data

        document.getElementById('display-firstname').textContent = currentUser.firstname
        document.getElementById('display-lastname').textContent  = currentUser.lastname
        document.getElementById('display-email').textContent     = currentUser.email
        document.getElementById('display-phone').textContent     = currentUser.phone
        document.getElementById('user-role').textContent         = currentUser.role || 'User'
    } catch (error) {
        console.log(error)
    }
}