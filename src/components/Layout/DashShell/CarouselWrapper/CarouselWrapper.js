import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import { LinearProgress, Typography } from "@material-ui/core";
import "./CarouselWrapper.css";

const CarouselWrapper = ({ objects, downloadCollection }) => {
  return (
    <>
      <OwlCarousel
        className="owl-theme"
        autoplay={true}
        dots={false}
        autoplaySpeed={2000}
        autoplayTimeout={9000}
        autoplayHoverPause={true}
        center={true}
        loop
        navSpeed={700}
        nav
        stagePadding={4}
        navText={[
          '<span class="nav-text material-icons">chevron_left</span>',
          '<span class="nav-text material-icons">chevron_right</span>',
        ]}
        items={2}
        margin={2}
      >
        {objects?.result?.map((artist) => (
          <div
            onClick={() =>
              downloadCollection && downloadCollection("artist", artist.ID)
            }
            className="item carousel-cell"
            key={artist.ID}
          >
            <img alt={artist.Name} src={artist.imageLg} />
            <div className="carousel-cell-text">
              <div className="carousel-cell-title no-wrap">{artist.Name}</div>
              <div className="carousel-cell-artist">
                {artist.trackCount} tracks in your library
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

CarouselWrapper.defaultProps = {};
export default CarouselWrapper;
