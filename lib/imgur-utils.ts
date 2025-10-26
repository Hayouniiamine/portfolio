/**
 * Utility functions for handling individual Imgur image links
 */

export function isValidImgurImageLink(url: string): boolean {
  // Check for direct imgur links (i.imgur.com) or imgur.com image links
  return /^https?:\/\/(i\.)?imgur\.com\/[a-zA-Z0-9]+(\.[a-z]+)?/i.test(url)
}

export function normalizeImgurLink(url: string): string | null {
  try {
    // Parse the URL
    const urlObj = new URL(url)
    const hostname = urlObj.hostname
    const pathname = urlObj.pathname

    // Extract image ID and extension
    const pathMatch = pathname.match(/\/([a-zA-Z0-9]+)(\.[a-z]+)?/i)
    if (!pathMatch) {
      return null
    }

    const imageId = pathMatch[1]
    let ext = pathMatch[2] || ".jpg"

    // Ensure extension has a dot
    if (!ext.startsWith(".")) {
      ext = "." + ext
    }

    // Return normalized imgur CDN link
    return `https://i.imgur.com/${imageId}${ext}`
  } catch {
    return null
  }
}

export function validateAndProcessImgurLinks(linksText: string): string[] {
  const lines = linksText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const validLinks: string[] = []

  for (const link of lines) {
    if (isValidImgurImageLink(link)) {
      const normalized = normalizeImgurLink(link)
      if (normalized) {
        validLinks.push(normalized)
      }
    }
  }

  return validLinks
}
