const knex = require("../db/connection");

const tableName = "unit_conversions";

// Instead of hitting the database every time we need to do a unit conversion, we just request the whole table once and load it into memory
// It gets loaded by loadConversionCache()
let conversionMap = null;
// Add a graph representation of the conversions for multi-step conversions
let conversionGraph = null;

function getConversionFactor(from_unit, to_unit) {
  if (from_unit === to_unit) {
    return 1;
  }

  if (!from_unit || !to_unit) {
    throw new Error(
      `Missing units: from_unit=${from_unit}, to_unit=${to_unit}`
    );
  }

  // First try direct conversion from the conversion map
  const key = `${from_unit}->${to_unit}`;
  const factor = conversionMap.get(key);

  if (factor !== undefined) {
    return factor;
  }

  // If direct conversion isn't available, try multi-step conversion using BFS
  const conversionPath = findConversionPath(from_unit, to_unit);

  if (!conversionPath || conversionPath.length < 2) {
    throw new Error(
      `No conversion path found from ${from_unit} to ${to_unit}!`
    );
  }

  // Calculate the combined conversion factor from the path
  let combinedFactor = 1;
  for (let i = 0; i < conversionPath.length - 1; i++) {
    const stepKey = `${conversionPath[i]}->${conversionPath[i + 1]}`;
    const stepFactor = conversionMap.get(stepKey);

    if (stepFactor === undefined) {
      throw new Error(
        `Missing conversion factor for step ${stepKey} in path ${conversionPath.join(
          " -> "
        )}`
      );
    }

    combinedFactor *= stepFactor;
  }

  // Log the conversion path that was used
  console.log(
    `Multi-step conversion from ${from_unit} to ${to_unit} via path: ${conversionPath.join(
      " -> "
    )}`
  );

  return combinedFactor;
}

/**
 * Uses Breadth-First Search to find a path between two units in the conversion graph
 * @param {string} from_unit - Starting unit
 * @param {string} to_unit - Target unit
 * @returns {string[]|null} - Array of unit names representing the conversion path, or null if no path exists
 */
function findConversionPath(from_unit, to_unit) {
  // If the conversion graph is not initialized, return null
  if (!conversionGraph) {
    return null;
  }

  // Queue for BFS
  const queue = [from_unit];
  // Keep track of visited nodes to avoid cycles
  const visited = new Set([from_unit]);
  // Store the paths
  const paths = new Map();
  paths.set(from_unit, [from_unit]);

  while (queue.length > 0) {
    const current = queue.shift();

    // If we've reached the target unit, return the path
    if (current === to_unit) {
      return paths.get(current);
    }

    // Get all neighboring units (units we can convert to from the current unit)
    const neighbors = conversionGraph.get(current) || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        // Update the path to this neighbor
        const newPath = [...paths.get(current), neighbor];
        paths.set(neighbor, newPath);
      }
    }
  }

  // If we've exhausted the queue without finding the target unit, no path exists
  return null;
}

function listConversions() {
  return knex(tableName).select("*");
}

async function listUnits() {
  // Get the from_unit records, ordered alphabetically
  const records = await knex(tableName)
    .distinct("from_unit")
    .orderBy("from_unit");

  // Extract the values, add "unit", filter out temperature units, return the list
  const units = records.map((record) => record.from_unit);
  units.push("unit");
  const filteredUnits = units.filter(
    (element) => element !== "celsius" && element !== "fahrenheit"
  );
  return filteredUnits;
}

// This loads the unit_conversions table into memory as conversionMap
async function loadConversionCache() {
  try {
    const records = await listConversions();
    conversionMap = new Map();
    conversionGraph = new Map();

    for (const row of records) {
      // Build the direct conversion map
      const key = `${row.from_unit}->${row.to_unit}`;
      conversionMap.set(key, row.factor);

      // Build the conversion graph
      if (!conversionGraph.has(row.from_unit)) {
        conversionGraph.set(row.from_unit, []);
      }
      conversionGraph.get(row.from_unit).push(row.to_unit);
    }

    console.log(`Loaded ${conversionMap.size} unit conversions into memory`);
    console.log(`Built conversion graph with ${conversionGraph.size} units`);
  } catch (error) {
    console.error(
      `Error loading conversion cache from database: ${error.message}`
    );
  }
}

// Export the ability to refresh the conversions table cache, if it ever changes
async function refreshConversionCache() {
  await loadConversionCache();
}

module.exports = {
  getConversionFactor,
  listConversions,
  listUnits,
  loadConversionCache,
  refreshConversionCache,
  findConversionPath,
};
