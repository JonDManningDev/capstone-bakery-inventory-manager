/**
 * Converts a quantity from one unit to another using the provided conversion factors
 * @param {number} amount - The amount to convert
 * @param {string} fromUnit - The unit to convert from
 * @param {string} toUnit - The unit to convert to
 * @param {Array} conversions - Array of conversion objects with from_unit, to_unit, and factor properties
 * @returns {number|null} - The converted amount or null if conversion is not possible
 */
export function convertUnits(amount, fromUnit, toUnit, conversions) {
  // If units are the same, no conversion needed
  if (fromUnit === toUnit) return amount;

  // First try direct conversion
  const directConversion = conversions.find(
    (entry) => entry.from_unit === fromUnit && entry.to_unit === toUnit
  );

  if (directConversion) {
    return amount * directConversion.factor;
  }

  // If direct conversion is not available, try to find a multi-step path
  const conversionPath = findConversionPath(fromUnit, toUnit, conversions);

  if (!conversionPath || conversionPath.length < 2) {
    console.warn(`No conversion path found from ${fromUnit} to ${toUnit}.`);
    return null;
  }

  // Calculate the combined conversion factor from the path
  let result = amount;

  for (let i = 0; i < conversionPath.length - 1; i++) {
    const stepFrom = conversionPath[i];
    const stepTo = conversionPath[i + 1];

    const stepConversion = conversions.find(
      (entry) => entry.from_unit === stepFrom && entry.to_unit === stepTo
    );

    if (!stepConversion) {
      console.warn(
        `Missing conversion factor for step ${stepFrom} to ${stepTo}.`
      );
      return null;
    }

    result *= stepConversion.factor;
  }

  return result;
}

/**
 * Uses Breadth-First Search to find a path between two units in the conversion graph
 * @param {string} fromUnit - Starting unit
 * @param {string} toUnit - Target unit
 * @param {Array} conversions - Array of conversion objects
 * @returns {Array|null} - Array of unit names representing the path, or null if no path exists
 */
function findConversionPath(fromUnit, toUnit, conversions) {
  // Build the conversion graph
  const graph = new Map();

  for (const conversion of conversions) {
    if (!graph.has(conversion.from_unit)) {
      graph.set(conversion.from_unit, []);
    }
    graph.get(conversion.from_unit).push(conversion.to_unit);
  }

  // BFS to find the path
  const queue = [fromUnit];
  const visited = new Set([fromUnit]);
  const paths = new Map();
  paths.set(fromUnit, [fromUnit]);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === toUnit) {
      return paths.get(current);
    }

    const neighbors = graph.get(current) || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        const newPath = [...paths.get(current), neighbor];
        paths.set(neighbor, newPath);
      }
    }
  }

  return null;
}
