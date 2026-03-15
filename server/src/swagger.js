const spec = {
    openapi: '3.0.0',
    info: {
        title: 'JS_shop Web Management API',
        version: '1.0.0',
        description: 'REST API สำหรับระบบแลกเปลี่ยนสินค้ามือสอง'
    },
    servers: [{ url: 'http://localhost:8000', description: 'Local server' }],
    tags: [
        { name: 'Users', description: 'จัดการผู้ใช้งาน' },
        { name: 'categories', description: 'จัดการประเภทสินค้า' },
        { name: 'listings', description: 'จัดการ ประกาศขาย' },
        { name: 'listing_images', description: 'จัดการ รูปสินค้า' },
        { name: 'conversations', description: 'จัดการ ช่องแชท' },
        { name: 'messages', description: 'จัดการ คุยข้อความ' },
        { name: 'saved_listings', description: 'จัดการ บันทึกสินค้า' }
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    firstname: { type: 'string', example: 'สิริมา' },
                    lastname: { type: 'string', example: 'ทามะ' },
                    email: { type: 'string', example: 'ab@gmail.com' },
                    password: { type: 'string', example: '12345' },
                    phone: { type: 'string', example: '0123854796' },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            UserInput: {
                type: 'object',
                required: ['firstname', 'lastname', 'email', 'password', 'phone'],
                properties: {
                    id: { type: 'integer', example: 1 },
                    firstname: { type: 'string', example: 'สิริมา' },
                    lastname: { type: 'string', example: 'ทามะ' },
                    email: { type: 'string', example: 'ab@gmail.com' },
                    password: { type: 'string', example: '12345' },
                    phone: { type: 'string', example: '0123854796' }
                }
            },
            categories: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'มือถือ' },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            categoriesInput: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string', example: 'มือถือ' }
                }
            },
            listings: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    title: { type: 'string', example: 'มือถือ รุ่น iPone 15' },
                    description: { type: 'string', example: 'สภาพดีใช้ได้ไม่ถึง 1 เดือน' },
                    price: { type: 'integer', example: 20000 },
                    category_id: { type: 'integer', example: 1 },
                    type: { type: 'string', example: 'SELL' },
                    status: { type: 'string', example: 'ACTIVE' },
                    user_id: { type: 'integer', example: 1 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            listingsInput: {
                type: 'object',
                required: ['title', 'description', 'price', 'category_id', 'type', 'status', 'user_id'],
                properties: {
                    title: { type: 'string', example: 'มือถือ รุ่น iPone 15' },
                    description: { type: 'string', example: 'สภาพดีใช้ได้ไม่ถึง 1 เดือน' },
                    price: { type: 'integer', example: 20000 },
                    category_id: { type: 'integer', example: 1 },
                    type: { type: 'string', example: 'SELL' },
                    status: { type: 'string', example: 'ACTIVE' },
                    user_id: { type: 'integer', example: 1 }
                }
            },
            listing_images: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 1 },
                    image_url: { type: 'string', example: 'iphone.jpg' },
                    image_order: { type: 'integer', example: 1 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            listing_imagesInput: {
                type: 'object',
                required: ['listing_id', 'image_url', 'image_order'],
                properties: {
                    listing_id: { type: 'integer', example: 1 },
                    image_url: { type: 'string', example: 'iphone.jpg' },
                    image_order: { type: 'integer', example: 1 }
                }
            },
            conversations: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 1 },
                    buyer_id: { type: 'integer', example: 1 },
                    seller_id: { type: 'integer', example: 2 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            conversationsInput: {
                type: 'object',
                required: ['listing_id', 'buyer_id', 'seller_id'],
                properties: {
                    listing_id: { type: 'integer', example: 1 },
                    buyer_id: { type: 'integer', example: 1 },
                    seller_id: { type: 'integer', example: 2 }
                }
            },
            messages: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    conversation_id: { type: 'integer', example: 1 },
                    sender_id: { type: 'integer', example: 2 },
                    content: { type: 'string', example: 'ยังขายอยู่ไหมครับ' },
                    is_read: { type: 'boolean', example: false },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            messagesInput: {
                type: 'object',
                required: ['conversation_id', 'sender_id', 'content', 'is_read'],
                properties: {
                    id: { type: 'integer', example: 1 },
                    conversation_id: { type: 'integer', example: 1 },
                    sender_id: { type: 'integer', example: 2 },
                    is_read: { type: 'boolean', example: false},
                    content: { type: 'string', example: 'ยังขายอยู่ไหมครับ' }
                }
            },
            saved_listings: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 2 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            saved_listingsInput: {
                type: 'object',
                required: ['user_id', 'listing_id'],
                properties:{
                    user_id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 2 }
                }
            }
        }
    },
    paths: {}



}
module.exports = spec
