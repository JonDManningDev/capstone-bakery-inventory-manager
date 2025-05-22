/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Check if PostgreSQL or SQLite
  const isPostgres = knex.client.config.client === "postgresql";

  // Deletes ALL existing entries and reset sequence
  if (isPostgres) {
    // PostgreSQL specific truncate with sequence reset
    await knex.raw("TRUNCATE TABLE bakes RESTART IDENTITY CASCADE");
  } else {
    // SQLite specific delete and sequence reset
    await knex("bakes").del();
    await knex.raw("DELETE FROM sqlite_sequence WHERE name = 'bakes'");
  }

  // Create date objects for various past dates
  const currentDate = new Date("2025-05-21T12:00:00"); // May 21, 2025

  // Previous dates (for created_at)
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setDate(currentDate.getDate() - 1);

  const twoDaysAgo = new Date(currentDate);
  twoDaysAgo.setDate(currentDate.getDate() - 2);

  const threeDaysAgo = new Date(currentDate);
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const twoWeeksAgo = new Date(currentDate);
  twoWeeksAgo.setDate(currentDate.getDate() - 14);

  // Update dates (for updated_at, typically a few hours after created_at)
  const getUpdatedTime = (createdDate) => {
    const updatedDate = new Date(createdDate);
    updatedDate.setHours(updatedDate.getHours() + 3); // 3 hours later
    return updatedDate;
  };

  // Insert seed entries
  await knex("bakes").insert([
    {
      recipe_id: 1, // Chocolate Chip Cookies
      employee_id: 1, // John Baker
      status: "complete",
      created_at: twoWeeksAgo,
      updated_at: getUpdatedTime(twoWeeksAgo),
    },
    {
      recipe_id: 2, // Blueberry Muffins
      employee_id: 2, // Maria Garcia
      status: "complete",
      created_at: twoWeeksAgo,
      updated_at: getUpdatedTime(twoWeeksAgo),
    },
    {
      recipe_id: 3, // New York Style Cheesecake
      employee_id: 3, // David Chen
      status: "complete",
      created_at: oneWeekAgo,
      updated_at: getUpdatedTime(oneWeekAgo),
    },
    {
      recipe_id: 4, // Cinnamon Rolls
      employee_id: 4, // Sarah Johnson
      status: "complete",
      created_at: oneWeekAgo,
      updated_at: getUpdatedTime(oneWeekAgo),
    },
    {
      recipe_id: 5, // Carrot Cake
      employee_id: 5, // Maeve O'Sullivan
      status: "complete",
      created_at: oneWeekAgo,
      updated_at: getUpdatedTime(oneWeekAgo),
    },
    {
      recipe_id: 6, // Sourdough Bread
      employee_id: 1, // John Baker
      status: "complete",
      created_at: threeDaysAgo,
      updated_at: getUpdatedTime(threeDaysAgo),
    },
    {
      recipe_id: 7, // Apple Pie
      employee_id: 2, // Maria Garcia
      status: "complete",
      created_at: threeDaysAgo,
      updated_at: getUpdatedTime(threeDaysAgo),
    },
    {
      recipe_id: 8, // Banana Bread
      employee_id: 3, // David Chen
      status: "canceled",
      created_at: threeDaysAgo,
      updated_at: getUpdatedTime(threeDaysAgo),
    },
    {
      recipe_id: 9, // Chocolate Lava Cake
      employee_id: 4, // Sarah Johnson
      status: "complete",
      created_at: twoDaysAgo,
      updated_at: getUpdatedTime(twoDaysAgo),
    },
    {
      recipe_id: 10, // Oatmeal Raisin Cookies
      employee_id: 5, // Maeve O'Sullivan
      status: "complete",
      created_at: twoDaysAgo,
      updated_at: getUpdatedTime(twoDaysAgo),
    },
    {
      recipe_id: 1, // Chocolate Chip Cookies (repeated recipe)
      employee_id: 1, // John Baker
      status: "complete",
      created_at: oneDayAgo,
      updated_at: getUpdatedTime(oneDayAgo),
    },
    {
      recipe_id: 3, // New York Style Cheesecake (repeated recipe)
      employee_id: 2, // Maria Garcia
      status: "complete",
      created_at: oneDayAgo,
      updated_at: getUpdatedTime(oneDayAgo),
    },
    {
      recipe_id: 5, // Carrot Cake (repeated recipe)
      employee_id: 3, // David Chen
      status: "complete",
      created_at: currentDate,
      updated_at: getUpdatedTime(currentDate),
    },
    {
      recipe_id: 7, // Apple Pie (repeated recipe)
      employee_id: 4, // Sarah Johnson
      status: "complete",
      created_at: currentDate,
      updated_at: getUpdatedTime(currentDate),
    },
    {
      recipe_id: 9, // Chocolate Lava Cake (repeated recipe)
      employee_id: 5, // Maeve O'Sullivan
      status: "canceled",
      created_at: currentDate,
      updated_at: getUpdatedTime(currentDate),
    },
  ]);
};
