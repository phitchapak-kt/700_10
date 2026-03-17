window.onload = async () => {
  document.getElementById('button-submit').addEventListener('click', async () => {
        const data = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value
        }
        try {
            await api.users.create(data)
            document.getElementById('message').innerHTML = 'สมัครสมาชิกสำเร็จ'
            await loadData()
        } catch (error) {
            console.log(error)
        }
    })
    await loadData()
}

const loadData = async () => {
  try {
    const response = await api.users.getAll()
    const users = response.data

    let html = '<table><thead><tr><th>ID</th><th>ชื่อ</th><th>อีเมล</th><th>เบอร์โทร</th><th>จัดการ</th></tr></thead><tbody>'
    
    for (const user of users) {
      html += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname} ${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
            <button class="edit" data-id="${user.id}">✏️ แก้ไข</button>
            <button class="delete" data-id="${user.id}">🗑️ ลบ</button>
        </td>
      </tr>`
    }
    
    html += '</tbody></table>'
    document.getElementById('user').innerHTML = html

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click' ,async (event) => {
            const id = event.target.dataset.id
            if(!confirm('ยืนยันการลบ ?')) return
            try{
                await api.users.remove(id)
                await loadData()
            } catch(error) {
                console.log(error)
            }
        })
    })

    document.querySelectorAll('.edit').forEach(btn => {
        btn.addEventListener('click', async(event) => {
            const id = event.target.dataset.id

            const response = await api.users.getById(id)
            const user = response.data

            document.getElementById('edit-firstname').value = user.firstname
            document.getElementById('edit-lastname').value = user.lastname
            document.getElementById('edit-email').value = user.email
            document.getElementById('edit-password').value = user.password
            document.getElementById('edit-phone').value = user.phone


            document.getElementById('popup').style.display = 'block'

            document.getElementById('button-cancel').onclick = () =>{
                document.getElementById('popup').style.display = 'none'
            }

            document.getElementById('button-save').onclick = async () =>{
                const data = {
                    firstname: document.getElementById('edit-firstname').value,
                    lastname: document.getElementById('edit-lastname').value,
                    email: document.getElementById('edit-email').value,
                    password: document.getElementById('edit-password').value,
                    phone: document.getElementById('edit-phone').value
                }
                try {
                    await api.users.update(id,data)
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