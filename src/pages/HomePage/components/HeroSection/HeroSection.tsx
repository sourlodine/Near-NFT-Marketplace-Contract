import { Carousel, CarouselItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ExplorerIcon from '../../../../assets/icons/ExplorerIcon';
import SectionPadding from '../../../../components/SectionPadding/SectionPadding';
import { FEATURED_POST } from '../../../../config';
import './HeroSection.scss';

export type TFeaturedPost = {
  imageUrl: any;
  name: string;
  description: string;
  link: string;
}

const HeroSection = () => {
  return (
    <Carousel controls={false}>
      {
        FEATURED_POST.map((post, i) => (
          <CarouselItem key={i}>
            <div className="hero-section">
              <SectionPadding>
                <div className="hero-content">
                  <h3>Galacticway</h3>
                  <h2>{post.name}</h2>
                  <p>{post.description}</p>
                  <Link to={post.link}>
                    <ExplorerIcon />Explore
                  </Link>
                </div>
              </SectionPadding>
              <div className="bg-darkener" />
              <div className="bg-img-container">
                <img
                  src={post.imageUrl}
                  alt="hero background"
                />
              </div>
            </div>
          </CarouselItem>
        ))
      }
    </Carousel>
  )
}

export default HeroSection;