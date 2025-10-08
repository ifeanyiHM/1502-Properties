import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { propertySummaryProps } from "../Data/propertyData";
import { addProperties, uploadFilesToStorage } from "../services/apiProperties";
import supabase from "../services/supabase";
import { SpinnerMini } from "../Utilities/Spinner";

const saleSubtypes = [
  { label: "Land for Sale", value: "lfs" },
  { label: "Apartment for Sale", value: "afs" },
  { label: "House for Sale", value: "hfs" },
  { label: "Commercial property for Sale", value: "cfs" },
];

const rentSubtypes = [
  { label: "Land for Lease", value: "lfl" },
  { label: "Long Lease", value: "ls" },
  { label: "Apartment for Lease", value: "afl" },
  { label: "House for Lease", value: "hfl" },
  { label: "Commercial property for Lease", value: "cfl" },
];

interface PropertyFormInput {
  id: string;
  code?: string;
  type?: string;
  subtype?: string;
  src: FileList;
  title: string;
  subtitle?: string;
  price: string;
  location: string;
  size?: string;
  room?: string;
  bath?: string;
  tank?: string;
  measurement?: string;
  suitability?: string;
  details?: string;
}

interface PropertyEditInput extends Omit<PropertyFormInput, "src"> {
  src: string[];
}

interface PropertyFormComponentProps {
  title: string;
  fetchPendingProperties?: () => Promise<void>;
  setEditingId?: React.Dispatch<React.SetStateAction<string | null>>;
  propertyToEdit?: PropertyFormInput | PropertyEditInput | null;
}

