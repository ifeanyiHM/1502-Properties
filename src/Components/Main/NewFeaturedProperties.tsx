import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import useProperty from "../../context/useProperty";
import { propertySummaryProps } from "../../Data/propertyData";
import BlurImage from "../../Utilities/BlurImage";
import { useWindowWidth } from "../../Hooks/useWindowSize";

function NewFeaturedProperties() {
  const {
    // setSummaryDetails,
    propertyType,
    setIsPageHeaderShown,
    dispatch,
    randomProperties,
  } = useProperty();

  const navigate = useNavigate();

  function handleClick(details: propertySummaryProps) {
    const titleSlug = slugify(details.title);
    navigate(`/expandPropertyDetails/${titleSlug}`);
  }

  function capitalize(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  const width = useWindowWidth();

  const truncateTitleForWidth = (title?: string) => {
    const t = title ?? "";
    const len = t.length;

    if (width >= 1320 && len > 40) return `${t.slice(0, 40)}...`;
    if (width >= 1280 && width < 1320 && len > 35)
      return `${t.slice(0, 35)}...`;
    if (width >= 992 && width < 1280 && len > 25) return `${t.slice(0, 25)}...`;

    return t;
  };

  return (
    <div className="featuredProperties">
      <div className="head">
        <h2>Featured Portfolio</h2>
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
        {randomProperties.slice(0, 3).map((sum, index) => {
          return (
            sum && (
              <div className="ft" key={index} onClick={() => handleClick(sum)}>
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
                        {truncateTitleForWidth(sum?.title.toUpperCase())}
                      </p>
                      <h3>{sum?.price}</h3>
                      <p style={{ marginTop: 0, marginBottom: 0 }}>
                        {capitalize(truncateTitleForWidth(sum?.location))}
                      </p>
                    </div>
                    <button>Expand</button>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default NewFeaturedProperties;
