const params = new URLSearchParams(window.location.search)
const conversationId = params.get('conversation_id')
const currentUserId = localStorage.getItem('user_id')
let editingMessageId = null

window.onload = async () => {
    if (!conversationId) return window.location.href = '../conversations/index.html'

    await loadConversation()
    await loadMessages()

    document.getElementById('btn-send').addEventListener('click', handleSend)
    document.getElementById('chat-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend()
    })

    document.getElementById('edit-cancel').addEventListener('click', () => {
        editingMessageId = null
        document.getElementById('chat-input').value = ''
        document.getElementById('edit-bar').classList.remove('active')
    })
}

const loadConversation = async () => {
    try {
        const res = await api.conversations.getById(conversationId)
        const conv = res.data
        const otherName = String(conv.buyer_id) === String(currentUserId)
            ? `${conv.seller_firstname} ${conv.seller_lastname}`
            : `${conv.buyer_firstname} ${conv.buyer_lastname}`

        document.getElementById('chat-name').textContent = otherName
        document.getElementById('chat-listing').textContent = `📦 ${conv.listing_title}`
    } catch (error) {
        console.log(error)
    }
}

const loadMessages = async () => {
    try {
        const res = await api.messages.getAll()
        const all = res.data

        // กรองเฉพาะของ conversation นี้
        const messages = all.filter(m => String(m.conversation_id) === String(conversationId))

        const container = document.getElementById('chat-messages')
        container.innerHTML = ''

        if (messages.length === 0) {
            container.innerHTML = `<div class="empty-state"><div class="empty-icon">💬</div><strong>ยังไม่มีข้อความ</strong><p>เริ่มการสนทนาได้เลย</p></div>`
            return
        }

        messages.forEach(msg => {
            const isMine = String(msg.sender_id) === String(currentUserId)
            const div = document.createElement('div')
            div.className = `msg ${isMine ? 'mine' : 'other'}`
            div.innerHTML = `
                <div class="msg-bubble">${escapeHtml(msg.content)}</div>
                <div class="msg-time">${formatTime(msg.created_at)}</div>
                ${isMine ? `
                <div class="msg-actions">
                    <button class="edit-msg" data-id="${msg.id}" data-content="${escapeHtml(msg.content)}">✏️</button>
                    <button class="delete-msg" data-id="${msg.id}">🗑️</button>
                </div>` : ''}
            `
            container.appendChild(div)
        })

        // scroll ลงล่างสุด
        container.scrollTop = container.scrollHeight

        document.querySelectorAll('.delete-msg').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id
                if (!confirm('ลบข้อความนี้?')) return
                try {
                    await api.messages.remove(id)
                    await loadMessages()
                } catch (error) { console.log(error) }
            })
        })

        document.querySelectorAll('.edit-msg').forEach(btn => {
            btn.addEventListener('click', (e) => {
                editingMessageId = e.currentTarget.dataset.id
                document.getElementById('chat-input').value = e.currentTarget.dataset.content
                document.getElementById('edit-bar').classList.add('active')
                document.getElementById('chat-input').focus()
            })
        })

    } catch (error) {
        console.log(error)
    }
}

const handleSend = async () => {
    const content = document.getElementById('chat-input').value.trim()
    if (!content) return

    try {
        if (editingMessageId) {
            await api.messages.update(editingMessageId, { content })
            editingMessageId = null
            document.getElementById('edit-bar').classList.remove('active')
        } else {
            await api.messages.create({
                conversation_id: conversationId,
                sender_id: currentUserId,
                content
            })
        }
        document.getElementById('chat-input').value = ''
        await loadMessages()
    } catch (error) {
        console.log(error)
    }
}

const escapeHtml = (str) => {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(String(str)))
    return div.innerHTML
}

const formatTime = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
}