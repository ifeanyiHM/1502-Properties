import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import useProperty from "../../context/useProperty";
import { propertySummaryProps } from "../../Data/propertyData";
import BlurImage from "../../Utilities/BlurImage";

function NewFeaturedProperties() {
  const {
    // setSummaryDetails,
    propertyType,
    setIsPageHeaderShown,
    dispatch,
    propertyData,
  } = useProperty();

  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    const titleSlug = slugify(details.title);
    navigate(`/expandPropertyDetails/${titleSlug}`);
  }

  function capitalize(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  return (
    <div className="featuredProperties">
      <div className="head">
        <h2>Featured Properties</h2>
        <Link
          to={`service/${propertyType}`}
          onClick={() => {
            dispatch({ type: "activeProperty", payload: propertyType });
            setIsPageHeaderShown(true);
          }}
        >
          See more
        </Link>
      </div>
      <div className="content">
        {propertyData
          .filter((property) => [64, 62, 10].includes(+property.id))
          .map(
            (sum, index) =>
              sum && (
                <div
                  className="ft"
                  key={index}
                  onClick={() => handleClick(sum)}
                >
                  <div className="effect">
                    {sum?.src[0].match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        title={`featured propery ${index + 1}`}
                        // loading="lazy"
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      >
                        <source src={sum?.src[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="blurImage">
                        <BlurImage
                          src={sum?.src[0]}
                          alt={`featured propery ${index + 1}`}
                          title={`featured propery ${index + 1}`}
                          loading="lazy"
                        />{" "}
                      </div>
                    )}

                    <div className="det">
                      <div>
                        <p
                          className="title"
                          style={{ marginTop: 0, marginBottom: 0 }}
                        >
                          {sum?.title.toUpperCase()}
                        </p>
                        <h3>{sum?.price}</h3>
                        <p style={{ marginTop: 0, marginBottom: 0 }}>
                          {capitalize(sum?.location)}
                        </p>
                      </div>
                      <button>Expand</button>
                    </div>
                  </div>
                  {/* <div className="details">
                    <div className="line"></div>
                    <p>{sum?.title.toUpperCase()}</p>
                    <h3>{sum?.price}</h3>
                    <p style={{ marginTop: 0, marginBottom: 0 }}>
                      {capitalize(sum?.location)}
                    </p>
                  </div> */}
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default NewFeaturedProperties;
