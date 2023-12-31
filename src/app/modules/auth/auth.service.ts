import jwt from 'jsonwebtoken'
import config from '../../../config'
import { JwtPayload } from 'jsonwebtoken'
//token verification function
export async function verifyRefreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.refresh_secret_key as string
    )
    return decoded
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}

// Get Refresh Token
export async function getRefreshToken(refreshToken: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: JwtPayload | any = await verifyRefreshToken(refreshToken)
    const { _id, role } = decoded

    const accessToken = jwt.sign({ _id, role }, config.secret_key as string, {
      expiresIn: '1h',
    })

    const newRefreshToken = jwt.sign(
      { _id, role },
      config.refresh_secret_key as string,
      {
        expiresIn: '7d',
      }
    )

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}
