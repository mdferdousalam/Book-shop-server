import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../admin/admin.model'
import {
  ICreateAdminInput,
  ICreateAdminResponse,
  IAdminLoginInput,
  IAdminLoginResponse,
} from './admin.interface'
import config from '../../../config'

const generateAccessToken = (adminId: string, role: string) => {
  return jwt.sign({ _id: adminId, role }, config.secret_key as string, {
    expiresIn: '1h',
  })
}

const generateRefreshToken = (adminId: string, role: string) => {
  return jwt.sign({ _id: adminId, role }, config.refresh_secret_key as string, {
    expiresIn: '7d',
  })
}

export async function createAdmin(
  input: ICreateAdminInput
): Promise<ICreateAdminResponse> {
  const { password, role, name, phoneNumber, address, email } = input
  const hashedPassword = await bcrypt.hash(password, 10)
  const admin = await Admin.create({
    password: hashedPassword,
    role,
    name,
    email,
    phoneNumber,
    address,
  })
  const {
    _id,
    name: adminName,
    email: adminEmail,
    phoneNumber: adminPhoneNumber,
    address: adminAddress,
    role: adminRole,
  } = admin

  const accessToken = generateAccessToken(_id, adminRole)
  const refreshToken = generateRefreshToken(_id, adminRole)

  return {
    _id,
    role: adminRole,
    name: adminName,
    email: adminEmail,
    phoneNumber: adminPhoneNumber,
    address: adminAddress,
    accessToken,
    refreshToken,
  }
}

export async function adminLogin(
  input: IAdminLoginInput
): Promise<IAdminLoginResponse> {
  const { email, password } = input
  const admin = await Admin.findOne({ email })

  if (!admin) {
    throw new Error('Admin not found')
  }

  const passwordMatch = await bcrypt.compare(password, admin.password)

  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  const accessToken = generateAccessToken(admin._id, admin.role)
  const refreshToken = generateRefreshToken(admin._id, admin.role)

  return {
    accessToken,
    refreshToken,
  }
}
