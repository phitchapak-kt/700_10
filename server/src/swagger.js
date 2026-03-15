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

    paths: {}



}
module.exports = spec
