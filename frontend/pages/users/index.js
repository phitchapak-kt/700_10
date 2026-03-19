window.onload = () => {
    document.getElementById('button-submit').addEventListener('click', async () => {
        const data = {
            firstname: document.getElementById('firstname').value.trim(),
            lastname:  document.getElementById('lastname').value.trim(),
            email:     document.getElementById('email').value.trim(),
            password:  document.getElementById('password').value.trim(),
            phone:     document.getElementById('phone').value.trim()
        }

        if (!data.firstname || !data.lastname || !data.email || !data.password || !data.phone) {
            showMsg('กรุณากรอกข้อมูลให้ครบทุกช่อง', 'error')
            return
        }

        try {
            await api.users.create(data)
            // สมัครสำเร็จ → กลับหน้าแรก
            window.location.href = '../../index.html'
        } catch (error) {
            console.log(error)
            showMsg('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error')
        }
    })
}

const showMsg = (text, type) => {
    const el = document.getElementById('message')
    el.textContent = text
    el.className = type
}