const PropertyFormComponent = ({
  title,
  fetchPendingProperties,
  setEditingId,
  propertyToEdit,
}: PropertyFormComponentProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const editId = propertyToEdit?.id;
  const editValues = propertyToEdit ? { ...propertyToEdit } : {};
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<PropertyFormInput>({
    defaultValues: isEditSession ? editValues : {},
  });

  const type = watch("type");
  const subtype = watch("subtype");
  const uploadedFiles = watch("src");

  const showRoomBath =
    type === "shortlet" || ["afs", "hfs", "afl", "hfl"].includes(subtype ?? "");

  // Fetch the user code on mount and set it in the form
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const userCode = user.user_metadata?.userCode || "";
        const userType = user.user_metadata?.userType || "";

        setValue("code", userCode);
        setIsAdmin(userType === "admin");
        console.log("code", userCode);
      }
    };

    getUser();
  }, [setValue]);

  const onSubmit = async (data: PropertyFormInput) => {
    console.log("editId", editId);
    console.log("editId2", data.id);
    try {
      const toArray = (value?: string): string[] =>
        value ? value.split(",").map((v) => v.trim()) : [];

      const subtitleToArray = (value?: string): string[] =>
        value
          ? value
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter((line) => line !== "")
          : [];

      const uploadedMediaUrls =
        isEditSession && Array.isArray(data.src)
          ? data.src
          : await uploadFilesToStorage(data.src);

      //format price
      const formatPrice = (value: string) => {
        const numOnly = value.replace(/,/g, ""); // remove existing commas
        if (!/^\d+$/.test(numOnly)) return ""; // allow only digits

        return parseInt(numOnly).toLocaleString("en-US"); // add commas
      };

      const property: propertySummaryProps = {
        ...data,
        src: uploadedMediaUrls,
        price: formatPrice(data.price),
        subtitle: subtitleToArray(data.subtitle),
        suitability: toArray(data.suitability),
        details: toArray(data.details),
      };

      // const response =
      isEditSession && editId
        ? await addProperties(property, editId)
        : await addProperties(property);

      // console.log("Property added:", response);
      toast.success(
        isEditSession
          ? "This property has been updated"
          : "Your property has been submitted for review. You'll receive an email if it's approved."
      );
      if (isEditSession && editId && fetchPendingProperties) {
        fetchPendingProperties();
      }
      const currentAgentCode = getValues("code");
      reset();
      setValue("code", currentAgentCode);
    } catch (err) {
      console.error(
        isEditSession
          ? "Failed to update property."
          : "Failed to add property:",
        err
      );
      toast.error(
        isEditSession
          ? "Failed to update property."
          : "Failed to submit property. Please try again later."
      );
    } finally {
      isEditSession && editId && setEditingId?.("");
      // setEditingId?.((prev) => (prev === editId ? editId : null));
    }
  };

  // console.log(getPendingProperties());

  return (
    <>
      {/* <ToastContainer /> */}
      <form className="property-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>{title}</h1>
        <div className="group-container">
          {/* Code */}
          <div className="form-group">
            <label>Code</label>

            <input
              {...register("code")}
              readOnly={!isAdmin}
              style={{
                background: isAdmin ? "" : "#ccc",
                textTransform: "uppercase",
              }}
              placeholder="Enter Agent Code"
            />
            {/* <input {...register("code")} readOnly /> */}
            {/* <input {...register("code")} placeholder="Enter Agent Code" /> */}
            {errors.code && <p className="error">{errors.code.message}</p>}
          </div>

          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              {...register("title", { required: "This feild is required" })}
              placeholder="Enter title"
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          {/* Type */}
          <div className="form-group">
            <label>Type</label>
            <select
              {...register("type", { required: "This feild is required" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
              <option value="joint-ventures">Joint Ventures</option>
              <option value="off-plan">Off Plan</option>
              <option value="shortlet">Shortlet</option>
            </select>
            {errors.type && <p className="error">{errors.type.message}</p>}
          </div>

          {/* Subtype */}
          {(type === "sale" || type === "rent") && (
            <div className="form-group">
              <label>Subtype</label>
              <select
                {...register("subtype", {
                  required: "This feild is required",
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select subtype
                </option>
                {(type === "sale" ? saleSubtypes : rentSubtypes).map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
              {errors.subtype && (
                <p className="error">{errors.subtype.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Subtitle */}
        <div className="subtitle">
          <div className="form-group">
            <label htmlFor="subtitle">About the property</label>
            <textarea
              id="subtitle"
              rows={6}
              {...register("subtitle")}
              placeholder="Enter each line as a separate paragraph"
            />
          </div>
        </div>

        <div className="group-container">
          {/* Price */}
          <div className="form-group">
            <label>Price</label>
            <input
              {...register("price", {
                required: "This feild is required",
                pattern: {
                  value: /^\d+(,\d{3})*$/,
                  message: "Enter a valid price format",
                },
              })}
              placeholder="Enter price"
            />
            {errors.price && <p className="error">{errors.price.message}</p>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>
            <input
              {...register("location", {
                required: "This feild is required",
              })}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="error">{errors.location.message}</p>
            )}
          </div>

          {/* Room & Bath OR Size & Measurement */}
          {showRoomBath ? (
            <>
              <div className="form-group">
                <label>Room</label>
                <input
                  {...register("room", {
                    required: "This feild is required",
                  })}
                  placeholder="Enter number of rooms"
                />
                {errors.room && <p className="error">{errors.room.message}</p>}
              </div>
              <div className="form-group">
                <label>Bath</label>
                <input
                  {...register("bath", {
                    required: "This feild is required",
                  })}
                  placeholder="Enter number of baths"
                />
                {errors.bath && <p className="error">{errors.bath.message}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Size</label>
                <input
                  {...register("size", {
                    required: "This feild is required",
                  })}
                  placeholder="Enter property size"
                />
                {errors.size && <p className="error">{errors.size.message}</p>}
              </div>
              <div className="form-group">
                <label>Measurement</label>
                <input
                  {...register("measurement", {
                    required: "This feild is required",
                  })}
                  placeholder=" e.g (sqm, acres, plots etc)"
                />
                {errors.measurement && (
                  <p className="error">{errors.measurement.message}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* <div className="src">
          <div className="form-group">
            <label>
              Upload Property Images/Videos (you can select multiple file):
            </label>
            <input
              type="file"
              multiple
              {...register("src", { required: "This feild is required" })}
              accept="image/*,video/*"
            />
            {errors.src && <p className="error">{errors.src.message}</p>}
          </div>

          {uploadedFiles && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {Array.from(uploadedFiles).map((file, index) => {
                const url = URL.createObjectURL(file);
                const isVideo = file.type.startsWith("video/");

                return isVideo ? (
                  <video
                    key={index}
                    src={url}
                    controls
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      //   borderRadius: 4,
                    }}
                  />
                ) : (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      //   borderRadius: 4,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div> */}

        <div className="src">
          <div className="form-group">
            <label>
              Upload Property Images/Videos (you can select multiple files):
            </label>

            {/* If editing and URLs exist, show previews instead of file input */}
            {isEditSession &&
            Array.isArray(propertyToEdit?.src) &&
            propertyToEdit.src.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {propertyToEdit.src.map((item, idx) => {
                  const isVideo = /\.(mp4|webm|ogg)$/i.test(item);
                  return isVideo ? (
                    <video
                      key={idx}
                      src={item}
                      controls
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      key={idx}
                      src={item}
                      alt={`preview-${idx}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <input
                  type="file"
                  multiple
                  {...register("src", {
                    required: isEditSession ? false : "This field is required",
                  })}
                  accept="image/*,video/*"
                />
                {errors.src && <p className="error">{errors.src.message}</p>}
                {uploadedFiles && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {Array.from(uploadedFiles).map((file, index) => {
                      const url = URL.createObjectURL(file);
                      const isVideo = file.type.startsWith("video/");
                      return isVideo ? (
                        <video
                          key={index}
                          src={url}
                          controls
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          key={index}
                          src={url}
                          alt={`preview-${index}`}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="group-container">
          {/* Suitability */}
          <div className="form-group">
            <label>Suitability (comma separated)</label>
            <input
              {...register("suitability")}
              placeholder="e.g. bank, hotel, airbnb, warehouse etc"
            />
          </div>

          {/* Details */}
          <div className="form-group">
            <label>Details (comma separated)</label>
            <input
              {...register("details")}
              placeholder="e.g. C of O, pool, electricty, security etc"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          Submit
          {isSubmitting && (
            <span className="loading">
              <SpinnerMini />
            </span>
          )}
        </button>
      </form>
    </>
  );
};

export default PropertyFormComponent;
