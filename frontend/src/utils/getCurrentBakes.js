// Returns all bakes since local midnight (user's timezone), comparing to UTC DB timestamps
export function getCurrentBakes(bakes) {
  const now = new Date();
  const localMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  // Convert local midnight to UTC for comparison with UTC DB timestamps
  const localMidnightUTC = new Date(
    localMidnight.getTime() - localMidnight.getTimezoneOffset() * 60000
  );
  return bakes.filter((bake) => {
    const bakeDate = new Date(bake.created_at); // This is in UTC
    return bakeDate >= localMidnightUTC;
  });
}
