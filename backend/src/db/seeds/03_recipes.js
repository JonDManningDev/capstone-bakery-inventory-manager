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
    await knex.raw("TRUNCATE TABLE recipes RESTART IDENTITY CASCADE");
  } else {
    // SQLite specific delete and sequence reset
    await knex("recipes").del();
    await knex.raw("DELETE FROM sqlite_sequence WHERE name = 'recipes'");
  }

  // Insert seed entries
  await knex("recipes").insert([
    {
      name: "Classic Chocolate Chip Cookies",
      description:
        "Buttery cookies with a crisp edge and chewy center, loaded with semi-sweet chocolate chips. These golden-brown treats have a rich vanilla aroma and the perfect balance of sweetness.",
    },
    {
      name: "Blueberry Muffins",
      description:
        "Light and fluffy muffins bursting with fresh blueberries. Topped with a crunchy sugar crust, these moist breakfast treats have a delicate crumb and subtle vanilla flavor.",
    },
    {
      name: "New York Style Cheesecake",
      description:
        "Rich and creamy cheesecake with a buttery graham cracker crust. This dense, smooth dessert has a slight tang from cream cheese and a velvety texture that melts in your mouth.",
    },
    {
      name: "Cinnamon Rolls",
      description:
        "Soft, pillowy rolls swirled with cinnamon-sugar filling and topped with cream cheese frosting. These fragrant pastries have a tender, bread-like texture and gooey centers.",
    },
    {
      name: "Carrot Cake",
      description:
        "Moist spice cake loaded with freshly grated carrots, chopped walnuts, and warm spices, layered with tangy cream cheese frosting. This rustic dessert has a complex flavor profile and satisfying texture.",
    },
    {
      name: "Sourdough Bread",
      description:
        "Artisanal bread with a crackling crust and open, chewy crumb. This naturally leavened loaf has a complex, tangy flavor and stays fresh for days.",
    },
    {
      name: "Apple Pie",
      description:
        "Classic double-crust pie filled with spiced apples. The flaky, buttery pastry encases tender apple slices seasoned with cinnamon and nutmeg in a sweet, jammy filling.",
    },
    {
      name: "Banana Bread",
      description:
        "Dense, moist quick bread made with ripe bananas. This comforting loaf has a tender crumb, caramelized exterior, and intense banana flavor enhanced with vanilla and cinnamon.",
    },
    {
      name: "Chocolate Lava Cake",
      description:
        "Individual chocolate cakes with molten centers that flow when cut into. These intensely chocolatey desserts have a light, cakey exterior and a rich, pudding-like interior.",
    },
    {
      name: "Oatmeal Raisin Cookies",
      description:
        "Chewy cookies loaded with rolled oats, plump raisins, and warm spices. These hearty treats have slightly crisp edges, a soft center, and a wholesome, comforting flavor.",
    },
  ]);
};
