import { Link } from "react-router-dom";

export function Home() {
  // Placeholders until states are complete
  const bakes = {
    dailyInProcess: 1,
    dailyComplete: 2,
    dailyCanceled: 0,
  };
  const dailyCount = Object.values(bakes).reduce((sum, value) => sum + value);

  const recipes = {
    total: 10,
  };
  const ingredients = {
    total: 25,
  };

  return (
    <div className="container text-center py-4">
      <div className="row d-flex align-items-center">
          <h1 className="col-12 display-4 fw-normal">Maeve's Fine Baked Goods</h1>
          <h2 className="col-12 display-6 fw-light fst-italic">
            Bakery Management System
          </h2>
      </div>
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4"
        style={{ height: "250px" }}
      >
        <div className="col h-100">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Bakes `}
                <i className="bi-list-check"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="bakesActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link to="/bakes" role="button" className="btn btn-primary">
                    <i className="bi-eye"></i>
                    {` View Bakes`}
                  </Link>
                </div>
                <div
                  id="bakesStats"
                  className="d-flex flex-column justify-content-evenly w-100"
                >
                  <div id="bakesTotal">
                    <h5>{`There have been ${dailyCount} bakes today.`}</h5>
                  </div>
                  <div
                    id="bakesCategories"
                    className="d-flex justify-content-evenly w-100"
                  >
                    <p>{`In process: ${bakes.dailyInProcess}`}</p>
                    <p>{`Complete: ${bakes.dailyComplete}`}</p>
                    <p>{`Canceled: ${bakes.dailyCanceled}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Recipes `}
                <i className="bi-clipboard2-heart"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="recipesActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link to="/recipes" role="button" className="btn btn-primary">
                    <i className="bi-eye"></i>
                    {` View Recipes`}
                  </Link>
                  <Link
                    to="/recipes/new"
                    role="button"
                    className="btn btn-success"
                  >
                    <i className="bi-plus"></i>
                    {` Create Recipe`}
                  </Link>
                </div>
                <div id="recipesTotal">
                  <h5>{`There are ${recipes.total} recipes in the database.`}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h3 className="card-title border-bottom">
                {`Ingredients `}
                <i className="bi bi-measuring-cup"></i>
              </h3>
              <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-evenly">
                <div
                  id="ingredientsActions"
                  className="d-flex justify-content-evenly w-100"
                >
                  <Link
                    to="/ingredients"
                    role="button"
                    className="btn btn-primary"
                  >
                    <i className="bi-eye"></i>
                    {` View Ingredients`}
                  </Link>
                  <Link
                    to="/ingredients/new"
                    role="button"
                    className="btn btn-success"
                  >
                    <i className="bi-plus"></i>
                    {` Create Ingredient`}
                  </Link>
                </div>
                <div id="ingredientsTotal">
                  <h5>{`There are ${ingredients.total} ingredients in the database.`}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
