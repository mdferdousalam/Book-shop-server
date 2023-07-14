import ICow from './cow.interface'
import Cow from './cow.model'

// Create a new cow
export const createCow = async (cowData: Partial<ICow>): Promise<ICow> => {
  try {
    const newCow = new Cow(cowData)
    const savedCow = await newCow.save()
    return savedCow
  } catch (error) {
    throw new Error('Failed to create cow')
  }
}

// Get all cows
export const getAllCows = async (): Promise<ICow[]> => {
  try {
    const cows = await Cow.find()
    return cows
  } catch (error) {
    throw new Error('Failed to retrieve cows')
  }
}

// Get a single cow by ID
export const getCowById = async (cowId: string): Promise<ICow> => {
  try {
    const cow = await Cow.findById(cowId)
    if (!cow) {
      throw new Error('Cow not found')
    }
    return cow
  } catch (error) {
    throw new Error('Failed to retrieve cow')
  }
}

// Update a cow
export const updateCow = async (
  cowId: string,
  updatedCowData: Partial<ICow>
): Promise<ICow> => {
  try {
    const updatedCow = await Cow.findByIdAndUpdate(cowId, updatedCowData, {
      new: true,
    })
    if (!updatedCow) {
      throw new Error('Cow not found')
    }
    return updatedCow
  } catch (error) {
    throw new Error('Failed to update cow')
  }
}

// Delete a cow
export const deleteCow = async (cowId: string): Promise<ICow> => {
  try {
    const deletedCow = await Cow.findByIdAndRemove(cowId)
    if (!deletedCow) {
      throw new Error('Cow not found')
    }
    return deletedCow
  } catch (error) {
    throw new Error('Failed to delete cow')
  }
}
