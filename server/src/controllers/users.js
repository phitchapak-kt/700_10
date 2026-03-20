const UserModel = require('../models/users')

const validateUser = (data) => {
  const errors = []
  if (!data.firstname) errors.push('กรุณากรอกชื่อ')
  if (!data.lastname) errors.push('กรุณากรอกนามสกุล')

  if (!data.email) {
    errors.push('กรุณากรอกอีเมล')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('รูปแบบไม่ถูกต้อง')
  }

  if (!data.password) {
    errors.push('กรุณากรอกรหัสผ่าน')
  } else if (data.password.length < 6) {
    errors.push('รหัสผ่านต้องมีอย่างน้อย 6 ตัว!')
  }

  if (!data.phone) {
    errors.push('กรุณากรอกเบอร์โทร')
  } else if (!/^[0-9]{10}$/.test(data.phone)) {
    errors.push('เบอร์โทีต้องเป็นตัวเลข 10 หลัก!')
  }

  return errors
}


const validateUserUpdate = (data) => {
  const errors = []
  if (!data.firstname) errors.push('กรุณากรอกชื่อ')
  if (!data.lastname) errors.push('กรุณากรอกนามสกุล')

  if (!data.email) {
    errors.push('กรุณากรอกอีเมล')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('รูปแบบไม่ถูกต้อง')
  }

  if (data.password && data.password.length < 6) {
    errors.push('รหัสผ่านต้องมีอย่างน้อย 6 ตัว!')
  }

  if (!data.phone) {
    errors.push('กรุณากรอกเบอร์โทร')
  } else if (!/^[0-9]{10}$/.test(data.phone)) {
    errors.push('เบอร์โทรต้องเป็นตัวเลข 10 หลัก!')
  }

  return errors
}

const getAll = async (req, res, next) => {
  try {
    const users = await UserModel.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'หาไม่เจอ' })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const errors = validateUser(req.body)
    if (errors.length > 0) return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors })
    const result = await UserModel.create(req.body)
    res.json({ message: 'insert ok', data: result })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const errors = validateUserUpdate(req.body)  
    if (errors.length > 0) {
      return res.status(400).json({ message: 'ข้อมูลไม่ถูกต้อง', errors })
    }

    const result = await UserModel.update(req.params.id, req.body)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้' })
    }

    res.json({ message: 'update ok', data: result })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await UserModel.remove(req.params.id)
    res.json({ message: 'delete ok', data: result })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const validateLogin = (data) => {
      const errors = []
      if (!data.email) errors.push('กรุณากรอกอีเมล')
      if (!data.password) errors.push('กรุณากรอกรหัสผ่าน')
      return errors
    }

    const user = await UserModel.findByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    res.json({ message: 'Login success', user })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, getById, create, update, remove, login }