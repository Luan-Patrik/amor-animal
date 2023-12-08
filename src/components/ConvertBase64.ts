type Base64ToFileOptions = {
  fileType: string
}

/**
 * Converts a base64 string to a Blob object.
 *
 * @param {string} base64String - The base64 string to convert.
 * @param {Base64ToFileOptions} options - The options for converting the base64 string to a Blob.
 * @return {Blob} - The Blob object representing the base64 string.
 */

export const base64ToFile = (
  base64String: string,
  options: Base64ToFileOptions
): Blob => {
  const buffer = Buffer.from(base64String, 'base64')

  const blob = new Blob([buffer], {
    type: options.fileType
  })

  return blob
}

/**
 * Converts a File object to a Base64 string or ArrayBuffer.
 *
 * @param {File} file - The File object to convert.
 * @return {Promise<string | ArrayBuffer | null>} A Promise that resolves with the converted Base64 string or ArrayBuffer, or null if there was an error.
 */

export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
