window.onload = () => {
    document.getElementById('btn-login').addEventListener('click', doLogin)
    document.getElementById('password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doLogin()
    })
}

const doLogin = async () => {
    const email    = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!email || !password) {
        showMsg('กรุณากรอกอีเมลและรหัสผ่าน')
        return
    }

    try {
        const response = await api.users.getAll()
        const users = response.data

        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
        )

        if (!user) {
            showMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
            return
        }

        // เก็บ userId แล้วปิด popup ไป profile
        localStorage.setItem('user_id',user.id)
        window.location.href = '../../index.html'

    } catch (error) {
        console.log(error)
        showMsg('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
}

const showMsg = (text) => {
    const el = document.getElementById('popup-msg')
    el.textContent = text
    el.className = 'popup-msg error'
}