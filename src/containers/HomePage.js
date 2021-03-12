import React from "react";
import image from "../assets/images/map.png";

function HomePage(props) {
    return (
        <section className="banner">
            <div className="banner__inner clearfix flex space-between items-center">
                <div className="banner__inner__text">
                    <h1 className="h1">
                        Provides qualified products
                    </h1>
                    <br></br>
                    <h2 className="h2">
                        by the <span className="text--primary">Shapee Clound</span>
                    </h2>
                    <div>
                        <h2>Company Information</h2>
                        <p>Company Name: Shapee Clound </p>
                        <p>Tax Code: 34534643</p>
                        <p>Address: 65 Ben Nghe, Phu Hoi Ward, Hue City, Thua Thien - Hue, Vietnam</p>
                        <p>Phone: 0965653434</p>
                        <p>Operation Date: June 8, 2017</p>
                        <p>Manager: Nguyen Chi Dung</p>
                        <p>Vision: At Shapee Clound GROUP, where we always bring innovation, innovation in each product of our customers as well as our own.
Innovation in the technology industry has a great impact on life, contributing greatly to the change of society, which is what BAPers always believe and aim for. </p>
                    </div>
                </div>
                <div className="banner__inner__image">
                    <img src={image} alt="" width="650" height="350"></img>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
