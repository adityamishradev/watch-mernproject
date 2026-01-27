/**
 * Get image URL from product imgSrc (handles both old string format and new object format)
 * @param {string|object} imgSrc - Image source (string URL or object with url property)
 * @returns {string|null} - Image URL or null if not available
 */
export const getImageUrl = (imgSrc) => {
  if (typeof imgSrc === 'string') {
    return imgSrc; // Old format: direct URL string
  } else if (imgSrc && typeof imgSrc === 'object' && imgSrc.url) {
    return imgSrc.url; // New format: object with url property
  }
  return null; // No image available
};

/**
 * Get a placeholder image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Placeholder text
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = (width = 200, height = 200, text = 'No Image') => {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};