import './Pizza.css';

function Pizza() {
  return (
    <div>

      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" width="700" height="500" />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">PIZZA NAME</h1>
            <p class="lead">Ingredients list</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">

              <p class="lead">PRICE$$$</p>

            </div>
          </div>
        </div>
      </div>



<hr class="my-4"></hr>




      <div class="container col-xxl-8 px-4 py-5">
        <div class="row">

          <div class="col-lg-6">
            <h4 class="mb-3">pick any extra Ingredients</h4>
            <div class="list-group">
              <label class="list-group-item d-flex gap-2">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" />
                <span>Extra Ingredients</span>
              </label>
              <label class="list-group-item d-flex gap-2">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" />
                <span>Extra Ingredients</span>
              </label>
              <label class="list-group-item d-flex gap-2">
                <input class="form-check-input flex-shrink-0" type="checkbox" value="" />
                <span>Extra Ingredients</span>
              </label>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="firstName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>

                <hr class="my-4"></hr>

                <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
              </form>

            </div>




          </div>
        </div>

      </div>
    </div>
  );
}

export default Pizza;
