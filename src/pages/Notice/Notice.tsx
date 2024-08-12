import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import ShowNotice from "../Manage/ShowNotice";

const Notice = () => {
  return (
    <div>
      <div className="">
        <HeadingWithSubheading
          heading={"  all Notice"}
          subheading={"All  important notice information "}
        ></HeadingWithSubheading>

        <ShowNotice></ShowNotice>
      </div>
    </div>
  );
};

export default Notice;
