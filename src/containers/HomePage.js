import React from "react";
import how1 from "assets/images/how1.png";
import how2 from "assets/images/how2.png";
import how3 from "assets/images/how3.png";
import how4 from "assets/images/how4.png";
import showcase1  from "assets/images/showcase1.jpg";
import showcase2  from "assets/images/showcase2.jpg";
import showcase3  from "assets/images/showcase3.jpg";


function HomePage(props) {
  return (
    <section className="home__page">
      <div className="info__homepage">
        <div className="content_info">
          <h1><span>Shapee Clound's</span> Company Information</h1>
          <p><span>Tax Code:</span> 34534643</p>
          <p><span>Address:</span> 65 Ben Nghe, Phu Hoi Ward, Hue City, Thua Thien - Hue,
            Vietnam
          </p>
          <p><span>Phone:</span> 0965653434</p>
          <p><span>Operation Date:</span> June 8, 2017</p>
        </div>
        <div className="img_info" />
      </div>
      <div className="content__home">
        <h1>What do company reviews say about you as an employer?</h1>
        <p>83% of people say employer reviews impact where they apply.</p>
        <p>
          With over 100 million company reviews, Indeed Company Pages help you
          attract and engage best-fit candidates.
        </p>
      </div>
      <div className="how__works">
        <div className="title_how_works">
          <h1>How it works</h1>
          <p>
            Every employer with jobs on Indeed automatically has a Company Page.
            Claim your page to unlock employer-only features and update your
            page with company information, photos, a logo and more.
          </p>
          <p>
            People can follow your page to get updates on new jobs and company
            reviews.
          </p>
        </div>
        <div className="list__img">
          <img alt="img" src={how1} />
          <img alt="img" src={how2} />
          <img alt="img" src={how3} />
          <img alt="img" src={how4} />
        </div>
      </div>
      <div className="back-ground" />
      <div className="showcase">
        <div className="tile_showcase">
          <h1>Showcase your company</h1>
          <p>
            Any employer with jobs on Indeed can claim its Company Page for
            free. With your Company Page, you can:
          </p>
        </div>
        <div className="list_showcase">
          <div>
            <h2>Improve your visibility for free</h2>
            <img alt="img" src={showcase1} />
          </div>
          <div>
            <h2>Tell your company's story</h2>
            <img alt="img" src={showcase2} />
          </div>
          <div>
            <h2>Edit your page at any time</h2>
            <img alt="img" src={showcase3} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
