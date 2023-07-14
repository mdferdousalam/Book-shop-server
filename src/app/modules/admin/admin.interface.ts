export type ICreateAdminInput = {
  password: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
}

export type ICreateAdminResponse = {
  _id: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  accessToken: string
  refreshToken?: string
}

export type IAdminLoginInput = {
  phoneNumber: string
  password: string
}

export type IAdminLoginResponse = {
  accessToken: string
  refreshToken: string
}
