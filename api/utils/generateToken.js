import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

const adminToken = (res, AdminId) => {
  const token = jwt.sign({ AdminId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.cookie('Adminjwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

const ownerToken = (res, ownerId) => {
  const token = jwt.sign({ ownerId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.cookie('Ownerjwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

export { generateToken, adminToken, ownerToken }
