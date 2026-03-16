const { get, post, response, put } = require("./app")

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
        { name: 'Categories', description: 'จัดการประเภทสินค้า' },
        { name: 'Listings', description: 'จัดการ ประกาศขาย' },
        { name: 'Listing_images', description: 'จัดการ รูปสินค้า' },
        { name: 'Conversations', description: 'จัดการ ช่องแชท' },
        { name: 'Messages', description: 'จัดการ คุยข้อความ' },
        { name: 'Saved_listings', description: 'จัดการ บันทึกสินค้า' }
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
                    password: { type: 'string', example: '123456' },
                    phone: { type: 'string', example: '0123854796' },
                    created_at: { type: 'string', format: 'date-time' }
                }
            },

            UserInput: {
                type: 'object',
                required: ['firstname', 'lastname', 'email', 'password', 'phone'],
                properties: {
                    firstname: { type: 'string', example: 'สิริมา' },
                    lastname: { type: 'string', example: 'ทามะ' },
                    email: { type: 'string', example: 'ab@gmail.com' },
                    password: { type: 'string', example: '123456' },
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
                    title: { type: 'string', example: 'มือถือ รุ่น iPhone 15' },
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
                    title: { type: 'string', example: 'มือถือ รุ่น iPhone 15' },
                    description: { type: 'string', example: 'สภาพดีใช้ได้ไม่ถึง 1 เดือน' },
                    price: { type: 'integer', example: 20000 },
                    category_id: { type: 'integer', example: 1 },
                    type: { type: 'string', enum: ['SELL', 'EXCHANGE'], example: 'SELL' },
                    status: { type: 'string', enum: ['ACTIVE', 'SOLD', 'CLOSED'], example: 'ACTIVE' },
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
                required: ['listing_id', 'image', 'image_order'],
                properties: {
                    listing_id: { type: 'integer', example: 1 },
                    image: { type: 'string', format: 'binary' },
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
                required: ['conversation_id', 'sender_id', 'content'],
                properties: {
                    conversation_id: { type: 'integer', example: 1 },
                    sender_id: { type: 'integer', example: 2 },
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
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } },
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
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } },
                    400: { description: 'ข้อมูลไม่ครบ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            }
        },
        '/categories/{id}': {
            get: {
                tags: ['Categories'],
                summary: 'ดึงข้อมูลประเภทสินค้าพร้อม id ',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: {
                        description: 'ข้อมูลประเภทสินค้า',
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: [
                                        { $ref: '#/components/schemas/Categories' },
                                        { type: 'object', properties: { listings: { type: 'array', items: { $ref: '#/components/schemas/Listings' } } } }

                                    ]
                                }
                            }
                        }
                    },
                    404: { description: 'ไม่พบประเภทสินค้า', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            },
            put: {
                tags: ['Categories'],
                summary: 'แก้ไขประเภทสินค้า',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoriesInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Categories'],
                summary: 'ลบประเภทของสินค้า',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        // ─── listings ─────────────────────────────────────────────────────────────────
        '/listings': {
            get: {
                tags: ['Listings'],
                summary: 'ดึง ประกาศขาย ทั้งหมด',
                responses: {
                    200: {
                        description: 'ชื่อประกาศขาย',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Listings' } } } }
                    }
                }
            },
            post: {
                tags: ['Listings'],
                summary: 'สร้างประกาศขาย ',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListingsInput' } } }
                },
                responses: {
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        '/listings/{id}': {
            get: {
                tags: ['Listings'],
                summary: 'ดึง Listings พร้อม id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูล ประกาศขาย', content: { 'application/json': { schema: { $ref: '#/components/schemas/Listings' } } } },
                    404: { description: 'ไม่พบ ข้อมูลประกาศขาย', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            },
            put: {
                tags: ['Listings'],
                summary: 'แก้ไข Listings พร้อม categories',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ListingsInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Listings'],
                summary: 'ลบ listings',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        // ─── listing_images ─────────────────────────────────────────────────────────────────
        '/listing_images': {
            get: {
                tags: ['Listing_images'],
                summary: 'ดึง Listing_images ทั้งหมด',
                responses: {
                    200: {
                        description: 'ไฟล์รูปภาพ',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Listing_images' } } } }
                    }

                }
            },
            post: {
                tags: ['Listing_images'],
                summary: 'สร้าง Listing_images',
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: { $ref: '#/components/schemas/Listing_imagesInput' },
                            encoding: {
                                image: { contentType: 'image/*' }
                            }
                        }

                    }
                },
                responses: {
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        '/listing_images/{id}': {
            get: {
                tags: ['Listing_images'],
                summary: ' ดึง Listing_images พร้อม id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูล รูปภาพ', content: { 'application/json': { schema: { $ref: '#/components/schemas/Listing_images' } } } },
                    404: { description: 'ไม่พบ รูปภาพ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }

            },
            put: {
                tags: ['Listing_images'],
                summary: ' แก้ไข Listing_images พร้อม Lstings ',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: { $ref: '#/components/schemas/Listing_imagesInput' },
                            encoding: {
                                image: { contentType: 'image/*' }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Listing_images'],
                summary: ' ลบ Listing_images ',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }

                }
            }
        },
        // ─── conversations ─────────────────────────────────────────────────────────────────
        '/conversations': {
            get: {
                tags: ['Conversations'],
                summary: 'ดึง conversations ทั้งหมด',
                responses: {
                    200: {
                        description: 'ช่องแชท',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Conversations' } } } }
                    }
                }
            },
            post: {
                tags: ['Conversations'],
                summary: 'สร้าง conversations ',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ConversationsInput' } } }
                },
                responses: {
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        '/conversations/{id}': {
            get: {
                tags: ['Conversations'],
                summary: 'ดึง conversations id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูล ช่องแชท', content: { 'application/json': { schema: { $ref: '#/components/schemas/Conversations' } } } },
                    404: { description: 'ไม่พบ ช่องแชท', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            },
            put: {
                tags: ['Conversations'],
                summary: 'แก้ไข conversations ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ConversationsInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Conversations'],
                summary: 'ลบ conversations ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }

                }
            }
        },
        // ─── messages ─────────────────────────────────────────────────────────────────
        '/messages': {
            get: {
                tags: ['Messages'],
                summary: 'ดึง messages ทั้งหมด',
                responses: {
                    200: {
                        description: 'ข้อมความ',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Messages' } } } }
                    }
                }
            },
            post: {
                tags: ['Messages'],
                summary: 'สร้าง messages ',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/MessagesInput' } } }
                },
                responses: {
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        '/messages/{id}': {
            get: {
                tags: ['Messages'],
                summary: 'ดึง messages id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูล ข้อความ', content: { 'application/json': { schema: { $ref: '#/components/schemas/Messages' } } } },
                    404: { description: 'ไม่พบ ข้อความ', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }
            },
            put: {
                tags: ['Messages'],
                summary: 'แก้ไข messages ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/MessagesInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Messages'],
                summary: 'ลบ messages ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }

                }
            }
        },
        // ─── saved_listings ─────────────────────────────────────────────────────────────────
        '/saved_listings': {
            get: {
                tags: ['Saved_listings'],
                summary: 'ดึง saved_listings ทั้งหมด',
                responses: {
                    200: {
                        description: 'บันทึกประกาศสินค้า',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Saved_listings' } } } }

                    }
                }
            },
            post: {
                tags: ['Saved_listings'],
                summary: 'สร้าง Saved_listings',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Saved_listingsInput' } } }
                },
                responses: {
                    201: { description: 'สร้างสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            }
        },
        '/saved_listings/{id}': {
            get: {
                tags: ['Saved_listings'],
                summary: 'ดึง saved_listings id',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ข้อมูล บันทึกประกาศสินค้า', content: { 'application/json': { schema: { $ref: '#/components/schemas/Saved_listings' } } } },
                    404: { description: 'ไม่พบ บันทึกประกาศสินค้า', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
                }


            },
            put: {
                tags: ['Saved_listings'],
                summary: 'แก้ไข saved_listings ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Saved_listingsInput' } } }
                },
                responses: {
                    200: { description: 'แก้ไขสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }
                }
            },
            delete: {
                tags: ['Saved_listings'],
                summary: 'ลบ saved_listings ทั้งหมด',
                parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                responses: {
                    200: { description: 'ลบสำเร็จ', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } } }

                }
            }
        }
    }
}

module.exports = spec
