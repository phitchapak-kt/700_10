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
            Categories: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'มือถือ' },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            CategoriesInput: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string', example: 'มือถือ' }
                }
            },
            Listings: {
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
            ListingsInput: {
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
            Listing_images: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 1 },
                    image_url: { type: 'string', example: 'iphone.jpg' },
                    image_order: { type: 'integer', example: 1 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            Listing_imagesInput: {
                type: 'object',
                required: ['listing_id', 'image_url', 'image_order'],
                properties: {
                    listing_id: { type: 'integer', example: 1 },
                    image_url: { type: 'string', example: 'iphone.jpg' },
                    image_order: { type: 'integer', example: 1 }
                }
            },
            Conversations: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 1 },
                    buyer_id: { type: 'integer', example: 1 },
                    seller_id: { type: 'integer', example: 2 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            ConversationsInput: {
                type: 'object',
                required: ['listing_id', 'buyer_id', 'seller_id'],
                properties: {
                    listing_id: { type: 'integer', example: 1 },
                    buyer_id: { type: 'integer', example: 1 },
                    seller_id: { type: 'integer', example: 2 }
                }
            },
            Messages: {
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
            MessagesInput: {
                type: 'object',
                required: ['conversation_id', 'sender_id', 'content', 'is_read'],
                properties: {
                    id: { type: 'integer', example: 1 },
                    conversation_id: { type: 'integer', example: 1 },
                    sender_id: { type: 'integer', example: 2 },
                    is_read: { type: 'boolean', example: false },
                    content: { type: 'string', example: 'ยังขายอยู่ไหมครับ' }
                }
            },
            Saved_listings: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 2 },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },
            Saved_listingsInput: {
                type: 'object',
                required: ['user_id', 'listing_id'],
                properties: {
                    user_id: { type: 'integer', example: 1 },
                    listing_id: { type: 'integer', example: 2 }
                }
            },
            SuccessMessage: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'insert ok' },
                    data: { type: 'object' }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'กรอกข้อมูลไม่ครบ' },
                    errors: { type: 'array', items: { type: 'string' } }
                }
            }
        }
    },
    paths: {
        // ─── Users ─────────────────────────────────────────────────────────────────
        '/users': {
            get: {
                tags: ['Users'],
                summary: 'ดึงรายชื่อผู้ใช้ทั้งหมด',
                responses: {
                    200: {
                        description: 'รายชื่อผู้ใช้',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } }
                    }
                }
            },
            post: {
                tags: ['Users'],
                summary: 'สร้างผู้ใช้ใหม่',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/UserInput' } } }
                },
                responses: {
                    200: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } },
                    400: { description: 'ข้อมูลไม่ครบ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            }
        },
        '/users/{id}': {
            get: {
                tags: ['Users'],
                summary: 'ดึงข้อมูลผู้ใช้ตาม id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูลผู้ใช้', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } },
                    404: { description: 'ไม่พบผู้ใช้', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            },
            put: {
                tags: ['Users'],
                summary: 'แก้ไขข้อมูลผู้ใช้',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/UserInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Users'],
                summary: 'ลบผู้ใช้ (cascade ลบ listing  ด้วย)',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        // ─── categories ──────────────────────────────────────────────────────────────
        '/categories': {
            get: {
                tags: ['Categories'],
                summary: 'ดึงรายชื่อประเภทสินค้าทั้งหมด',
                responses: {
                    200: {
                        description: 'รายชื่อประเภทสินค้า',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Categories' } } } }
                    }
                }
            },
            post: {
                tags: ['Categories'],
                summary: 'สร้างรายชื่อประเภทสินค้าใหม่',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriesInput' } } }
                },
                responses: {
                    200: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } },
                    400: { description: 'ข้อมูลไม่ครบ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            }
        },
        '/categories/{id}': {
            get: {
                tags: ['Categories'],
                summary: 'ดึงข้อมูลประเภทสินค้าพร้อม รายชื่อ ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: {
                        description: 'ข้อมูลประเภทสินค้า',
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: [
                                        { $ref: '#/components/schemas/Categories' },
                                        { type: 'object', properties: { tasks: { type: 'array', items: { $ref: '#/components/schemas/Listings' } } } }

                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }



    }

}
module.exports = spec
